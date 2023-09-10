import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import ScrollArea2D from "fusioncharts/fusioncharts.widgets";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.umber";
import { styled } from "styled-components";
import { useBookingsAfterDate } from "../features/dashboard/useBookingsAfterDate";
import { format, parseISO } from "date-fns";
import { useContextDarkMode } from "../context/useContextDarkMode";

ReactFC.fcRoot(FusionCharts, ScrollArea2D, FusionTheme);

const StyledChart = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / -1;
  text {
    font-weight: bold !important;
    text-transform: capitalize !important;
  }
`;

const LineChart = () => {
  const { recentBookings, isRecentLoading } = useBookingsAfterDate();
  const { darkMode } = useContextDarkMode();
  let betweens = new Set();
  recentBookings.forEach((item) => {
    const date = format(parseISO(item.created_at), "d MMM yyyy");

    betweens.add(date);
  });
  const betweensArr = [...betweens].sort((a, b) => new Date(a) - new Date(b));

  const category = betweensArr.map((item) => ({
    label: item,
  }));
  let data = new Set();
  recentBookings.forEach((item) => {
    data.add(String(Math.round(item.totalPrice + item.fees)));
  });
  data = Array.from(data).map((item) => ({
    value: item,
  }));
  const caption =
    betweensArr.length === 1
      ? `Sales ${betweensArr[0]}`
      : `Sales from ${betweensArr[0]} - ${betweensArr[betweensArr.length - 1]}`;
  const bgColor = darkMode ? "#18212f" : "#ffffff";
  const dataSource = {
    chart: {
      caption,
      showvalues: "0",
      flatscrollbars: "0",
      scrollheight: "12",
      scrollshowbuttons: "1",
      numvisibleplot: "12",
      aligncaptionwithcanvas: "0",
      xAxisName: "Month",
      yAxisName: "Amount (In USD)",
      numberPrefix: "$",

      // theme: "gammel",
      theme: "umber",

      bgColor,
    },
    categories: [
      {
        category,
      },
    ],
    dataset: [
      {
        data,
      },
    ],
  };

  const chartConfigs = {
    type: "scrollarea2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    chart: {
      pieRadius: "55%",
      doughnutRadius: "75%",
      borderThickness: 7,
    },

    dataSource,
  };

  return (
    <StyledChart>
      <ReactFC {...chartConfigs} />
    </StyledChart>
  );
};

export default LineChart;
