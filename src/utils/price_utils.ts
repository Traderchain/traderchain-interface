import * as Utils from 'utils/lib';
import { isEmpty, notEmpty, clone, merge, decimal, timeDiff, sortArrayBy } from 'utils/lib';

import {CC_FSYMS} from 'utils/constants';

export const INVEST = 100000;
export const MAX_ALLOCATION = 100000;
export const ALLOCATION_UNIT = MAX_ALLOCATION / 100;
export const PARAM_LIMIT = 1000;

class PriceUtils {
  
  constructor() {    
  }
  
  min(p1: number, p2: number) {
    return this.price(p1 > p2 ? p2 : p1);
  }
  
  max(p1: number, p2: number) {
    return this.price(p1 < p2 ? p2 : p1);
  }
  
  mean(numbers: number[]) {
    if (isEmpty(numbers))  return 0.0;
    
    let total = 0;
    for (let i = 0; i < numbers.length; i += 1) {
      total += numbers[i];
    }
    return this.decimal(total / numbers.length);
  }
  
  median(numbers: number[]) {
    if (isEmpty(numbers))  return 0;
    
    let median = 0, numsLen = numbers.length;
    numbers.sort();
 
    if (numsLen % 2 === 0) {
      median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } 
    else {
      median = numbers[(numsLen - 1) / 2];
    }
 
    return median;
  }
  
  sum(numbers: number[]) {
    return this.decimal(numbers.reduce((a, b) => a + b, 0));
  }
  
  decimal(p: any, d=2) {
    if (typeof p == 'string')  p = parseFloat(p);
    
    return parseFloat(p.toFixed(d));
  }
  
  price(p: any) {
    if (typeof p == 'string')  p = parseFloat(p);
    
    return parseFloat(p.toFixed(2));
  }

  percent(v: number, base: number) {
    if (!v || !base)  return 0;
    
    let p = (v < 0 && base < 0 ? -100.0 : 100.0) * (v-base) / base;
    return this.price(p);
  }

  atr(prices: any[], i: number) {
    let atr_days = 14;
    let sum = 0;
    let count = 0;
    
    for (let k=0; k < atr_days; k++) {
      let j = i-k;
      if (j < 0)  break;
      
      let d = prices[j];
      let tr = 0;
      if (j > 0) {
        let prev_d = prices[j-1];
        tr = Math.max(d.high-d.low, Math.abs(d.high-prev_d.close), Math.abs(d.low-prev_d.close));  
      }
      else {
        tr = d.high-d.low;
      }
      sum += tr;
      count++;
    }
    
    return this.price(sum / count);
  };

  mv(days: number, prices: any[], i: number) {
    let sum = 0;
    let count = 0;
    
    for (let k=0; k < days; k++) {
      let j = i-k;
      if (j < 0)  break;
      
      let p = prices[j];
      
      sum += p.close;
      count++;
    }
    
    return count >= days ? this.price(sum / count) : 0.0;
  }
  
  baseSymbol(symbol: string) {
    return symbol.split('_')[0].toUpperCase();
  }
  
  isIntraday(symbol: string) {
    return symbol && (symbol.includes('5min') || symbol.includes('1h') || symbol.includes('1d'));
  }

  pidsMap(pids: any) {
    pids = pids ? pids.split(',') : [];
    return pids.map((p: string) => {
      let ps = p.split(':');
      let id = ps[0];
      let percent = decimal(ps.length > 1 ? ps[1] : 100.0/pids.length); 
      return {id, percent};
    });
  }
  
  allocatingPercents(pids: any[], a = 'allocation', pc = 'percent') {
    let total_invest = 0;
    pids.map(p => { total_invest += p[a]; });
    
    pids = pids.map(p => {
      p[pc] = decimal(100 * p[a] / total_invest);
      return p;
    });
    
    return pids;
  }
  
  balanceData(balances: any[]) {
    return balances.map(b => {
      let {date, balance} = b;
      date = new Date(date).getTime();
      return [date, balance];
    }); 
  }
  
