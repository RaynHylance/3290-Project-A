import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import "./StayData.css";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

const PAGE_SIZE = 20;

const formatStoredDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const local = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return local.toISOString().slice(0, 10);
};

const StayData = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [searchParams, setSearchParams] = useSearchParams();

  const place = searchParams.get("place") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";

  const sort = searchParams.get("_sort") || "";
  const order = searchParams.get("_order") || "asc";

  const page = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const minPrice = Math.max(
    0,
    Number(searchParams.get("minPrice")) || 0
  );

  const maxPrice = Math.max(
    minPrice,
    Number(searchParams.get("maxPrice")) || 20000
  );

  const reduxCheckIn = useSelector(
    (state) => state.StayReducer.checkInDate
  );

  const reduxCheckOut = useSelector(
    (state) => state.StayReducer.checkOutDate
  );

  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadHotels = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          _page: String(page),
          _limit: String(PAGE_SIZE),
          price_gte: String(minPrice),
          price_lte: String(maxPrice)
        });

        if (place) {
          params.set("place", place);
        }

        if (sort) {
          params.set("_sort", sort);
          params.set("_order", order);
        }

        const response = await axios.get(
          `http://localhost:8080/hotel?${params.toString()}`,
          {
            signal: controller.signal,
            timeout: 10000
          }
        );

        if (!active) return;

        setHotels(response.data);

        setTotalHotels(
          Number(
            response.headers["x-total-count"] ||
            response.data.length
          )
        );
      } catch (err) {
        if (!active || err?.code === "ERR_CANCELED") return;

        setHotels([]);
        setTotalHotels(0);
        setError("Could not load hotels.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadHotels();

    return () => {
      active = false;
      controller.abort();
    };
  }, [
    place,
    sort,
    order,
    page,
    minPrice,
    maxPrice
  ]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
          searchPlace: place,
          checkInDate:
            checkIn || formatStoredDate(reduxCheckIn),
          checkOutDate:
            checkOut || formatStoredDate(reduxCheckOut),
          status: "draft",
          createdAt: new Date().toISOString()
        },
        {
          timeout: 10000
        }
      );

      if (response.data.id == null) {
        throw new Error("Missing hotel cart ID");
      }

      navigate(
        `/checkout?hotelCartId=${encodeURIComponent(
          response.data.id
        )}`
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

  const totalPages = Math.ceil(totalHotels / PAGE_SIZE);

  return (
    <div className="stay-data">
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {loading && (
        <Text p={5} role="status">
          Loading hotels...
        </Text>
      )}

      {error && (
        <Text p={5} color="red.500" role="alert">
          {error}
        </Text>
      )}

      {!loading && !error && hotels.length === 0 && (
        <Text p={5}>
          No hotels found
          {place ? ` in ${place}` : ""} for these filters.
        </Text>
      )}

      {!loading &&
        hotels.map((hotel) => (
          <div className="stay-card" key={hotel.id}>
            <img
              src={hotel.image}
              alt={hotel.name || "hotel"}
            />

            <div className="stay-info">
              <div className="stay-header">
                <h3 className="stay-name">
                  {hotel.name}
                </h3>
              </div>

              <p className="stay-location">
                {hotel.location || hotel.place}
              </p>

              <p className="stay-description">
                {hotel.description}
              </p>

              <div className="stay-details">
                <div className="stay-price">
                  <span>Price:</span>
                  <p>
                    ₹
                    {Number(
                      hotel.price
                    ).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="stay-rating">
                  <span>Rating:</span>
                  <p>
                    {hotel.rating
                      ? hotel.rating
                      : "Not rated"}
                  </p>
                </div>
              </div>

              <Button
                mt={4}
                colorScheme="teal"
                onClick={() =>
                  handleBookHotel(hotel)
                }
                isLoading={bookingId === hotel.id}
                loadingText="Selecting"
              >
                Book Hotel
              </Button>
            </div>
          </div>
        ))}

      {!loading && totalPages > 1 && (
        <Pagination
          current={page}
          total={totalPages}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default StayData;