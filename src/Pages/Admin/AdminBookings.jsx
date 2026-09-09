import {
  useEffect,
  useState
} from "react";
import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import axios from "axios";

export default function AdminBookings() {
  const [hotelBookings, setHotelBookings] =
    useState([]);

  const [flightBookings, setFlightBookings] =
    useState([]);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get(
        "http://localhost:8080/hotelcart"
      ),
      axios.get(
        "http://localhost:8080/flightcart"
      ),
      axios.get(
        "http://localhost:8080/users"
      )
    ])
      .then(
        ([
          hotelResponse,
          flightResponse,
          userResponse
        ]) => {
          setHotelBookings(
            hotelResponse.data
          );

          setFlightBookings(
            flightResponse.data
          );

          setUsers(userResponse.data);
        }
      )
      .catch(() => {
        setError(
          "Could not load admin booking data."
        );
      });
  }, []);

  if (error) {
    return (
      <Text p={8} color="red.500">
        {error}
      </Text>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading mb={8}>
        Booking Requests & Users
      </Heading>

      <Heading size="md" mb={4}>
        Hotel Bookings
      </Heading>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        spacing={4}
        mb={10}
      >
        {hotelBookings.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Stack spacing={2}>
              <Text fontWeight="bold">
                {item.name}
              </Text>

              <Text>
                {item.guest?.name ||
                  "Guest not entered"}
              </Text>

              <Text fontSize="sm">
                {item.checkInDate || "No date"}
                {" → "}
                {item.checkOutDate ||
                  "No date"}
              </Text>

              <Badge
                alignSelf="flex-start"
                colorScheme={
                  item.status === "confirmed"
                    ? "green"
                    : "orange"
                }
              >
                {item.status || "draft"}
              </Badge>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      <Heading size="md" mb={4}>
        Flight Bookings
      </Heading>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        spacing={4}
        mb={10}
      >
        {flightBookings.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Stack spacing={2}>
              <Text fontWeight="bold">
                {item.airline}
              </Text>

              <Text>
                {item.from} → {item.to}
              </Text>

              <Text>
                {item.passenger?.name ||
                  "Passenger not entered"}
              </Text>

              <Text fontSize="sm">
                {item.travelDate ||
                  "No travel date"}
              </Text>

              <Badge
                alignSelf="flex-start"
                colorScheme={
                  item.status === "confirmed"
                    ? "green"
                    : "orange"
                }
              >
                {item.status || "draft"}
              </Badge>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      <Heading size="md" mb={4}>
        Registered Users
      </Heading>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        spacing={4}
      >
        {users.map((user) => (
          <Box
            key={user.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Text fontWeight="bold">
              {user.user_name ||
                "Registered User"}
            </Text>

            <Text>
              Phone: {user.number || "N/A"}
            </Text>

            <Text>
              Email: {user.email || "N/A"}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}