import {
  Box,
  Button,
  Center,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";

import React from "react";
import {
  Link as RouterLink
} from "react-router-dom";

import Stay from "../../Pages/Stay/Stay";
import Flights from "../../Pages/Flights/Flight";
import { InputBox } from "../../Pages/ThingsTodo/InputBox";
import PackageSearch from "../../Pages/PackageSearch";

const MainInputBox = () => {
  return (
    <Box
      width="85%"
      m="auto"
      mt={10}
      border="1px solid #BDBDBD"
      borderRadius="7px"
    >
      <Tabs
        position="relative"
        variant="unstyled"
      >
        <Center>
          <TabList
            borderBottom="1px solid #BDBDBD"
            width="80%"
            justifyContent="space-evenly"
            pt={5}
            pb={3}
          >
            <Tab
              _selected={{
                color: "blue.500"
              }}
              fontWeight="semibold"
            >
              Stays
            </Tab>

            <Tab
              _selected={{
                color: "blue.500"
              }}
              fontWeight="semibold"
            >
              Flights
            </Tab>

            <Tab
              _selected={{
                color: "blue.500"
              }}
              fontWeight="semibold"
            >
              Cart
            </Tab>

            <Tab
              _selected={{
                color: "blue.500"
              }}
              fontWeight="semibold"
            >
              Things to do
            </Tab>

            <Tab
              _selected={{
                color: "blue.500"
              }}
              fontWeight="semibold"
            >
              Packages
            </Tab>
          </TabList>
        </Center>

        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <Stay />
          </TabPanel>

          <TabPanel>
            <Flights />
          </TabPanel>

          <TabPanel>
            <Center p={8}>
              <Box textAlign="center">
                <Text mb={4}>
                  Review hotel and flight
                  selections saved to your cart.
                </Text>

                <Button
                  as={RouterLink}
                  to="/cart"
                  colorScheme="blue"
                >
                  Open Cart
                </Button>
              </Box>
            </Center>
          </TabPanel>

          <TabPanel>
            <InputBox />
          </TabPanel>

          <TabPanel>
            <PackageSearch />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MainInputBox;