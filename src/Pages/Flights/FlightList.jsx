import React, { useEffect } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";

const getData = async (page, priceValue) => {
  let res = await axios.get(
    `http://localhost:8080/flight?_page=${page}&_limit=5&price_gte=${
      Number(priceValue) * 1000 - 1000
    }&price_lte=${Number(priceValue) * 1000}`
  );
  return res.data;
};

export default function FlightList({ page, priceValue }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData(page, priceValue).then((res) => {
      setData(res);
    });
  }, [page, priceValue]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <FlightCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
