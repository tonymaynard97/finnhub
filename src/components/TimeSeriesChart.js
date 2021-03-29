import Chart from "react-apexcharts";

export const TimeSeriesChart = ({ series = [], priceType }) => {
  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: "100%",
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },

    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Price",
      },
    },
    title: {
      text: `Time Series analysis (Price Type: ${priceType})`,
      align: "center",
    },
    noData: {
      text: "Loading...",
    },
  };

  return (
    <div className="h-5/6 w-5/6 ml-auto mr-auto">
      <Chart options={options} series={series} type="line" />
    </div>
  );
};