  balanceStats(balances: any[], correct_name = false, extra_stats = []) {
    balances = sortArrayBy(balances, 'date');
    
    let max_down = 0;
    let max_down_time = 0;
    let down_time = 0;
    let up_time = 0;
    let downs: any = {};
    let daily_returns: any = {};
    let monthly_returns: any = {};
    let quarterly_returns: any = {};
    let yearly_returns: any = {};
    
    let start_date = Utils.first(balances).date;
    let end_date = Utils.last(balances).date;
    let years = timeDiff(start_date, end_date).years;
    
    let profit = Utils.last(balances).balance / INVEST; // TODO: INVEST => first(balances).balance 
    profit = decimal(100 * (Math.pow(profit, 1/years) - 1));
    
    let top = 0;
    let down_count = 0;
    let down_date = '';
    let prev_day = '';
    let prev_month = '';
    let prev_quarter = '';
    let prev_year = '';
    
    for (let i=0; i < balances.length; i++) {
      let {date, balance} = balances[i];
      
      if (balance > top) {
        top = balance;
        down_count = 0;
        down_date = date;
        up_time++;
      }
      else {
        let down = this.percent(balance, top);
        if (down < max_down)  max_down = down;
        
        if (!downs[down_date])  downs[down_date] = {percent: 0, time: 0};
        if (down < downs[down_date].percent)  downs[down_date].percent = down;
        downs[down_date].time--;
        
        down_time++;
        down_count++;
        if (down_count > max_down_time)  max_down_time = down_count;
      }
      
      let ds = date.split('-');
      let day = date.split(' ')[0];
      let month = `${ds[0]}-${ds[1]}`;
      let quarter = ds[0] + '-0' + Math.ceil(parseInt(ds[1]) / 3);
      let year = ds[0];
      
      if (typeof daily_returns[day] == 'undefined') {
        daily_returns[day] = balance;
        
        if (prev_day)  daily_returns[prev_day] = this.percent(balances[i-1].balance, daily_returns[prev_day]);
        prev_day = day;
      }
      
      if (typeof monthly_returns[month] == 'undefined') {
        monthly_returns[month] = balance;
        
        if (prev_month)  monthly_returns[prev_month] = this.percent(balances[i-1].balance, monthly_returns[prev_month]);
        prev_month = month;
      }
      
      if (typeof quarterly_returns[quarter] == 'undefined') {
        quarterly_returns[quarter] = balance;
        
        if (prev_quarter)  quarterly_returns[prev_quarter] = this.percent(balances[i-1].balance, quarterly_returns[prev_quarter]);
        prev_quarter = quarter;
      }
      
      if (typeof yearly_returns[year] == 'undefined') {
        yearly_returns[year] = balance;
        
        if (prev_year)  yearly_returns[prev_year] = this.percent(balances[i-1].balance, yearly_returns[prev_year]);
        prev_year = year;
      }
      
      if (i == balances.length - 1) {
        daily_returns[day] = this.percent(balance, daily_returns[day]);
        monthly_returns[month] = this.percent(balance, monthly_returns[month]);
        quarterly_returns[quarter] = this.percent(balance, quarterly_returns[quarter]);
        yearly_returns[year] = this.percent(balance, yearly_returns[year]);
      }
    }
    
    let sharpe_ratio = this.price(Math.abs(profit / max_down));
    let max_loss = max_down_time;
    let max_up = this.percent(balances.length + up_time, balances.length);
    let updated = years;
    let extra_data = {downs, daily_returns, monthly_returns, quarterly_returns, yearly_returns};
    
    // TODO: refactor naming
    let result = correct_name ? {risk_reward: sharpe_ratio, compound_profit: profit, max_down, max_down_time: max_loss, up_time: max_up, time_diff: updated, start_date, end_date}
                              : {max_down, profit, sharpe_ratio, max_loss, max_up, start_date, end_date, updated};
    
    extra_stats.map(s => { result[s] = extra_data[s]; });
    
    return result;
  }
  
  dataDistribution(raw_data: any, sort_order = 1, dist_unit = 1, prop = 'percent') {
    let data = [];
    let distMap: any = {};
    let dist = [];
    let count = 0;
    
    for (let date in raw_data) {
      let d = raw_data[date];
      d = (typeof d == 'object') ? d[prop] : d;
      
      const dt = new Date(date).getTime();
      let k = (prop == 'time' ? 1 : dist_unit) * Math.round(d / dist_unit);
      
      data.push([dt, d]);
      distMap[k] = (distMap[k] || 0) + 1;
      count++;
    }
    
    for (let k in distMap) {      
      let v = this.decimal(100.0 * distMap[k] / count);
      dist.push([k, v]);
    }
    dist = sortArrayBy(dist, 0, sort_order).map(d => { return [`${d[0]}`, d[1]]; });
    
    return {data, dist};
  }
  
