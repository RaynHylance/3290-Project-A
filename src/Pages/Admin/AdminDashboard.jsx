import axios from "axios";
import {
  useEffect,
  useState
} from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.Module.css";

export const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    flights: 0,
    hotels: 0,
    users: 0,
    bookings: 0
  });

  useEffect(() => {
    Promise.all([
      axios.get(
        "http://localhost:8080/flight"
      ),
      axios.get(
        "http://localhost:8080/hotel"
      ),
      axios.get(
        "http://localhost:8080/users"
      ),
      axios.get(
        "http://localhost:8080/flightcart"
      ),
      axios.get(
        "http://localhost:8080/hotelcart"
      )
    ])
      .then(
        ([
          flights,
          hotels,
          users,
          flightCart,
          hotelCart
        ]) => {
          setCounts({
            flights: flights.data.length,
            hotels: hotels.data.length,
            users: users.data.length,
            bookings:
              flightCart.data.length +
              hotelCart.data.length
          });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="mainAdminLandingpage">
      <div className="adminSideBr">
        <h1>
          <Link to="/admin">Home</Link>
        </h1>

        <h1>
          <Link to="/admin/adminflight">
            Add Flight
          </Link>
        </h1>

        <h1>
          <Link to="/admin/adminstay">
            Add Stays
          </Link>
        </h1>

        <h1>
          <Link to="/admin/products">
            All Flights
          </Link>
        </h1>

        <h1>
          <Link to="/admin/hotels">
            All Hotels
          </Link>
        </h1>

        <h1>
          <Link to="/admin/bookings">
            Bookings & Users
          </Link>
        </h1>

        <h1>
          <Link to="/">Log out</Link>
        </h1>
      </div>

      <div className="mainBox">
        <div className="mainBoxHead">
          <h1>Admin Dashboard</h1>
          <hr />
          <hr />
          <hr />
        </div>

        <div className="DataBoxes">
          <div className="dataBx">
            <h1>Total Hotels</h1>
            <h1>{counts.hotels}</h1>
            <Link to="/admin/hotels">
              View
            </Link>
          </div>

          <div className="dataBx">
            <h1>Total Flights</h1>
            <h1>{counts.flights}</h1>
            <Link to="/admin/products">
              View
            </Link>
          </div>

          <div className="dataBx">
            <h1>Total Users</h1>
            <h1>{counts.users}</h1>
            <Link to="/admin/bookings">
              View
            </Link>
          </div>

          <div className="dataBx">
            <h1>Booking Requests</h1>
            <h1>{counts.bookings}</h1>
            <Link to="/admin/bookings">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};