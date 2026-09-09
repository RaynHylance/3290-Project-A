import { useState } from "react";
import {
  Button,
  Flex,
  Select,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const destinations = [
  "Delhi",
  "Goa",
  "Rajasthan",
  "Bengaluru",
  "Mumbai",
  "Kolkata"
];

export default function PackageSearch() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination) {
      params.set("destination", destination);
    }

    navigate(`/packages?${params.toString()}`);
  };

  return (
    <Flex
      gap={4}
      p={6}
      align="center"
      justify="center"
      wrap="wrap"
    >
      <Text fontWeight="bold">
        Find a holiday package
      </Text>

      <Select
        maxW="260px"
        value={destination}
        onChange={(event) =>
          setDestination(event.target.value)
        }
        placeholder="Choose destination"
      >
        {destinations.map((place) => (
          <option key={place} value={place}>
            {place}
          </option>
        ))}
      </Select>

      <Button colorScheme="blue" onClick={handleSearch}>
        Search Packages
      </Button>
    </Flex>
  );
}