  stockBalances(prices: any[], trades: any[]) {
    let start_trade_date = '';
    let cash = INVEST;
    let holding_share = 0;
    
    let tradeMap: any = {};
    trades.map((t: any) => {
      let {buy, sell, date, balance} = t;
      if (!buy && !sell)  return;

      if (!start_trade_date)  start_trade_date = date;  
      
      tradeMap[date] = t;
    });
      
    let balances = prices.map(p => {
      let {date, close} = p;
      if (date < start_trade_date)  return null;
      
      let t = tradeMap[date];
      
      let balance = 0;
      if (t) {
        let {share} = t;
        
        balance = t.balance;
        
        holding_share = share || 0;
        let value = close * holding_share;
        
        cash = balance - value;
      }
      else {
        let value = close * holding_share;
        
        balance = value + cash;
      }
      if (!balance)  return null;
      
      return {date, balance};
    })
    .filter(b => { return b; });
    
    return balances;
  }
  
  portfolioBalances(pids: any[], prices: any[], trades: any[]) {
    let balances: any = {};
    let start_date = '';
    let end_date = '';
    
    pids.map(p => {
      let {id} = p;
      
      balances[id] = this.stockBalances(prices[id], trades[id]);
    
      let first = Utils.first(balances[id]);
      if (first.date > start_date)  start_date = first.date;
      
      let last = Utils.last(balances[id]);
      if (!end_date || last.date < end_date)  end_date = last.date;
    });
    
    let pMap: any = {};
    pids.map(p => {
      let {id, percent} = p;
      let ratio = 0; 
      
      balances[id] = balances[id].map((b: any) => {
        let {date, balance} = b;
        if (date < start_date || date > end_date)  return null;
        
        if (!ratio)  ratio = INVEST / balance;
        balance = ratio * balance;
        
        if (!pMap[date])  pMap[date] = 0;
        pMap[date] += (balance * percent / 100.0);
        
        return {date, balance};
      })
      .filter((b: any) => { return b; });
    });
    
    let pBalances = [];
    for (let date in pMap) {
      let balance = pMap[date];
      pBalances.push({date, balance});
    }
    pBalances = sortArrayBy(pBalances, 'date');
    
    balances.portfolio = pBalances;
    
    return balances;
  }
  
  portfolioAssetExt(pa: any, k: number) {
    let new_pa: any = clone(pa);
    
    if (CC_FSYMS[new_pa.symbol]) {
      new_pa.price /= 1000;  
    }
    
    if (new_pa.share) {
      new_pa.value = Math.floor(new_pa.share * new_pa.price);
      if (new_pa.cost) {
        new_pa.profit = new_pa.value - new_pa.cost;
        new_pa.profit_p = this.percent(new_pa.value, new_pa.cost);
      }
    }
  
    return new_pa;
  }
  
  nextStop(param: any, trades: any[], prices: any[], i: number) {
    let {symbol, bt, stop_sell, stop_buy, fast_mv, fast_vola} = param;
    if (bt != 'mv')  return null;
    
    let p = prices[i];
    let {date} = p;
    
    let is_buying = false;
    if (notEmpty(trades)) {
      for (let trade of trades) {
        if (!trade.date)  continue;
        
        if (date >= trade.date) {
          if (trade.buy)  is_buying = true;
          else if (trade.sell)  is_buying = false;
          break;
        }
      }      
    }
    
    let stop: any = {};
    let mv = this.mv(fast_mv, prices, i);
    if (!mv)  return null;
    
    if (is_buying) {      
      stop.buy = 0; stop.sell = 1;
      
      let break_price = (1 - fast_vola) * mv;
      stop.price = this.price(break_price);
    }
    else {
      stop.buy = 1; stop.sell = 0;
      
      let break_price = (1 + fast_vola) * mv;
      stop.price = this.price(break_price);
    }
    
    if (CC_FSYMS[symbol])  stop.price /= 1000;
    
    return stop;
  }
  
