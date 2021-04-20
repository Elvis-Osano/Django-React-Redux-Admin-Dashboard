import React from "react";

import { Line } from "react-chartjs-2";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import { Link } from "react-router-dom";
export default function Stocks() {
  const classes = useStyles();
  return (
    <>
      <Grid item className={classes.item}>
        <Link
          to="/bitcoin"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            component={"span"}
            variant={"body2"}
            className={classes.hover}
          >
            <TelegramIcon color="secondary" /> Company Stocks
          </Typography>
        </Link>

        <Line
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Colors",
                data: [12, 19, 3, 5, 7, 15, 16, 4, 12, 11.5, 16, 19],
                backgroundColor: ["rgba(225, 78, 202,0)"],
                borderColor: "rgb(225, 78, 202)",
                pointStyle: "star",
                pointBackgroundColor: "green",
              },
            ],
          }}
          width={100}
          height={100}
          options={{
            maintainAspectRatio: true,
            title: {
              display: true,
              text: "Monthly Company Stocks",
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
      </Grid>
    </>
  );
}
const useStyles = makeStyles({
  root: {
    color: "#fff",
    background: "transparent",
    height: "300px",
    width: "100%",
    margin: "30px 30px 10px 0",

    borderRadius: "4px",
  },
  item: {
    color: "#7777",
    font: "20px",
    background: "transparent",
    width: "32%",
    borderRadius: "4px",
  },
  hover: {
    color: "whitesmoke",
    "&:hover": {
      color: "rgb(7, 177, 77, 0.42)",
      textDecoration: "underline",
    },
  },
});
