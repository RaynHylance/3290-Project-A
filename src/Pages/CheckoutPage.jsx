import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();

  const flightCartId = searchParams.get("flightCartId");
  const hotelCartId = searchParams.get("hotelCartId");

  const isHotel = Boolean(hotelCartId);
  const cartId = hotelCartId || flightCartId;

  const cartApi = isHotel
    ? "http://localhost:8080/hotelcart"
    : "http://localhost:8080/flightcart";

  const navigate = useNavigate();
  const toast = useToast();
  const busy = useRef(false);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    checkInDate: "",
    checkOutDate: ""
  });

  const today = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    setItem(null);
    setError("");
    setLoading(true);

    if (!cartId) {
      setLoading(false);
      return;
    }

    axios
      .get(`${cartApi}/${encodeURIComponent(cartId)}`, {
        signal: controller.signal,
        timeout: 10000
      })
      .then(({ data }) => {
        if (!active) return;

        setItem(data);

        if (isHotel) {
          setForm((previous) => ({
            ...previous,
            checkInDate: data.checkInDate || "",
            checkOutDate: data.checkOutDate || ""
          }));
        }
      })
      .catch(() => {
        if (active) {
          setError(
            "Could not load this selection. Return and try again."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [cartId, cartApi, isHotel]);

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const confirmBooking = async (event) => {
    event.preventDefault();

    if (!item || busy.current || item.status === "confirmed") return;

    if (!form.name.trim() || !form.email.trim()) {
      toast({
        title: "Enter the traveler details",
        status: "error",
        duration: 4000
      });
      return;
    }

    if (isHotel) {
      if (
        !form.checkInDate ||
        !form.checkOutDate ||
        form.checkInDate < today ||
        form.checkOutDate <= form.checkInDate
      ) {
        toast({
          title: "Check the hotel dates",
          description: "Checkout must be after check-in.",
          status: "error",
          duration: 4000
        });
        return;
      }
    } else {
      if (!form.date || form.date < today) {
        toast({
          title: "Choose a valid travel date",
          status: "error",
          duration: 4000
        });
        return;
      }
    }

    busy.current = true;
    setSaving(true);

    try {
      let update;

      if (isHotel) {
        const start = new Date(`${form.checkInDate}T00:00:00`);
        const end = new Date(`${form.checkOutDate}T00:00:00`);

        const nights = Math.max(
          1,
          Math.round((end - start) / 86400000)
        );

        const roomPrice = Number(item.price);
        const taxes = Number(item.taxes || 0);
        const total = roomPrice * nights + taxes;

        update = {
          status: "confirmed",
          bookingReference: `DEMO-HOTEL-${item.id}`,
          guest: {
            name: form.name.trim(),
            email: form.email.trim()
          },
          checkInDate: form.checkInDate,
          checkOutDate: form.checkOutDate,
          nights,
          rooms: 1,
          total,
          currency: "INR",
          confirmedAt: new Date().toISOString()
        };
      } else {
        update = {
          status: "confirmed",
          bookingReference: `DEMO-FLIGHT-${item.id}`,
          passenger: {
            name: form.name.trim(),
            email: form.email.trim()
          },
          travelDate: form.date,
          travelers: 1,
          total: Number(item.price),
          currency: "INR",
          confirmedAt: new Date().toISOString()
        };
      }

      const { data } = await axios.patch(
        `${cartApi}/${encodeURIComponent(item.id)}`,
        update,
        { timeout: 10000 }
      );

      setItem(data);
    } catch {
      toast({
        title: "Could not save your booking",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      busy.current = false;
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Text p={8} role="status">
        Loading your selection...
      </Text>
    );
  }

  if (error || !item) {
    return (
      <Box p={8}>
        <Text role="alert">
          {error || "Choose something before checking out."}
        </Text>

        <Button
          mt={4}
          onClick={() => navigate(isHotel ? "/stay" : "/flight")}
        >
          Go back
        </Button>
      </Box>
    );
  }

  const confirmed = item.status === "confirmed";

  return (
    <Box
      maxW="760px"
      mx="auto"
      my={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Stack spacing={5}>
        <Heading size="lg">
          {confirmed
            ? "Demo booking confirmed"
            : "Review and book"}
        </Heading>

        <Text color="gray.600">
          Class project demo. No payment is collected and no real
          reservation or ticket is issued.
        </Text>

        <Box p={4} bg="gray.50" borderRadius="md">
          {isHotel ? (
            <>
              <Heading size="md">{item.name}</Heading>

              <Text fontWeight="bold" mt={2}>
                {item.location || item.place || "Hotel stay"}
              </Text>

              <Text mt={3}>
                Room price:{" "}
                {Number(item.price).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR"
                })}{" "}
                per night
              </Text>
            </>
          ) : (
            <>
              <Heading size="md">{item.airline}</Heading>

              <Text fontWeight="bold" mt={2}>
                {item.from} to {item.to}
              </Text>

              <Text>
                {item.departure} - {item.arrival} ({item.totalTime})
              </Text>

              <Text mt={3} fontWeight="bold">
                Demo total for 1 traveler:{" "}
                {Number(item.price).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR"
                })}
              </Text>
            </>
          )}
        </Box>

        {confirmed ? (
          <Box
            p={4}
            bg="green.50"
            borderRadius="md"
            role="status"
          >
            <Text fontWeight="bold">
              Reference: {item.bookingReference}
            </Text>

            {isHotel ? (
              <>
                <Text>Guest: {item.guest?.name}</Text>
                <Text>Check-in: {item.checkInDate}</Text>
                <Text>Check-out: {item.checkOutDate}</Text>
                <Text>Nights: {item.nights}</Text>

                <Text mt={2} fontWeight="bold">
                  Demo total:{" "}
                  {Number(item.total).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR"
                  })}
                </Text>
              </>
            ) : (
              <>
                <Text>Passenger: {item.passenger?.name}</Text>
                <Text>Travel date: {item.travelDate}</Text>
              </>
            )}

            <Text mt={2}>
              Your demo booking has been saved.
            </Text>
          </Box>
        ) : (
          <Box as="form" onSubmit={confirmBooking}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>
                  {isHotel ? "Guest name" : "Passenger name"}
                </FormLabel>

                <Input
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  maxLength={80}
                  required
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>

                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  maxLength={254}
                  required
                />
              </FormControl>

              {isHotel ? (
                <>
                  <FormControl isRequired>
                    <FormLabel>Check-in</FormLabel>

                    <Input
                      name="checkInDate"
                      type="date"
                      min={today}
                      value={form.checkInDate}
                      onChange={updateForm}
                      required
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Check-out</FormLabel>

                    <Input
                      name="checkOutDate"
                      type="date"
                      min={form.checkInDate || today}
                      value={form.checkOutDate}
                      onChange={updateForm}
                      required
                    />
                  </FormControl>
                </>
              ) : (
                <FormControl isRequired>
                  <FormLabel>Travel date</FormLabel>

                  <Input
                    name="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={updateForm}
                    required
                  />
                </FormControl>
              )}

              <Button
                type="submit"
                colorScheme="teal"
                isLoading={saving}
                loadingText="Saving"
              >
                Confirm demo booking
              </Button>
            </Stack>
          </Box>
        )}

        <Button
          variant="outline"
          onClick={() =>
            navigate(isHotel ? "/stay" : "/flight")
          }
        >
          {isHotel ? "Back to hotels" : "Back to flights"}
        </Button>
      </Stack>
    </Box>
  );
}