  extendStats(extend_data: any[]) {
    let up_extends: any[] = [];
    let down_extends: any[] = [];
      
    extend_data.filter(e => {
      let d = e[0], v = e[1];
      
      if (v > 0)  up_extends.push(v);
      else  down_extends.push(v);
    });
    
    let up_median = this.median(up_extends);
    let up_mean = this.mean(up_extends);
    let up_max = Math.max(...up_extends);
    let up_min = Math.min(...up_extends);
    
    let up_resistances = up_extends.filter(r => { return r >= up_median; });
    let up_resistance_median = this.median(up_resistances);
    let up_resistance_mean = this.mean(up_resistances);
    
    let up_supports = up_extends.filter(r => { return r < up_median; });
    let up_support_median = this.median(up_supports);
    let up_support_mean = this.mean(up_supports);
    
    let down_median = this.median(down_extends);
    let down_mean = this.mean(down_extends);
    let down_max = Math.min(...down_extends);
    let down_min = Math.max(...down_extends);
    
    let down_resistances = down_extends.filter(r => { return r >= down_median; });
    let down_resistance_median = this.median(down_resistances);
    let down_resistance_mean = this.mean(down_resistances);
    
    let down_supports = down_extends.filter(r => { return r < down_median; });
    let down_support_median = this.median(down_supports);
    let down_support_mean = this.mean(down_supports);
    
    let result = {up_median, up_mean, up_max, up_min, up_resistance_median, up_resistance_mean, up_support_median, up_support_mean,
                  down_median, down_mean, down_max, down_min, down_resistance_median, down_resistance_mean, down_support_median, down_support_mean};
    return result;
  }
  
  scanABC(prices: any[]) {
    let patterns = [];
    let top = null, a = null, b = null, c = null;
    let al = 0, bl = 0;
    for (let i = 0; i < prices.length; i++) {
      let price = prices[i];
      let prev_price = i > 0 ? prices[i-1] : price;
      let next_price = i < prices.length-1 ? prices[i+1] : price;
      let p = price.close, pp = prev_price.close, np = next_price.close;
      
      // C
      if (top && a && b && p < pp && p < np && (p < a.close + bl/2 && p > a.close - bl/2)) { // TODO && (!c || p < c.close) <= DE
        c = price;
//        console.error({c: c.date});
        patterns.push({top, a, b, c});
        top = null; a = null; b = null; c = null;
      }
      
      // B
      if (top && a && p > pp && p > np && (p - a.close > al/2) && (!b || p > b.close)) {
        b = price;
        c = null;
        bl = b.close - a.close;
//        console.error({b: b.date, bl});
      }
      
      // A
      if (top && !c && p < pp && p < np && (!a || p < a.close)) {
        a = price;
        b = null; c = null;
        al = top.close - a.close;
//        console.error({a: a.date, al});
      }

      // Top
      if (top && (top.close < p - price.atr/3 || timeDiff(top.date,price.date).months >= 1)) { // TODO: atr, time range
        top = null; a = null; b = null; c = null;
      }
      if (!top && p > pp && p > np) {
        top = price;
        a = null; b = null; c = null;
//        console.error({top: top.date, atr: top.atr});
      }
    }
    
//    console.error(patterns);
    return patterns;
  }

