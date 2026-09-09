import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationCard from "./DestinationCard";
import {
  Grid,
  Center,
  Text
} from "@chakra-ui/react";

export const Destination = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const place = searchParams.get("place") || "";

  useEffect(() => {
    let active = true;

    const params = new URLSearchParams();

    if (place) {
      params.set("place", place);
    }

    axios
      .get(
        `http://localhost:8080/Things_todo?${params.toString()}`,
        { timeout: 10000 }
      )
      .then((response) => {
        if (active) {
          setPlaces(response.data);
          setError("");
        }
      })
      .catch(() => {
        if (active) {
          setPlaces([]);
          setError(
            "Could not load things to do."
          );
        }
      });

    return () => {
      active = false;
    };
  }, [place]);

  if (error) {
    return (
      <Text p={8} color="red.500">
        {error}
      </Text>
    );
  }

  return (
    <Center>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        }}
        columnGap={20}
        rowGap={20}
        mt="60px"
      >
        {places.map((item) => (
          <DestinationCard
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            rating={
              Number(item.rating)
                ? Number(item.rating)
                : 0
            }
            place={item.place}
          />
        ))}
      </Grid>
    </Center>
  );
};