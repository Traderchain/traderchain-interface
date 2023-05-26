import React from 'react';
import * as Utils from 'utils';

export default class Chart extends React.Component <any> {
  
  constructor(props: any) {
    super(props);
    
    this.state = this.getState(this.props);
  }
  
  getState(props: any) {
    let state = {};
    return Utils.merge(state, props);
  }
  
  componentDidMount() {
    this.chart();
  }

  componentWillReceiveProps(nextProps: any) {
    let {chart_id, data, refresh} = (this.props as any);
    if (Utils.notEmpty(data) && (!refresh || data.length == nextProps.data.length))  return;
    
    this.setState(this.getState(nextProps), () => {
      this.chart();
    });
  }
  
  get available() {
    return (typeof window.Highcharts != 'undefined') && (typeof window.Highcharts.chart != 'undefined');
  }
  
  chart() {
    if (!this.available)  return;
    
    let {type} = (this.state as any);
    
    if (type == 'stock')  return this.chartStock();
    else if (type == 'column')  return this.chartColumn();
    return this.chartScatter();
  }
  
  chartScatter() {
    if (!this.available)  return;
    
    let {chart_id, data, dataProps, onClick} = (this.state as any);
    if (Utils.isEmpty(data))  return;
    
    let p0 = dataProps[0];
    let p1 = dataProps[1];
    
    let title = p0 + ' vs. ' + p1;
    
    data = data.map((d: any) => { 
      let d0 = d[p0];
      let d1 = d[p1];
      if (d0 === null || d1 === null)  return null;
      if (typeof d0 == 'undefined' || typeof d1 == 'undefined')  return null;
            
      return [d0, d1]; 
    }).filter((d: any) => { return d; });
    
    const highChart = window.Highcharts.chart(chart_id, {
      credits: {enabled: false},
      chart: {
        type: 'scatter',
      },
      title: {text: title},
      xAxis: {
        title: {text: p0},
      },
      yAxis: {
        title: {text: p1}
      },
      legend: {enabled: false},
      plotOptions: {
        scatter: {
          marker: {
            symbol: 'diamond',
            radius: 5,
            states: {
              hover: {enabled: true, lineColor: 'rgb(100,100,100)'}
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: p0 + ': {point.x}' +', '+ p1 + ': {point.y}',
          }
        }
      },
      series: [{
        name: 'Data',
        color: 'rgba(119, 152, 191, .75)',
        data: data,
        events: {
          click: (event: any) => {
            let {x, y} = event.point;
            if (onClick)  onClick(dataProps, {x, y});
          }
        },
      }]
    });
  }
  
  chartStock() {
    if (!this.available)  return;
    
    let {chart_id, data, chart_type, data_decimal, title, tooltip, marker, onClick} = (this.state as any);
    if (Utils.isEmpty(data))  return;
    
    // Highcharts.setOptions({
    //   time: {timezone: 'America/Los_Angeles'}
    // });
    
    if (chart_type == 'area') {
      const highChart = window.Highcharts.stockChart(chart_id, {
        title: title ? {text: title} : null,
        credits: {enabled: false},
        rangeSelector: {selected: 5},
        series: [
          {
            name: 'Data',
            type: 'area',
            data: data,
            id: 'dataseries',
            tooltip: tooltip || {valueDecimals: 2},
            zIndex: 2,
            negativeColor: '#ff000047',
            lineWidth: 1,
            marker: marker || {enabled: true, radius: 4},
            events: {
              click: (event: any) => {
                let {x, y} = event.point;
                if (onClick)  onClick({x, y});
              }
            },
          },
        ]
      });  
    }
    else if (chart_type == 'line') {
      let series = [];
      for (let id in data) {
        series.push({
          id, 
          name: id,
          data: data[id],
          tooltip: tooltip || {valueDecimals: data_decimal || 0},
          lineWidth: (id=='portfolio' ? 4 : 2),
        });
      }
      
      let options: any = {        
        rangeSelector: {selected: 5},
        credits: {enabled: false},
        xAxis: {
          crosshair: {snap: false},
        },
        yAxis: {
          type: 'logarithmic', 
          crosshair: {snap: false},
        },
        series,
      };
      if (title)  options.title = {text: title};
      
      const highChart = window.Highcharts.stockChart(chart_id, options);
    }
  }

  chartColumn() {
    if (!this.available)  return;
    
    let {chart_id, data, column_color, tooltip, data_suffix} = (this.state as any);
    if (Utils.isEmpty(data))  return;
    
    const highChart = window.Highcharts.chart(chart_id, {
      credits: {enabled: false},
      chart: {type: 'column'},
      legend: {enabled: false},
      title: {text: null},
      xAxis: {title: null, type: 'category'},
      yAxis: {title: null},
      plotOptions: {series: {color: column_color}},
      series: [{
        data: data,
        dataLabels: { enabled: true, format: '{y}' + (data_suffix || '') },
        tooltip: tooltip || {valueDecimals: 2},
      }]
    });
  }
  
  render() {
    let {chart_id, data, style} = (this.state as any);    
    if (Utils.isEmpty(data))  return false;
    
    return (
      <div className="chart">
        <div id={chart_id} style={style || {height:'400px', margin:'10px 0'}}></div>
      </div>
    );
  }
}
