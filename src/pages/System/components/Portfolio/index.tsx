import ReactApexChart from "react-apexcharts";

export default function Portfolio() {
  const options: any = {    
    legend: {
      show: false
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function(val: string) {
          return val + "%";
        }
      }
    },
    labels: ['WETH', 'USDC'],
    theme: {
      monochrome: {
        enabled: true
      }
    },    
    dataLabels: {
      formatter(val: number, opts: any) {
        const name = opts.w.globals.labels[opts.seriesIndex]
        return [name, val.toFixed(1) + '%']
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1.0,
        opacityTo: 0.8,
        stops: [],
      },      
    },
    stroke: {
      show: false,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 3,
      dashArray: 0,
    },   
  };
  
  const series = [70, 30];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width="100%"   
      height="100%"   
    />
  );
}