  lowExtendStats(extend_prices: any[], extend_low: number, hold_days = 1, stop = -1, atr_percent = 2.56, top_stop = -0.5, extra_return = false) {
    let profit_percents = [];
    let held_days: any[] = [];
    let win_max_down = 0;
    let win_downs = [];
    let is_final_day = false;
    
    for (let i=0; i < extend_prices.length; i++) {
      let t = extend_prices[i];
      let e = t.extend, p = t.price.close, start_date = t.price.date, a = t.price.atr;
      let ap = this.decimal(100.0 * a / p);
      
      if (is_final_day)  break;
      if (e <= 0 || e > extend_low)  continue;
      if (ap > atr_percent)  continue;
      
      let win_down = 0;
      let pnt = null;
      
      for (let d = 1; d <= hold_days; d++) {
        let nt: any = i < extend_prices.length - d ? extend_prices[i+d] : (pnt || t);
        let ne = nt.extend, np = nt.price.close, end_date = nt.price.date;
        let pnp = pnt ? pnt.price.close : np;
        
        let profit = this.percent(np, p);
        let top_down = this.percent(np, pnp);

        let _closeTrade = () => {
          profit_percents.push({start_date, end_date, profit});
          held_days.push(d);
          i += d-1;
          
          if (profit > 0) {
            win_downs.push({start_date, end_date, win_down, profit});
            if (win_down < win_max_down)  win_max_down = win_down;  
          }
        };
        
        if (profit <= stop) {
          _closeTrade();
          break;
        }
        else if (profit > 0 && top_down < top_stop) {
          _closeTrade();
          break;
        }
        else if (d < hold_days) {
          if (profit < win_down)  win_down = profit;
          
          // Final day
          if (i + d == extend_prices.length - 1) {
            is_final_day  = true;
            profit_percents.push({start_date, end_date: '', profit});
            break;
          }
          
          pnt = nt;
          continue;
        }
        else if (profit <= 0) {
          _closeTrade();
          break;
        }
        else {
          _closeTrade();
          break;
        }
      }
    }
    if (isEmpty(profit_percents))  return {};
//    console.error({profit_percents});
    
    let consolidated_profits = [];
    let current_profit: any = null;
    for (let pp of profit_percents) {
      let {start_date, end_date, profit} = pp;
      if (!current_profit) {
        current_profit = clone(pp);
        continue;
      }
//      console.error('current_profit',current_profit);
//      console.error('pp',pp);
      
      if (start_date == current_profit.end_date) {
        current_profit.profit += profit;
        current_profit.end_date = end_date;
      }
      else {
        current_profit.profit = this.decimal(current_profit.profit); 
        consolidated_profits.push(current_profit);
        current_profit = clone(pp);
      }
    }
    if (current_profit) {
      current_profit.profit = this.decimal(current_profit.profit);
      consolidated_profits.push(current_profit);
    }
    profit_percents = consolidated_profits;
//    console.error({consolidated_profits});
    
    let first_date = Utils.first(extend_prices).price.date;
    let last_date = Utils.last(extend_prices).price.date;
    let years = timeDiff(first_date, last_date).years;
    
    let win_percents = profit_percents.filter(pp => { return pp.profit > 0; }).map(pp => { return pp.profit; });
    let lose_percents = profit_percents.filter(pp => { return pp.profit <= 0; }).map(pp => { return pp.profit; });
    
    let win_count = win_percents.length;
    let lose_count = lose_percents.length;
    let trade_count = win_count + lose_count;
    let win_rate = this.decimal(100.0 * win_count / trade_count);
    let win_mean = this.mean(win_percents);
    let lose_mean = this.mean(lose_percents);
    let win_median = this.median(win_percents);
    let lose_median = this.median(lose_percents);
    let win_max = Math.max(...win_percents);
    let lose_max = Math.min(...lose_percents);
    let win_sum = this.sum(win_percents);
    let lose_sum = this.sum(lose_percents);
    let profit = this.decimal(win_sum + lose_sum);
    let profit_per_year = this.decimal(profit / years); 
    let trades_per_year = this.decimal(trade_count / years, 0);
    let trades_per_month = this.decimal(trades_per_year / 12, 0);
    let held_days_mean = this.mean(held_days);

    let tradeMap: any = {};
    profit_percents.map(pp => {
      let {start_date, end_date, profit} = pp;
      tradeMap[start_date] = {buy: 1};
      if (end_date)  tradeMap[end_date] = {sell: 1, trade_profit: profit};
    });
//    console.error({tradeMap});
    
    let balance = INVEST;
    let trades = [];
    let prices = [];
    for (let ep of extend_prices) {
      let {date, close} = ep.price;
      let price = close;
      
      prices.push(ep.price);
      
      let t = tradeMap[date];
      if (!t) continue;
      
      let {buy, sell, trade_profit} = t;
      if (buy) {
        let cost = balance;
        let share = cost / price;
        let trade = {date, buy: 1, price, share, cost, balance};
        trades.push(trade);
      }
      else if (sell) {
        balance *= (1 + trade_profit/100.0); 
        let trade = {date, sell: 1, price, share: 0, cost: 0, balance, trade_profit};
        trades.push(trade);
      }
    }
//    console.error({trades});
 
    let balances = this.stockBalances(prices, trades);
//    console.error({balances});
    
    let balanceStats = this.balanceStats(balances, true);
    let {risk_reward, compound_profit, max_down} = balanceStats;
    
    let result: any = {extend_low, hold_days, stop,atr_percent, top_stop,
                  win_rate, profit, profit_per_year, trade_count, trades_per_month, win_max, lose_max, win_max_down,
                  risk_reward, compound_profit, max_down, years, first_date, last_date, 
                  win_count, lose_count, win_mean, lose_mean, win_median, lose_median, win_sum, lose_sum, trades_per_year, held_days_mean};
    
    if (extra_return)  result = merge(result, {profit_percents, balances, balanceStats});
    
//    console.error(JSON.stringify(result));
//    console.error(JSON.stringify(balanceStats));
//    console.error({profit_percents, balances, win_percents, lose_percents, held_days, win_downs});
    
    return result;
  }
  
}

const singleton = new PriceUtils();
export default singleton;
