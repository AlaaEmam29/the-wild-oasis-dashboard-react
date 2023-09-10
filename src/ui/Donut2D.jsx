// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { styled } from "styled-components";
import { useContextDarkMode } from "../context/useContextDarkMode";
import { useStaysAfterDate } from "../features/dashboard/useStaysAfterDate";
import { useSearchParams } from "react-router-dom";

// Adding the chart and theme Column2D dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const StyledChart = styled.div`
  grid-column: 3 / -1;

  .raphael-group-19-caption text:nth-child(2) {
    transform: translate(0, 3px);
  }
  .raphael-group-19-caption text:nth-child(1) {
    transform: translate(0, -5px);
  }
`;
const Donut2D = () => {
  const { staysAfterDate, isStaysLoading, ConfirmedStays, daysCount } =
    useStaysAfterDate();
  const nights = new Set();

  staysAfterDate.forEach((item) => nights.add(String(item.numberOfNight)));
  const data = [...nights].map((item) => {
    return {
      label: "Number of nights",
      value: String(item),
    };
  });
  const { darkMode } = useContextDarkMode();
  const bgColor = darkMode ? "#18212f" : "#ffffff";
  const paletteColors = darkMode
    ? "#b91c1c,#c2410c,#a16207, #4d7c0f, #15803d, #0f766e, #1d4ed8,#7e22ce"
    : "#ef4444,#f97316,#eab308,#84cc16, #22c55e, #14b8a6,#3b82f6,#a855f7";
  const centerLabel = `# Guests: ${data.reduce(
    (total, item) => total + parseFloat(item.value),
    0,
  )}`;
  const [searchParams, setSearchParams] = useSearchParams();
  const days = searchParams.get("last") ? searchParams.get("last") : "7";
  const subcaption = `For all Guests last ${days} days`;
  const chartConfigs = {
    type: "doughnut2D", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Stay duration summary",
        subcaption,
        showpercentvalues: "0",
        defaultcenterlabel: "Stay duration summary",
        aligncaptionwithcanvas: "1",
        decimals: "1",
        captionpadding: "20",
        plottooltext: "<b>$percentValue </b> of stays are <b>$value</b> nights",

        theme: "umber",
        pieRadius: "45%",
        doughnutRadius: "70%",
        paletteColors,
        bgColor,
        centerLabel,

        chartTopMargin: "25",
      },
      data,
    },
  };
  return (
    <StyledChart>
      <ReactFC {...chartConfigs} />
    </StyledChart>
  );
};

export default Donut2D;
