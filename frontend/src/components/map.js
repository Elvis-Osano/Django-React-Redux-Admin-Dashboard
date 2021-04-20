import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_kenyaHigh from "@amcharts/amcharts4-geodata/kenyaHigh";
import React, { Component } from 'react';

am4core.useTheme(am4themes_animated);
class Map extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // ... chart code goes here ...

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}
export default Map