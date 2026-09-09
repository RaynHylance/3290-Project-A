import { useSearchParams } from "react-router-dom";
import PriceSlider from "./PriceSlider";

const Sidebar = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const sort = searchParams.get("_sort") || "";
  const order = searchParams.get("_order") || "";

  const minPrice = Number(
    searchParams.get("minPrice") || 0
  );

  const maxPrice = Number(
    searchParams.get("maxPrice") || 20000
  );

  const updateParams = (changes) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(
      ([key, value]) => {
        if (
          value === "" ||
          value === null ||
          value === undefined
        ) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }
    );

    params.set("page", "1");

    setSearchParams(params);
  };

  const handleSort = (selectedSort, selectedOrder) => {
    updateParams({
      _sort: selectedSort,
      _order: selectedOrder
    });
  };

  return (
    <div>
      <h3>Filter By Price</h3>

      <label>
        <input
          type="radio"
          name="priceSort"
          checked={
            sort === "price" && order === "asc"
          }
          onChange={() =>
            handleSort("price", "asc")
          }
        />
        Low to High
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="priceSort"
          checked={
            sort === "price" && order === "desc"
          }
          onChange={() =>
            handleSort("price", "desc")
          }
        />
        High to Low
      </label>

      <br />
      <br />

      <h3>Filter By Rating</h3>

      <label>
        <input
          type="radio"
          name="ratingSort"
          checked={
            sort === "rating" && order === "asc"
          }
          onChange={() =>
            handleSort("rating", "asc")
          }
        />
        Low to High
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="ratingSort"
          checked={
            sort === "rating" &&
            order === "desc"
          }
          onChange={() =>
            handleSort("rating", "desc")
          }
        />
        High to Low
      </label>

      <br />
      <br />

      <PriceSlider
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={(name, value) =>
          updateParams({
            [name]: value
          })
        }
      />
    </div>
  );
};

export default Sidebar;