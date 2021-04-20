import React, { useState } from "react";
import Reel from "react-reel";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Line } from "react-chartjs-2";
import {
  Typography,
  Grid,
  makeStyles,
  Container,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import { green, orange, blue, red } from "@material-ui/core/colors";

export default function Crypt(data) {
  data = data.data;
  const classes = useStyles();
  const [timeFormat, setTimeFormat] = useState("24h");
  const { day, week, year, detail } = data;

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const renderDetail = (detail) => {
    if (detail) {
      console.log(detail);
      return (
        <>
          <Typography
            style={{ color: blue[600] }}
            component={"span"}
            variant={"body2"}
          >
            Stock Price:
            <span style={{ color: orange[200] }}>
              <Reel theme={ReelStyle.one} text={`$${detail.current_price}`} />
            </span>
          </Typography>

          <Typography
            style={{ color: blue[600] }}
            component={"span"}
            variant={"body2"}
          >
            {detail.price_change_percentage_24h < 0 ? (
              <ArrowDropDownIcon style={{ color: red[800] }} />
            ) : (
              <ArrowDropUpIcon style={{ color: green[800] }} />
            )}
            Percentage Price Change:
            {detail.price_change_percentage_24h < 0 ? (
              <Reel
                theme={ReelStyle.two}
                text={`${
                  Math.round(
                    (detail.price_change_percentage_24h + Number.EPSILON) *
                      10000
                  ) / 10000
                }%`}
              />
            ) : (
              <Reel
                theme={ReelStyle.three}
                text={`${detail.price_change_percentage_24h}%`}
              />
            )}
          </Typography>
        </>
      );
    }
  };
  return (
    <Container className={classes.root}>
      <Grid item className={classes.item}>
        <Typography component={"span"} variant={"body2"}>
          <TelegramIcon color="secondary" /> Company Stocks
        </Typography>
        <Line
          data={{
            datasets: [
              {
                label: "Price",
                data: determineTimeFormat(),
                backgroundColor: ["rgba(225, 78, 202,0.2)"],
                borderColor: "rgba(174, 305, 194, 0.6)",
                pointStyle: "star",
                border: "0.5px",
                pointBackgroundColor: "green",
                pointRadius: 0,
              },
            ],
          }}
          width={100}
          height={20}
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
              xAxes: [
                {
                  type: "time",
                  distribution: "linear",
                },
              ],
            },
            tooltips: {
              enabled: true,
            },
            lineHeightAnnotation: {
              always: true,
              hover: false,
              lineWeight: 1.5,
            },

            animation: {
              duration: 2000,
            },

            responsive: true,
          }}
        />
      </Grid>
      <div className={classes.details}>{renderDetail(detail)}</div>
      <ButtonGroup color="primary">
        <Button onClick={() => setTimeFormat("24h")}>24h</Button>
        <Button onClick={() => setTimeFormat("7d")}>7d</Button>
        <Button onClick={() => setTimeFormat("1y")}>1y</Button>
      </ButtonGroup>
    </Container>
  );
}
const useStyles = makeStyles({
  root: {
    color: "#fff",
    background: "transparent",
    height: "100vh",
    width: "100%",
    margin: "30px 30px 10px 0",

    borderRadius: "4px",
  },
  item: {
    color: "#7777",
    font: "20px",
    background: "transparent",
    width: "100%",
    height: "40%",

    borderRadius: "4px",
  },
  details: {
    background: "rgba(7,7,7,0.5)",
    display: "flex",
    height: "200px",
    justifyContent: "space-around",
  },
});
const ReelStyle = {
  one: {
    group: {
      transitionDelay: "0ms",
      transitionTimingFunction: "ease-in-out",
      transform: "translate(0, 0)",
    },
    number: {
      height: "1em",
      fontFamily: "Fira sans",
    },

    reel: {
      height: "1em",
      display: "flex",
      alignItems: "flex-end",
      overflowY: "hidden",
      fontSize: "2rem",
      fontWeight: "300",
      color: "wheat",
      // #E2AB5B color

      lineHeight: "0.95em",
    },
  },
  two: {
    group: {
      transitionDelay: "0ms",
      transitionTimingFunction: "ease-in-out",
      transform: "translate(0, 0)",
    },
    number: {
      height: "1em",
      fontFamily: "Fira sans",
    },

    reel: {
      height: "1em",
      display: "flex",
      alignItems: "flex-end",
      overflowY: "hidden",
      fontSize: "2rem",
      fontWeight: "300",
      color: red[500],
      // #E2AB5B color

      lineHeight: "0.95em",
    },
  },
  three: {
    group: {
      transitionDelay: "0ms",
      transitionTimingFunction: "ease-in-out",
      transform: "translate(0, 0)",
    },
    number: {
      height: "1em",
      fontFamily: "Fira sans",
    },

    reel: {
      height: "1em",
      display: "flex",
      alignItems: "flex-end",
      overflowY: "hidden",
      fontSize: "2rem",
      fontWeight: "300",
      color: green[500],
      // #E2AB5B color

      lineHeight: "0.95em",
    },
  },
};
