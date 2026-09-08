import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import "./StayData.css";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

const StayData = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();

  const searchCity = searchParams.get("city") || "";
  const searchCheckIn = searchParams.get("checkIn") || "";
  const searchCheckOut = searchParams.get("checkOut") || "";

  const { data } = useSelector((store) => store.StayReducer);
  const checkInDate = useSelector((state) => state.StayReducer.checkInDate);
  const checkOutDate = useSelector((state) => state.StayReducer.checkOutDate);

  const [selectedPriceRange] = useState([0, 10000]);
  const [filteredHotel, setFilteredHotel] = useState([]);
  const [bookingId, setBookingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalNumOfPages = Math.ceil(244 / 20);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (data) {
      setFilteredHotel(
        data.filter(
          (hotel) =>
            Number(hotel.price) >= selectedPriceRange[0] &&
            Number(hotel.price) <= selectedPriceRange[1]
        )
      );
    }
  }, [data, selectedPriceRange]);

  const handleBookHotel = async (hotel) => {
    if (bookingId !== null) return;

    setBookingId(hotel.id);

    try {
      const { id: hotelId, ...hotelData } = hotel;

      const response = await axios.post(
        "http://localhost:8080/hotelcart",
        {
          ...hotelData,
          hotelId,
          price: Number(hotel.price),
          taxes: Number(hotel.taxes || 0),
          searchCity,
          checkInDate:
            searchCheckIn ||
            (checkInDate
              ? new Date(
                  checkInDate.getTime() -
                    checkInDate.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .slice(0, 10)
              : ""),
          checkOutDate:
            searchCheckOut ||
            (checkOutDate
              ? new Date(
                  checkOutDate.getTime() -
                    checkOutDate.getTimezoneOffset() * 60000
                )
                  .toISOString()
                  .slice(0, 10)
              : ""),
          status: "draft",
          createdAt: new Date().toISOString()
        },
        { timeout: 10000 }
      );

      if (response.data.id == null) {
        throw new Error("Missing hotel cart ID");
      }

      navigate(
        `/checkout?hotelCartId=${encodeURIComponent(response.data.id)}`
      );
    } catch {
      toast({
        title: "Could not select this hotel",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="stay-data">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {filteredHotel?.map((hotel) => (
        <div className="stay-card" key={hotel.id}>
          <img src={hotel.image} alt={hotel.name || "hotel"} />

          <div className="stay-info">
            <div className="stay-header">
              <h3 className="stay-name">{hotel.name}</h3>
            </div>

            <p className="stay-location">
              {hotel.location || hotel.place}
            </p>

            <p className="stay-description">{hotel.description}</p>

            <div className="stay-details">
              <div className="stay-price">
                <span>Price:</span>
                <p>₹{Number(hotel.price).toLocaleString()}</p>
              </div>

              <div className="stay-rating">
                <span>Rating:</span>
                <p>{hotel.rating ? hotel.rating : 1}</p>
              </div>
            </div>

            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => handleBookHotel(hotel)}
              isLoading={bookingId === hotel.id}
              loadingText="Selecting"
            >
              Book Hotel
            </Button>
          </div>
        </div>
      ))}

      <div>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={totalNumOfPages}
        />
      </div>
    </div>
  );
};

export default StayData;