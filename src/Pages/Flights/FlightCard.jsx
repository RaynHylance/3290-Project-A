import { useRef, useState } from "react";
import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { FaPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FlightCard({ data }) {
  const navigate = useNavigate();
  const toast = useToast();
  const busy = useRef(false);
  const [saving, setSaving] = useState(false);

  const handleClick = async () => {
    if (busy.current) return;
    busy.current = true;
    setSaving(true);

    try {
      const { id: flightId, ...flight } = data;
      const response = await axios.post(
        "http://localhost:8080/flightcart",
        {
          ...flight,
          flightId,
          price: Number(flight.price),
          status: "draft",
          createdAt: new Date().toISOString()
        },
        { timeout: 10000 }
      );

      if (response.data.id == null) {
        throw new Error("Missing cart ID");
      }

      navigate(
        `/checkout?flightCartId=${encodeURIComponent(response.data.id)}`
      );
    } catch {
      toast({
        title: "Could not select this flight",
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

  return (
    <Flex
      gap={6}
      p={5}
      mb={4}
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <Box textAlign="center">
        <Icon as={FaPlane} boxSize={7} color="teal.600" aria-hidden="true" />
        <Text fontWeight="bold">{data.airline}</Text>
      </Box>

      <Box>
        <Text fontSize="sm">Departure</Text>
        <Text>{data.departure}</Text>
        <Text fontWeight="bold">{data.from}</Text>
      </Box>

      <Box>
        <Text fontSize="sm">Arrival</Text>
        <Text>{data.arrival}</Text>
        <Text fontWeight="bold">{data.to}</Text>
      </Box>

      <Box>
        <Text fontSize="sm">Duration</Text>
        <Text fontWeight="bold">{data.totalTime}</Text>
      </Box>

      <Box>
        <Text fontSize="sm">Price per traveler</Text>
        <Text fontWeight="bold">
          {Number(data.price).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR"
          })}
        </Text>
      </Box>

      <Button
        colorScheme="teal"
        onClick={handleClick}
        isLoading={saving}
        loadingText="Selecting"
      >
        Book Now
      </Button>
    </Flex>
  );
}