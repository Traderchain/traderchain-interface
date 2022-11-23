import ReactApexChart from "react-apexcharts";

export default function NAV() {
  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "10px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: "#56577A",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#0075FF", "#2CD9FF"],
    },
    colors: ["#0075FF", "#2CD9FF"],
  };

  const series = [
    {
      name: "Net Asset Value",
      data: [500, 250, 300, 220, 500, 250, 300, 230, 300, 350, 250, 400],
    },
    {
      name: "Share Price",
      data: [200, 230, 300, 350, 370, 420, 550, 350, 400, 500, 330, 550],
    },
  ];
  
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
