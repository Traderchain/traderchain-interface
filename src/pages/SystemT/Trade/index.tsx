import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import Chart from 'components/Chart';
import SystemStats from '../components/SystemStats';
import * as Utils from 'utils';
import { isEmpty, notEmpty } from 'utils';
import { useSystemT } from 'utils/system_t';
import PriceUtils from 'utils/price_utils';

import { CC_FSYMS } from 'utils/constants';

let stockChart: any;

export default function Trade() {
  let { symbol = '' } = useParams<{ symbol: string }>();
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid') || '';
  const [prices, setPrices] = useState<any[]>([]);
  const [param, setParam] = useState<any>({});
  // const [extend_param, setExtendParam] = useState<any>({});
  const [trades, setTrades] = useState<any[]>([]);
  const [tops, setTops] = useState<any[]>([]);
  const [bottoms, setBottoms] = useState<any[]>([]);
  const [stop_trade, setStopTrade] = useState<any>({});
  const [balances, setBalances] = useState<any[]>([]);
  const [balanceData, setBalanceData] = useState<any[]>([]);
  const [balanceStats, setBalanceStats] = useState<any>({});
  const [extend_data, setExtendData] = useState<any[]>([]);
  const [extend_stats, setExtendStats] = useState<any>({});
  const [extend_prices, setExtendPrices] = useState<any[]>([]);    
  const { fetchPrices, fetchParam, fetchTrades } = useSystemT();

  const cc_fsym = CC_FSYMS[symbol];

  useEffect(() => {
    async function init() {
      if (!symbol || !pid)  return;

      getPrices();
      getParam();
      getTrades();      
    }
    init();
  }, []);

  useEffect(() => {
    if (isEmpty(prices) || isEmpty(param) || isEmpty(trades))  return;

    calculateBalances();
    drawPriceChart();
  }, [prices, param, trades]);

  async function getPrices() {
    const data = await fetchPrices(symbol);
    setPrices(data);
  }

  async function getParam() {
    const data = await fetchParam(pid);
    setParam(data);
  }

  async function getTrades() {    
    const data = await fetchTrades(pid);

    let tops: any[] = [];
    let bottoms: any[] = [];
    let trades: any[] = [];
    let stop_trade: any = null;
    
    for (let i = 0; i < data.length; i++) {
      let t = data[i];
      let {date, buy, sell, top, bottom} = t;

      if (top)  tops.push(t);
      if (bottom)  bottoms.push(t);
      if (date && (buy || sell))  trades.push(t);
      if (!date)  stop_trade = t;
    }
    
    if (stop_trade)  trades.unshift(stop_trade);    
    trades = Utils.sortArrayBy(trades, 'date');

    setTrades(trades);
    setTops(tops);
    setBottoms(bottoms);
    setStopTrade(stop_trade);    
  }

  async function calculateBalances() {
    if (isEmpty(prices) || isEmpty(trades))  return;

    const balances = PriceUtils.stockBalances(prices, trades);    
    const balanceData = PriceUtils.balanceData(balances);
    const balanceStats = PriceUtils.balanceStats(balances);
    setBalances(balances);
    setBalanceData(balanceData);
    setBalanceStats(balanceStats);
  }

  async function drawPriceChart() {
    const Highcharts = window.Highcharts;
    if (typeof Highcharts == 'undefined')  return;
    if (typeof Highcharts.stockChart == 'undefined')  return;    
    if (isEmpty(prices) || isEmpty(param) || isEmpty(trades))  return;
    
    let intraday = PriceUtils.isIntraday(symbol);  
    let title = symbol.toUpperCase();    
    let fast_mv = param.fast_mv || 4;
    
    let data = prices.map(p => {
      let {date, open, high, low, close} = p;
      date = new Date(date).getTime();      
      if (cc_fsym)  close = PriceUtils.decimal(close / 1000, 4);      
      return [date, close];
    });
    
    let extend_data: any[] = [];
    let extend_prices: any[] = [];
    let stop_prices: any[] = [];
    let sorted_trades: any[] = Utils.sortArrayBy(trades, 'date', -1);
    let stops_data = prices.map((p,i) => {
      let {date, close, atr} = p;
      if (date < param.start_date)  return null;
      
      date = new Date(date).getTime();
      if (cc_fsym) {
        close = PriceUtils.decimal(close / 1000, 4);
        atr = PriceUtils.decimal(atr / 1000, 4);
      }
      
      let stop = PriceUtils.nextStop(param, sorted_trades, prices, i);
      if (!stop)  return null;
      
      let extend = PriceUtils.decimal(100.0 * (close - stop.price) / stop.price);
      extend_data.push([date, extend]);
      extend_prices.push({price: p, extend});
      
      stop_prices.push({date, stop: stop.price, close, atr});
      
      return [date, stop.price];
    }).filter(t => { return t; });
    
    let extend_stats = PriceUtils.extendStats(extend_data);
    setExtendData(extend_data);
    setExtendStats(extend_stats);
    setExtendPrices(extend_prices);    
    
    let {up_median, up_mean, up_max, up_min, up_resistance_median, up_resistance_mean, up_support_median, up_support_mean, down_resistance_median, down_resistance_mean, down_support_median, down_support_mean} = extend_stats;
    
    let resistance_data: any[] = [];
    let support_data: any[] = [];
    stop_prices.map(s => {
      let {date, stop, close, atr} = s;
      let adjusted_atr = 0.5 * atr;
      
      if (stop < close) {
        let res = stop * (1 + up_resistance_mean/100.0) + adjusted_atr;
        resistance_data.push([date, res]);
        
        let sup = stop * (1 + up_support_mean/100.0) - adjusted_atr;
        support_data.push([date, sup]);  
      }
      else {
        let res = stop * (1 + down_resistance_mean/100.0) + adjusted_atr;
        resistance_data.push([date, res]);
        
        let sup = stop * (1 + down_support_mean/100.0) - adjusted_atr;
        support_data.push([date, sup]);
      }
    });
    
//    let atr_data = prices.map(p => {
//      let {date, atr} = p;
//      date = new Date(date).getTime(); 
//      
//      if (cc_fsym)  atr = PriceUtils.decimal(atr / 1000, 4);
//      
//      return [date, atr];
//    });
    
    let atr_percent_data = prices.map(p => {
      let {date, atr, close} = p;
      date = new Date(date).getTime(); 
      
      let atr_percent = PriceUtils.decimal(100.0 * atr / close);
      
      return [date, atr_percent];
    });
    
    // let patterns = PriceUtils.scanABC(prices);
    // let pattern_data = [];
    // patterns.map(p => {
    //   let {top, a, b, c} = p;
    //   pattern_data.push({ x: new Date(top.date).getTime(), title: ' ', text: 'Top' });
    //   pattern_data.push({ x: new Date(a.date).getTime(), title: ' ', text: 'A' });
    //   pattern_data.push({ x: new Date(b.date).getTime(), title: ' ', text: 'B' });
    //   pattern_data.push({ x: new Date(c.date).getTime(), title: ' ', text: 'C' });
    // });
    
    let top_data = tops.map(t => {
      let {date} = t;
      return { x: new Date(date).getTime(), title: ' ', text: 'Top' };
    });
    
    let bottom_data = bottoms.map(t => {
      let {date} = t;
      return { x: new Date(date).getTime(), title: ' ', text: 'Bottom' };
    });
    
    let buy_data = trades.map(t => {
      let {date, buy, price, trade_profit} = t;
      if (!date || !buy)  return null;
      
      return { x: new Date(date).getTime(), title: ' ', text: 'Buy' };
    }).filter(t => { return t; });
    
    let sell_data = trades.map(t => {
      let {date, sell, price, trade_profit} = t;
      if (!date || !sell)  return null;
      
      return { x: new Date(date).getTime(), title: ' ', text: 'Sell: ' + trade_profit + '%' };
    }).filter(t => { return t; });

  //   let extend_buy_data = [];
  //   let extend_sell_data = [];
  //   if (notEmpty(extend_param)) {
  //     let top_extend_stat = PriceUtils.lowExtendStats(extend_prices, extend_param.extend_low, extend_param.hold_days, extend_param.stop, extend_param.atr_percent, extend_param.top_stop, true);
  // //    console.error({top_extend_stat});
      
  //     if (notEmpty(top_extend_stat)) {
  //       extend_buy_data = top_extend_stat.profit_percents.map(pp => {
  //         let {start_date, end_date} = pp;
  //         return { x: new Date(start_date).getTime(), title: ' ', text: 'SQ: Buy' };
  //       });
  // //      console.error({buy_data});
        
  //       extend_sell_data = top_extend_stat.profit_percents.map(pp => {
  //         let {start_date, end_date, profit} = pp;
  //         if (!end_date)  return false;
          
  //         return { x: new Date(end_date).getTime(), title: ' ', text: 'SQ: Sell: ' + profit + '%' };
  //       }).filter(pp => { return pp; });
        
  //       let extend_trade_data = top_extend_stat.profit_percents.map(pp => {
  //         let {start_date, end_date, profit} = pp;
  //         if (!end_date)  return false;
          
  //         let date = new Date(end_date).getTime(); 
  //         return [date, profit];
  //       }).filter(pp => { return pp; });
        
  //       let extendBalanceData = PriceUtils.balanceData(top_extend_stat.balances);
        
  // //      console.error({top_extend_stat, extend_trade_data});
  //       this.setState({top_extend_stat, extend_trade_data, extendBalanceData});
  //     }
  //   }
    
    let stop_data = null;
    if (stop_trade) {
      let stop_price = cc_fsym ? PriceUtils.decimal(stop_trade.price / 1000, 4) : stop_trade.price;
      let stop_price_text = stop_price;
      if (symbol.includes('inverse'))  stop_price_text += ' ' + PriceUtils.price(1000000/stop_price);
      
      stop_data = [{
        value: stop_price,
        color: stop_trade.buy ? 'green' : 'red',
        dashStyle: 'solid',
        width: 1,
        label: {text: (stop_trade.buy ? 'Stop Buy: ' : 'Stop Sell: ') + stop_price_text},
        zIndex: 1,
      }];
    }
    
    let range_buttons = [      
      {type: 'month', count: 1, text: '1m', title: 'View 1 month'}, 
      {type: 'month', count: 3, text: '3m', title: 'View 3 months'}, 
      {type: 'month', count: 6, text: '6m', title: 'View 6 months'}, 
      {type: 'ytd', text: 'YTD', title: 'View year to date'}, 
      {type: 'year', count: 1, text: '1y', title: 'View 1 year'}, 
      {type: 'all', text: 'All', title: 'View all'}
    ];    
    let range_selected = 2;
            
    // if (intraday && !symbol.includes('1d')) {
    //   range_buttons.unshift(
    //     {type: 'day', count: 1, text: '1D', title: 'View 1 day'},
    //     {type: 'day', count: 2, text: '2D', title: 'View 2 days'},
    //     {type: 'day', count: 3, text: '3D', title: 'View 3 days'},
    //     {type: 'day', count: 5, text: '5D', title: 'View 5 days'},
    //     {type: 'day', count: 10, text: '10D', title: 'View 10 days'},
    //     {type: 'day', count: 20, text: '20D', title: 'View 20 days'},
    //   );
    //   range_selected = 5;
      
    //   Highcharts.setOptions({
    //     time: {timezone: 'America/Los_Angeles'}
    //   });
    // }

    stockChart = Highcharts.stockChart('stock-chart', {      
      rangeSelector: {buttons: range_buttons, selected: range_selected},
      credits: {enabled: false},
      title: {text: title},
      yAxis: [{
        type: 'logarithmic',
        height: '80%',
        plotLines: stop_data,
      }, 
      {
        top: '60%',
        height: '40%',
      },
      {
        top: '80%',
        height: '20%',
      }], 
      series: [
        {
          name: 'Price',
          data: data,
          id: 'dataseries',
          tooltip: {valueDecimals: 4},
          zIndex: 2,          
        },
        {
          type: 'sma',
          linkedTo: 'dataseries',
          params: {period: fast_mv},
          color: 'orange',
          lineWidth: 1,
          zIndex: 1,
          marker: {enabled: false},
        },
        {
          name: 'Stop',
          data: stops_data,
          color: 'darkgray',
          lineWidth: 1,
          tooltip: {valueDecimals: 4},
        },
        {
          name: 'Resistance',
          data: resistance_data,
          color: 'gray',
          lineWidth: 1,
          dashStyle: 'dash',
          tooltip: {valueDecimals: 4},
        },
        {
          name: 'Support',
          data: support_data,
          color: 'gray',
          lineWidth: 1,
          dashStyle: 'dash',
          tooltip: {valueDecimals: 4},
        },
        {
          name: 'Extend Percent',
          data: extend_data,
          yAxis: 2,
          lineWidth: 1,
          color: 'darkgray',
          marker: {enabled: false},
          tooltip: {valueDecimals: 2},
        },
        // {
        //   name: 'ATR',
        //   data: atr_data,
        //   yAxis: 1,
        //   lineWidth: 1,
        //   color: 'gray',
        //   marker: {enabled: false},
        // },
        {
          name: 'ATR Percent',
          data: atr_percent_data,
          yAxis: 1,
          lineWidth: 1,
          color: 'red',
          marker: {enabled: false},
          tooltip: {valueDecimals: 2},
        },
        {
          type: 'flags',
          data: buy_data,
          onSeries: 'dataseries',
          shape: 'squarepin',
          width: 6,
          height: 6,
          color: 'green',
          fillColor: 'green',
          zIndex: 2,
          y: 30,
        },
        {
          type: 'flags',
          data: sell_data,
          onSeries: 'dataseries',
          shape: 'squarepin',
          width: 6,
          height: 6,
          color: 'red',
          fillColor: 'red',
          zIndex: 2,
          y: -40,
        },
        // {
        //   type: 'flags',
        //   data: extend_buy_data,
        //   onSeries: 'dataseries',
        //   shape: 'circlepin',
        //   width: 4,
        //   height: 4,
        //   color: 'mediumseagreen',
        //   fillColor: 'mediumseagreen',
        //   zIndex: 2,
        //   y: 15,
        // },
        // {
        //   type: 'flags',
        //   data: extend_sell_data,
        //   onSeries: 'dataseries',
        //   shape: 'circlepin',
        //   width: 4,
        //   height: 4,
        //   color: 'salmon',
        //   fillColor: 'salmon',
        //   zIndex: 2,
        //   y: -25,
        // },
        // {
        //   type: 'flags',
        //   data: pattern_data,
        //   onSeries: 'dataseries',
        //   shape: 'circlepin',
        //   width: 1,
        //   height: 1,
        //   color: 'gold',
        //   fillColor: 'gold',
        //   zIndex: 1,
        //   y: -5,
        // },
        {
          type: 'flags',
          data: top_data,
          onSeries: 'dataseries',
          shape: 'circlepin',
          width: 1,
          height: 1,
          color: 'silver',
          fillColor: 'silver',
          zIndex: 1,
        },
        {
          type: 'flags',
          data: bottom_data,
          onSeries: 'dataseries',
          shape: 'circlepin',
          width: 1,
          height: 1,
          color: 'silver',
          fillColor: 'silver',
          zIndex: 1,
        },
      ]
    });    
  }

  function clickChartTrade(point: any) {    
    let date: string = point.x;
    scrollChart(date);  
  }

  function scrollChart(date: string) {
    let delta = date ? 90 : 180;
    
    let start_date = date ? new Date(date) : new Date();
    start_date.setDate(start_date.getDate() - delta);
    
    let end_date = date ? new Date(date) : new Date();
    end_date.setDate(end_date.getDate() + delta);
    
    stockChart.xAxis[0].setExtremes(start_date.getTime(), end_date.getTime());
    Utils.scrollTop();
  }

  const tradeData = trades.map(trade => {
    let {date, sell, trade_profit} = trade;
    if (!date || !sell)  return null;
    
    date = new Date(date).getTime();    
    return [date, trade_profit];
  }).filter(t => { return t; });
  
  const tradeListHeader = (
    <tr>
      <th>Date</th>
      <th>Action</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Cost</th>
      <th>Balance</th>
      <th>Profit & Loss</th>
      <th>Inception-to-Date P&L</th>                  
    </tr>
  );

  const tradeList = Utils.sortArrayBy(trades, 'date', -1).map((trade,k) => {
    let {date, buy, sell, price, share, cost, balance, profit, trade_profit, top, bottom} = trade;
    
    const cl = buy ? 'buy' : sell ? 'sell' : '';
    if (cc_fsym)  price = PriceUtils.decimal(price / 1000, 4);    
    const action = (!date ? 'Stop ' : '') + Utils.firstCap(cl);

    return (
      <tr className={"trade "+cl} onClick={() => { scrollChart(date); }} key={k}>        
        <td>{date}</td>
        <td>{action}</td>
        <td>{Utils.formatMoney(price)}</td>
        <td>{share && Utils.numberFormat(share)}</td>
        <td>{cost && Utils.formatMoney(cost,0,0)}</td>
        <td>{balance && Utils.formatMoney(balance,0,0)}</td>        
        <td>{trade_profit && <span>{Utils.numberFormat(trade_profit)}%</span>}</td>
        <td>{profit !== null && <span>{Utils.numberFormat(profit)}%</span>}</td>
      </tr>
    );
  });

  return (
    <div id="trade">
      <SystemStats param={param} balanceStats={balanceStats} more={'performance'} />
      <Divider />

      <div id="stock-chart" style={{height: "700px"}}></div>
      <Divider />

      <Chart chart_id="chart-extends" type="stock" title="Extend Percent (Over Bought & Over Sold)" data={extend_data} chart_type="area" marker={{enabled: false}} onClick={clickChartTrade} style={{height:'400px'}} />
      <Divider />

      <Chart chart_id="chart-trades" type="stock" title="Trade Results" data={tradeData} chart_type="area" onClick={clickChartTrade} style={{height:'400px'}} tooltip={{ pointFormatter: function() { return `${this.y}%`; } }} />
      <Divider />

      <Section        
        title = "Trade Details"
        titleSize = "small"
        minHeight = "340px"
        body = {
          <VuiBox>              
            <div className="trade-list">              
              <table cellSpacing="0" cellPadding="0">                
                <thead>{tradeListHeader}</thead>                
                <tbody>{tradeList}</tbody>
              </table>
            </div>                     
          </VuiBox>
        }        
      />      
      <Divider />
    </div>
  );
}
