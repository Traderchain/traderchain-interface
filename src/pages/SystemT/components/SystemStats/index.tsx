import { Grid, Divider } from "@mui/material";
import { VuiBox, VuiTypography } from 'traderchain-ui';
import Section from 'components/Section';
import StatsTable from 'components/StatsTable';
import * as Utils from 'utils';

export default function SystemStats({param, balanceStats, more}: any) {

  const systemStatsColumns = [
    { name: "label" },
    { name: "value" },
  ];
  let systemStatsRows = [];
  const PARAM_FORMATS: any = {    
    symbol: {label: "Symbol", format: "string"},
    start_date: {label: "Start Date", format: "date"},          
    profit: {label: "Return on Investment (ROI)", format: "percent"},    
    win_rate: {label: "Win Rate", format: "percent"},        
    buy_count: {label: "Number of Trades", format: "integer"},    
  };  
  for (const prop in PARAM_FORMATS) {    
    const {label, format} = PARAM_FORMATS[prop];    
    let value = param[prop];
    if (!value)  continue;
    
    if (format == 'percent')  value = Utils.numberFormat(value) + '%';
    else if (format == 'number')  value = Utils.numberFormat(value);
    else if (format == 'integer')  value = Utils.numberFormat(value, 0, 0);
    else if (prop == 'symbol')  value = Utils.formatSymbol(`${value}`);
    systemStatsRows.push({ label, value });
  }

  const performanceColumns = [
    { name: "label" },
    { name: "value" },
  ];
  let performanceRows: any[] = [];  
  const PERFORMANCE_FORMATS: any = {    
    profit: {label: "Compound Annual Growth Rate (CAGR)", format: "percent"},    
    max_down: {label: "Maximum Drawdown", format: "percent"},    
    sharpe_ratio: {label: "Risk-Adjusted Return (CAGR / Max Down)", format: "number"},
    max_loss: {label: "Maximum Drawdown Period", format: "integer", suffix: "days"},
    updated: {label: "Trading Period", format: "number", suffix: "years"},
  };
  for (const prop in PERFORMANCE_FORMATS) {    
    const {label, format, suffix} = PERFORMANCE_FORMATS[prop];
    let value = balanceStats[prop];    
    if (!value)  continue;

    if (format == 'percent')  value = Utils.numberFormat(value) + '%';
    else if (format == 'number')  value = Utils.numberFormat(value);
    else if (format == 'integer')  value = Utils.numberFormat(value, 0, 0);
    if (suffix)  value += ' ' + suffix;

    performanceRows.push({ label, value });
  }

  return (
    <Grid container spacing={2}>        
      <Grid item xs={12} md={6}>
        <Section        
          title = "System Stats"
          titleSize = "small"
          body = {
            <VuiBox>                       
              <StatsTable columns={systemStatsColumns} rows={systemStatsRows} more={more=='trade' && {label: "See System Details", to: `/SystemT/trade/${param.symbol}?pid=${param.id}`}} />
            </VuiBox>
          }          
        />    
      </Grid>
      <Grid item xs={12} md={6}>
        <Section        
          title = "Performance"
          titleSize = "small"
          body = {
            <VuiBox>                       
              <StatsTable columns={performanceColumns} rows={performanceRows} more={more=='performance' && {label: "See Performance Details", to: `/SystemT/performance?pids=${param.id}`}} />
            </VuiBox>
          }            
        />    
      </Grid>
    </Grid>
  );
}
