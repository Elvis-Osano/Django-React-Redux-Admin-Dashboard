import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Api = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let data;
    let name = [];
    let sale = [];
    axios
      .get("http://localhost:8000/branch/")
      .then((res) => {
        data = res.data;
        data.forEach((item) => {
          name.push(item.name);
          sale.push(item.sale);
        });
        function getRandomRgb(c) {
          var num = Math.round(0xffffff * Math.random());
          var r = num >> 16;
          var g = (num >> 8) & 255;
          var b = num & 255;
          var a = c;
          return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        }
        let x = [];
        for (var i = 0; i < 15; i++) {
          x.push(getRandomRgb(0.2));
        }
        setChartData({
          labels: name,
          datasets: [
            {
              label: "Sales",
              data: sale,
              backgroundColor: x,
              borderWidth: 2,
              borderColor: getRandomRgb(0.6),
              hoverBorderColor: getRandomRgb(0.8),
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, [setChartData]);
  return (
    <div>
      <Bar
        data={chartData}
        width={100}
        height={20}
        options={{
          maintainAspectRatio: true,
          title: {
            display: true,
            text: "Monthly Company Perfomance",
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          tooltips: {
            enabled: true,
          },
        }}
      />
    </div>
  );
};

export default Api;
