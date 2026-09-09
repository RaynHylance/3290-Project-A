import {
  useEffect,
  useState
} from "react";
import {
  Badge,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartPage() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCart = async () => {
    setLoading(true);
    setError("");

    try {
      const [hotelResponse, flightResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:8080/hotelcart",
            { timeout: 10000 }
          ),
          axios.get(
            "http://localhost:8080/flightcart",
            { timeout: 10000 }
          )
        ]);

      setHotels(hotelResponse.data);
      setFlights(flightResponse.data);
    } catch {
      setError("Could not load the cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (type, id) => {
    const resource =
      type === "hotel"
        ? "hotelcart"
        : "flightcart";

    await axios.delete(
      `http://localhost:8080/${resource}/${id}`
    );

    if (type === "hotel") {
      setHotels((items) =>
        items.filter((item) => item.id !== id)
      );
    } else {
      setFlights((items) =>
        items.filter((item) => item.id !== id)
      );
    }
  };

  if (loading) {
    return (
      <Text p={8}>Loading cart...</Text>
    );
  }

  if (error) {
    return (
      <Text p={8} color="red.500">
        {error}
      </Text>
    );
  }

  const empty =
    hotels.length === 0 &&
    flights.length === 0;

  return (
    <Box maxW="1100px" mx="auto" p={8}>
      <Heading mb={2}>Your Cart</Heading>

      <Text color="gray.600" mb={8}>
        Hotel and flight selections saved in the
        local Expedia Clone demo.
      </Text>

      {empty && (
        <Text>
          Your cart is empty. Search for a hotel
          or flight to add a booking.
        </Text>
      )}

      {hotels.length > 0 && (
        <>
          <Heading size="md" mb={4}>
            Hotels
          </Heading>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2
            }}
            spacing={5}
            mb={10}
          >
            {hotels.map((hotel) => (
              <Box
                key={hotel.id}
                p={5}
                borderWidth="1px"
                borderRadius="lg"
              >
                <Stack spacing={2}>
                  <Heading size="sm">
                    {hotel.name}
                  </Heading>

                  <Text>
                    {hotel.location ||
                      hotel.place}
                  </Text>

                  <Text>
                    ₹
                    {Number(
                      hotel.price
                    ).toLocaleString(
                      "en-IN"
                    )}{" "}
                    / night
                  </Text>

                  <Badge
                    alignSelf="flex-start"
                    colorScheme={
                      hotel.status ===
                      "confirmed"
                        ? "green"
                        : "orange"
                    }
                  >
                    {hotel.status || "draft"}
                  </Badge>

                  {hotel.bookingReference && (
                    <Text fontSize="sm">
                      Reference:{" "}
                      {hotel.bookingReference}
                    </Text>
                  )}

                  {hotel.status !==
                    "confirmed" && (
                    <Button
                      colorScheme="teal"
                      onClick={() =>
                        navigate(
                          `/checkout?hotelCartId=${hotel.id}`
                        )
                      }
                    >
                      Continue Booking
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    colorScheme="red"
                    onClick={() =>
                      removeItem(
                        "hotel",
                        hotel.id
                      )
                    }
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}

      {flights.length > 0 && (
        <>
          <Heading size="md" mb={4}>
            Flights
          </Heading>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2
            }}
            spacing={5}
          >
            {flights.map((flight) => (
              <Box
                key={flight.id}
                p={5}
                borderWidth="1px"
                borderRadius="lg"
              >
                <Stack spacing={2}>
                  <Heading size="sm">
                    {flight.airline}
                  </Heading>

                  <Text>
                    {flight.from} →{" "}
                    {flight.to}
                  </Text>

                  <Text>
                    ₹
                    {Number(
                      flight.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </Text>

                  <Badge
                    alignSelf="flex-start"
                    colorScheme={
                      flight.status ===
                      "confirmed"
                        ? "green"
                        : "orange"
                    }
                  >
                    {flight.status || "draft"}
                  </Badge>

                  {flight.bookingReference && (
                    <Text fontSize="sm">
                      Reference:{" "}
                      {flight.bookingReference}
                    </Text>
                  )}

                  {flight.status !==
                    "confirmed" && (
                    <Button
                      colorScheme="teal"
                      onClick={() =>
                        navigate(
                          `/checkout?flightCartId=${flight.id}`
                        )
                      }
                    >
                      Continue Booking
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    colorScheme="red"
                    onClick={() =>
                      removeItem(
                        "flight",
                        flight.id
                      )
                    }
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}