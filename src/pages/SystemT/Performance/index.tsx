import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Heading from 'components/Heading';
import Section from 'components/Section';
import Chart from 'components/Chart';
import SystemStats from '../components/SystemStats';
import * as Utils from 'utils';
import { isEmpty, notEmpty } from 'utils';
import PriceUtils from 'utils/price_utils';
import { useSystemT } from 'utils/system_t';

export default function Trade() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<any>({});
  const [prices, setPrices] = useState<any>({});
  const [trades, setTrades] = useState<any>({});
  const [balances, setBalances] = useState<any>({});
  const [balanceData, setBalanceData] = useState<any>({});
  const [balanceStats, setBalanceStats] = useState<any>({});
  const [portfolio_only, setPortfolioOnly] = useState<boolean>(true);
  const [downs_percents, setDownsPercents] = useState<any>({});
  const [downs_times, setDownsTimes] = useState<any>({});
  const [daily_returns, setDailyReturns] = useState<any>({});
  const [monthly_returns, setMonthlyReturns] = useState<any>({});
  const [quarterly_returns, setQuarterlyReturns] = useState<any>({});
  const [yearly_returns, setYearlyReturns] = useState<any>({});  
  const { fetchPrices, fetchParam, fetchTrades } = useSystemT();

  const _pids = (searchParams.get('pids') || '').split(',');
  const pids = _pids.map(p => {
    const ps = p.split(':');
    const id = ps[0];
    const percent = Utils.decimal(ps.length > 1 ? ps[1] : 100.0 / _pids.length); 
    return {id, percent};
  });

  useEffect(() => {
    async function init() {
      if (isEmpty(pids))  return;
      
      Utils.scrollTop(0);
      getData();
    }
    init();
  }, []);  

  useEffect(() => {    
    if (isEmpty(balances))  return;

    if (Utils.count(balances) == pids.length)  calculateBalances();
  }, [balances]);

  async function getData() {
    const _params: any = {};
    const _prices: any = {};
    const _trades: any = {};
    const _balances: any = {};
    for (const pid of pids) {
      const {id, percent} = pid;
      const param = await getParam(id, percent);
      const price = await getPrices(param);
      const trade = await getTrades(param);
      _params[id] = param;
      _prices[id] = price;
      _trades[id] = trade;
      _balances[id] = PriceUtils.stockBalances(_prices[id], _trades[id]);
      setParams(_params);
      setPrices(_prices);
      setTrades(_trades);        
      setBalances(_balances);
    }    
  }
  
  async function getParam(pid: string, percent: number) {
    const data = await fetchParam(pid);
    data.percent = percent;
    return data;    
  }

  async function getPrices(param: any) {
    const {symbol} = param;
    const data = await fetchPrices(symbol);
    return data;
  }

  async function getTrades(param: any) {    
    const {id} = param;
    const data = await fetchTrades(id);
    
    let ts: any[] = [];    
    for (let i = 0; i < data.length; i++) {
      const t = data[i];
      const {date, buy, sell} = t;
      if (date && (buy || sell))  ts.push(t);
    }            
    ts = Utils.sortArrayBy(ts, 'date');
    return ts;
  }

  async function calculateBalances() {    
    if (Utils.notEmpty(balanceData) || Utils.count(balances) < pids.length)  return;

    const portfolioBalances = PriceUtils.portfolioBalances(pids, prices, trades);
    let pBalances = portfolioBalances.portfolio;
    
    const _balanceData: any = {portfolio: PriceUtils.balanceData(pBalances)};
    pids.map(p => {
      const {id} = p;
      const {symbol, bt} = params[id];
      _balanceData[`${symbol}_${bt}`] = PriceUtils.balanceData(balances[id]);
    });
    
    const balanceStats: any = PriceUtils.balanceStats(pBalances, false, ['downs', 'daily_returns', 'monthly_returns', 'quarterly_returns', 'yearly_returns']);

    // Downs distributions
    const downs_percents: any = PriceUtils.dataDistribution(balanceStats.downs, -1, 1);
    downs_percents.dist5 = PriceUtils.dataDistribution(balanceStats.downs, -1, 5).dist;    
    
    const downs_times: any = PriceUtils.dataDistribution(balanceStats.downs, -1, 5, 'time');
    const down_times20: any = PriceUtils.dataDistribution(balanceStats.downs, -1, 20, 'time');
    downs_times.dist20 = down_times20.dist;

    // Return distributions
    const daily_returns: any = PriceUtils.dataDistribution(balanceStats.daily_returns);
      
    const monthly_returns: any = PriceUtils.dataDistribution(balanceStats.monthly_returns);
    monthly_returns.dist5 = PriceUtils.dataDistribution(balanceStats.monthly_returns, 1, 5).dist;
    
    const quarterly_returns: any = PriceUtils.dataDistribution(balanceStats.quarterly_returns, 1, 5);
    const yearly_returns: any = PriceUtils.dataDistribution(balanceStats.yearly_returns, 1, 10);

    // Current percent
    let current_pids: any[] = pids.map(p => {
      const {id, percent} = p;
      const allocation = (percent / 100.0) * (Utils.last(balances[id])).balance;
      return {id, allocation};
    });
    current_pids = PriceUtils.allocatingPercents(current_pids);
    current_pids.map(p => {
      let {id, percent} = p;
      params[id].cpercent = percent;
    });

    setBalanceData(_balanceData);
    setBalanceStats(balanceStats);
    setParams(params);
    setDownsPercents(downs_percents);
    setDownsTimes(downs_times);
    setDailyReturns(daily_returns);
    setMonthlyReturns(monthly_returns);
    setQuarterlyReturns(quarterly_returns);
    setYearlyReturns(yearly_returns);
  }

  const param: any = notEmpty(params) ? params[Object.keys(params)[0]] : {};
  const {symbol} = param;

  const percent_tooltip: any = { pointFormatter: function() { return `${Utils.numberFormat(this.y)}%`; } };

  const down_time_tooltip: any = { pointFormatter: function() {
    let d = -this.y;
    let w = Math.round(d / 5);
    let m = Math.round(d / 20);
    return `<b>${d}d, ${w}w, ${m}m</b>`;
  }};

  const balancesData: any = portfolio_only && balanceData.portfolio ? {portfolio: balanceData.portfolio} : balanceData;

  return (
    <div id="performance">      
      <Heading title={`${symbol ? symbol.toUpperCase() + ' - ' : ''}SYSTEM PERFORMANCE`} />      
      <SystemStats param={param} balanceStats={balanceStats} more={'trade'} />
      <Divider />
      
      <Chart chart_id="chart-balances" type="stock" title="Balance" data={balancesData} chart_type="line" style={{height:'600px'}} />
      <Divider />

      <Section        
        title = "Down Percents"
        titleSize = "small"
        body = {
          <VuiBox>                       
            <Chart chart_id="chart-downs-percent" type="stock" title="Down Percents & Distributions" data={downs_percents.data} chart_type="area" style={{height:'300px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-downs-percent-dist5" type="column" data={downs_percents.dist5} column_color="#ff000047" style={{height:'200px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-downs-percent-dist" type="column" data={downs_percents.dist} column_color="#ff000047" style={{height:'200px'}} tooltip={percent_tooltip} />
          </VuiBox>
        }        
      />
      <Divider />

      <Section        
        title = "Down Times"
        titleSize = "small"
        body = {
          <VuiBox>                       
            <Chart chart_id="chart-downs-time" type="stock" title="Down Times & Distributions" data={downs_times.data} chart_type="area" tooltip={down_time_tooltip} style={{height:'300px'}} />
            <Chart chart_id="chart-downs-time-dist20" type="column" data={downs_times.dist20} column_color="#ff000047" style={{height:'200px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-downs-time-dist" type="column" data={downs_times.dist} column_color="#ff000047" style={{height:'200px'}} tooltip={percent_tooltip} />
          </VuiBox>
        }        
      />      
      <Divider />
      
      <Section        
        title = "Monthly Returns"
        titleSize = "small"
        body = {
          <VuiBox>                       
            <Chart chart_id="chart-month-return" type="stock" title="Monthly Returns & Distributions" data={monthly_returns.data} chart_type="area" style={{height:'300px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-month-return-dist5" type="column" data={monthly_returns.dist5} style={{height:'200px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-month-return-dist" type="column" data={monthly_returns.dist} style={{height:'200px'}} tooltip={percent_tooltip} />
          </VuiBox>
        }        
      />      
      <Divider />      
      
      <Section        
        title = "Quarterly Returns"
        titleSize = "small"
        body = {
          <VuiBox>                       
            <Chart chart_id="chart-quarter-return" type="stock" title="Quarterly Returns & Distributions" data={quarterly_returns.data} chart_type="area" style={{height:'300px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-quarter-return-dist" type="column" data={quarterly_returns.dist} style={{height:'200px'}} tooltip={percent_tooltip} />
          </VuiBox>
        }        
      />      
      <Divider />
      
      <Section        
        title = "Yearly Returns"
        titleSize = "small"
        body = {
          <VuiBox>                       
            <Chart chart_id="chart-year-return" type="stock" title="Yearly Returns & Distributions" data={yearly_returns.data} chart_type="area" style={{height:'300px'}} tooltip={percent_tooltip} />
            <Chart chart_id="chart-year-return-dist" type="column" data={yearly_returns.dist} style={{height:'200px'}} tooltip={percent_tooltip} />
          </VuiBox>
        }        
      />      
      <Divider />      
    </div>
  );
}
