import React, { useEffect, useState } from "react";
import coinGecko from "./coinApi";
import { PacmanLoader } from "react-spinners";
import { Button, Typography } from "@material-ui/core";
import Crypt from "./crypt";

export default function CoinList() {
  const [error, setError] = useState(false);
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  const getcoins = () => {
    const fetchdata = async () => {
      const id = "bitcoin";
      setLoading(true);
      try {
        const [day, week, year, detail] = await Promise.all([
          coinGecko.get(`/coins/${id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "1",
            },
          }),
          coinGecko.get(`/coins/${id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "7",
            },
          }),
          coinGecko.get(`/coins/${id}/market_chart/`, {
            params: {
              vs_currency: "usd",
              days: "365",
            },
          }),
          coinGecko.get("/coins/markets/", {
            params: {
              vs_currency: "usd",
              ids: id,
            },
          }),
        ]);
        setCoinData({
          day: formatData(day.data.prices),
          week: formatData(week.data.prices),
          year: formatData(year.data.prices),
          detail: detail.data[0],
        });
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchdata();
  };
  useEffect(getcoins, []);

  if (error) {
    return (
      <div className={"wrapper"}>
        <Typography color="secondary" variant="h5">
          Oops!Error
        </Typography>
        <br />
        <Button
          onClick={() => {
            setCoinData({});
            window.location.reload();
            setLoading(false);
          }}
          value={"Refresh"}
          color="primary"
          variant="outlined"
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className={"wrapper"}>
          <PacmanLoader color={"#aa00ff"} loading={loading} size={50} />
        </div>
      ) : (
        <Crypt data={coinData} />
      )}
    </>
  );
}
