import { useState } from "react";
import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";
import styles from "../Stay/Stay.module.css";

const initialState = {
  from: "",
  to: "",
  passenger: 1,
  departureDate: "",
  returnDate: "",
};

export default function Flights() {
  const [PassengerData, setPassengerData] = useState(initialState);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setPassengerData({
      ...PassengerData,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = () => {
    if (!PassengerData.from || !PassengerData.to) {
      toast({
        title: "Choose a departure and destination city",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    if (PassengerData.from === PassengerData.to) {
      toast({
        title: "Departure and destination must be different",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const params = new URLSearchParams({
      from: PassengerData.from,
      to: PassengerData.to
    });

    navigate(`/flight?${params.toString()}`);
  };

  const swapValuehandler = () => {
    setPassengerData({
      ...PassengerData,
      from: PassengerData.to,
      to: PassengerData.from,
    });
  };

  return (
    <div>
      <div className="homeTop" style={{ marginBottom: "100px" }}>
        <div className="homeTopCard">
          <div className="secondHeader"></div>

          <div className="homeInputBx">
            <div>
              <div className="homeInputs">
                <input name="type" type="radio" id="inputs" />
                <label htmlFor="inputs">ONE WAY</label>
              </div>

              <div className="homeInputs">
                <input name="type" type="radio" id="inputs2" />
                <label htmlFor="inputs2">ROUND TRIP</label>
              </div>

              <div className="homeInputs">
                <input name="type" type="radio" id="inputs3" />
                <label htmlFor="inputs3">MULTI CITY</label>
              </div>
            </div>
          </div>

          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>FROM</span>

              <select
                name="from"
                id="from"
                style={{ width: "200px" }}
                value={PassengerData.from}
                onChange={handleChange}
              >
                <option value="">From</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>

              <button type="button" onClick={swapValuehandler}>
                <i className="fa fa-exchange"></i>
              </button>
            </div>

            <div className="MainSearchinputBx">
              <span>TO</span>

              <select
                name="to"
                id="fromto"
                style={{ width: "200px" }}
                value={PassengerData.to}
                onChange={handleChange}
              >
                <option value="">To</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>
            </div>

            <div className="MainSearchinputBx">
              <span>DEPARTURE</span>
              <input
                name="departureDate"
                type="date"
                value={PassengerData.departureDate}
                onChange={handleChange}
              />
            </div>

            <div className="MainSearchinputBx">
              <span>RETURN</span>
              <input
                name="returnDate"
                type="date"
                value={PassengerData.returnDate}
                onChange={handleChange}
              />
            </div>

            <div className="MainSearchinputBx">
              <span>TRAVELLERS & CLASS</span>

              <input
                type="number"
                min="1"
                value={PassengerData.passenger}
                onChange={handleChange}
                name="passenger"
              />
            </div>
          </div>

          <div className="homeSearchButtonBx">
            <Button
              colorScheme="blue"
              size="lg"
              className={styles["SearchBtn1"]}
              style={{ margin: "auto" }}
              onClick={handleClick}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}