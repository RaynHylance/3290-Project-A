import React, { useEffect } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import FlightCard from "./FlightCard";

const getData = async (page, priceValue, from, to) => {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: "5",
    price_gte: String(Number(priceValue) * 1000 - 1000),
    price_lte: String(Number(priceValue) * 1000)
  });

  if (from) {
    params.set("from", from);
  }

  if (to) {
    params.set("to", to);
  }

  const res = await axios.get(
    `http://localhost:8080/flight?${params.toString()}`
  );

  return res.data;
};

export default function FlightList({ page, priceValue }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [searchParams] = useSearchParams();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    getData(page, priceValue, from, to)
      .then((res) => {
        if (active) {
          setData(res);
        }
      })
      .catch(() => {
        if (active) {
          setData([]);
          setError("Could not load flights.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [page, priceValue, from, to]);

  if (loading) {
    return <Text>Loading flights...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (data.length === 0) {
    return (
      <Text>
        No flights found
        {from && to ? ` from ${from} to ${to}` : ""}.
      </Text>
    );
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <FlightCard data={item} />
        </div>
      ))}
    </div>
  );
}