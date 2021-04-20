import React, { useState } from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BarChartIcon from "@material-ui/icons/BarChart";
import Api from "./api";
import Stocks from "./stocks";
import Reel from "react-reel";

const Main = () => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  let x = Math.floor(Math.random() * (500 - 50) + 50);
  let y = Math.floor(Math.random() * (500 - 50) + 50);
  const [sales, setSales] = useState(x);
  const [shipment, setShipment] = useState(y);
  const onChange = (date) => {
    setDate(date);
  };

  // const updateSales = () => {
  //   setSales();
  // };
  // updateSales();

  return (
    <Container spacing={4} className={classes.center}>
      <Grid className={classes.root} container direction="row">
        <Grid item md={12}>
          <Typography component={"span"} variant={"body2"}>
            <BarChartIcon color="primary" /> Perfomance
          </Typography>
          <Api />
        </Grid>
      </Grid>
      <Grid
        className={classes.root}
        spacing={2}
        justify="space-between"
        container
        direction="row"
      >
        <Grid item className={classes.item}>
          <Typography
            component={"span"}
            variant={"body2"}
            style={{ color: "whitesmoke" }}
          >
            <LocalShippingIcon style={{ color: "#1d8cf8" }} />
            Daily shipments
          </Typography>
          <Typography
            component={"span"}
            variant={"body2"}
            style={{ marginTop: "20px", color: "white" }}
          >
            <Reel theme={reelStyle} text={`${sales}k`}></Reel>
          </Typography>
          <Calendar
            onChange={onChange}
            onClickDay={(date, events) =>
              date <= new Date() ? setSales(x) : null
            }
            value={date}
          />
        </Grid>
        <Grid item className={classes.item}>
          <Typography
            component={"span"}
            variant={"body2"}
            style={{ color: "whitesmoke" }}
          >
            <TimelineIcon style={{ color: "#8eff00" }} />
            Daily Sales
          </Typography>
          <Typography
            component={"span"}
            variant={"body2"}
            style={{ marginTop: "20px", color: "white" }}
          >
            <Reel theme={reelStyle} text={`${shipment}k`}></Reel>
          </Typography>
          <Calendar
            onChange={onChange}
            value={date}
            onClickDay={(date, events) =>
              date <= new Date() ? setShipment(x) : null
            }
          />
        </Grid>

        <Stocks />
      </Grid>
    </Container>
  );
};

export default Main;
const useStyles = makeStyles({
  root: {
    color: "#fff",
    background: "transparent",
    height: "300px",
    width: "80vw",

    borderRadius: "4px",
  },
  item: {
    color: "#7777",
    font: "20px",
    background: " transparent",
    width: "32%",
    borderRadius: "4px",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",
  },
});
const reelStyle = {
  group: {
    transitionDelay: "600ms",
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
    fontSize: "18px",
    fontWeight: "300",
    color: "#E2AB5B ",

    lineHeight: "0.95em",
  },
};
