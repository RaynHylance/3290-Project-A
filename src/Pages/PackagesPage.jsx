import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  SimpleGrid,
  Stack,
  Text
} from "@chakra-ui/react";
import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

const packageData = [
  {
    id: 1,
    destination: "Goa",
    title: "Goa Beach Escape",
    days: 4,
    nights: 3,
    price: 18999,
    description:
      "A relaxing Goa getaway with hotel stay, beach time, and local sightseeing."
  },
  {
    id: 2,
    destination: "Delhi",
    title: "Delhi Discovery",
    days: 3,
    nights: 2,
    price: 12999,
    description:
      "Explore New Delhi landmarks, markets, food, and historic attractions."
  },
  {
    id: 3,
    destination: "Rajasthan",
    title: "Royal Rajasthan",
    days: 6,
    nights: 5,
    price: 28999,
    description:
      "A multi-day Rajasthan trip featuring forts, palaces, and cultural stops."
  },
  {
    id: 4,
    destination: "Bengaluru",
    title: "Bengaluru City Break",
    days: 3,
    nights: 2,
    price: 14999,
    description:
      "A short city package with hotel accommodations and popular Bengaluru attractions."
  },
  {
    id: 5,
    destination: "Mumbai",
    title: "Mumbai Weekend",
    days: 3,
    nights: 2,
    price: 15999,
    description:
      "A weekend package covering major Mumbai sights, shopping, and local experiences."
  },
  {
    id: 6,
    destination: "Kolkata",
    title: "Kolkata Culture Tour",
    days: 4,
    nights: 3,
    price: 16999,
    description:
      "Discover Kolkata architecture, food, museums, and cultural destinations."
  }
];

export default function PackagesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialDestination =
    searchParams.get("destination") || "";

  const [destination, setDestination] =
    useState(initialDestination);

  const [sort, setSort] = useState("price-asc");

  const filteredPackages = useMemo(() => {
    const result = destination
      ? packageData.filter(
          (item) =>
            item.destination === destination
        )
      : [...packageData];

    return result.sort((a, b) => {
      if (sort === "price-desc") {
        return b.price - a.price;
      }

      if (sort === "days-asc") {
        return a.days - b.days;
      }

      return a.price - b.price;
    });
  }, [destination, sort]);

  const applySearch = () => {
    const params = new URLSearchParams();

    if (destination) {
      params.set("destination", destination);
    }

    navigate(`/packages?${params.toString()}`);
  };

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading mb={2}>
        Holiday Packages
      </Heading>

      <Text color="gray.600" mb={6}>
        Search and compare demonstration holiday
        packages for the Expedia Clone class project.
      </Text>

      <Flex gap={4} wrap="wrap" mb={8}>
        <Select
          maxW="280px"
          value={destination}
          onChange={(event) =>
            setDestination(event.target.value)
          }
          placeholder="All destinations"
        >
          {[...new Set(
            packageData.map(
              (item) => item.destination
            )
          )].map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </Select>

        <Select
          maxW="240px"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
        >
          <option value="price-asc">
            Price: Low to High
          </option>
          <option value="price-desc">
            Price: High to Low
          </option>
          <option value="days-asc">
            Shortest Trip
          </option>
        </Select>

        <Button
          colorScheme="blue"
          onClick={applySearch}
        >
          Search
        </Button>
      </Flex>

      {filteredPackages.length === 0 ? (
        <Text>No packages found.</Text>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={6}
        >
          {filteredPackages.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              boxShadow="sm"
            >
              <Stack spacing={3}>
                <Badge
                  colorScheme="blue"
                  alignSelf="flex-start"
                >
                  {item.destination}
                </Badge>

                <Heading size="md">
                  {item.title}
                </Heading>

                <Text>
                  {item.days} days / {item.nights} nights
                </Text>

                <Text color="gray.600">
                  {item.description}
                </Text>

                <Text
                  fontSize="xl"
                  fontWeight="bold"
                >
                  ₹
                  {item.price.toLocaleString(
                    "en-IN"
                  )}
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  Demo package price per traveler
                </Text>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}