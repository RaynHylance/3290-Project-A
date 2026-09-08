import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import data from "./city";
import ShowCalender from "./ShowCalender";
import { Button, useToast } from "@chakra-ui/react";
import styles from "./Stay.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCity } from "../../Redux/StayReducer/action";

const formatLocalDate = (date) => {
  if (!date) return "";

  const local = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return local.toISOString().slice(0, 10);
};

function Stay() {
  const [selectedCity, setSelectedCity] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const checkInDate = useSelector(
    (state) => state.StayReducer.checkInDate
  );

  const checkOutDate = useSelector(
    (state) => state.StayReducer.checkOutDate
  );

  const handleOnSelect = (item) => {
    setSelectedCity(item.name);
    dispatch(selectCity(item.name));
  };

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        {item.name}
      </span>
    );
  };

  const handleSearch = () => {
    if (!selectedCity) {
      toast({
        title: "Choose a destination",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Choose check-in and check-out dates",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast({
        title: "Checkout must be after check-in",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const params = new URLSearchParams({
      city: selectedCity,
      checkIn: formatLocalDate(checkInDate),
      checkOut: formatLocalDate(checkOutDate)
    });

    navigate(`/stay?${params.toString()}`);
  };

  return (
    <div
      className="App"
      style={{
        marginLeft: "230px",
        position: "relative",
        display: "flex"
      }}
    >
      <header
        style={{
          backgroundColor: "white",
          margin: "20px",
          width: "400px"
        }}
      >
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={data}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            showIcon={false}
            placeholder="Going to"
            styling={{
              height: "44px",
              border: "1px solid #dfe1e5",
              borderRadius: "6px",
              backgroundColor: "white",
              boxShadow:
                "rgba(32, 33, 36, 0.28) 0px 1px 6px 0",
              hoverBackgroundColor: "#eee",
              color: "#212121",
              fontSize: "16px",
              fontFamily: "Arial",
              searchIconMargin: "0 0 0 16px"
            }}
          />
        </div>
      </header>

      <div
        className={styles["calenderWrapper"]}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <div style={{ width: "400px", marginTop: "20px" }}>
          <ShowCalender />
        </div>

        <Button
          colorScheme="blue"
          size="lg"
          className={styles["SearchBtn1"]}
          style={{ margin: "auto" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default Stay;