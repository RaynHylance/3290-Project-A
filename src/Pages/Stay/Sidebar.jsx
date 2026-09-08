import React from "react";
import { useSearchParams } from "react-router-dom";
import { fetchingHotels } from "../../Redux/StayReducer/action";
import { useDispatch } from "react-redux";
import PriceSlider from "./PriceSlider";

export const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = React.useState("asc");
  const [sort, setSort] = React.useState("");
  const dispatch = useDispatch();

  const updateSortParams = (selectedSort, selectedOrder) => {
    const params = new URLSearchParams(searchParams);

    params.set("_sort", selectedSort);
    params.set("_order", selectedOrder);

    setSearchParams(params);
  };

  const handlePriceChange = (e) => {
    const selectedOrder = e.target.value;
    const selectedSort = "price";

    setOrder(selectedOrder);
    setSort(selectedSort);
    updateSortParams(selectedSort, selectedOrder);
  };

  const handleRatingChange = (e) => {
    const selectedOrder = e.target.value;
    const selectedSort = "rating";

    setOrder(selectedOrder);
    setSort(selectedSort);
    updateSortParams(selectedSort, selectedOrder);
  };

  React.useEffect(() => {
    dispatch(fetchingHotels(sort, order));
  }, [sort, order, dispatch]);

  return (
    <div>
      <h3>Filter By Price</h3>

      <div onChange={handlePriceChange}>
        <input
          type="radio"
          name="price"
          value="asc"
        />
        <label>Low to High</label>

        <br />

        <input
          type="radio"
          name="price"
          value="desc"
        />
        <label>High to Low</label>
      </div>

      <br />
      <br />

      <h3>Filter By Rating</h3>

      <div onChange={handleRatingChange}>
        <input
          type="radio"
          name="rating"
          value="asc"
        />
        <label>Low to High</label>

        <br />

        <input
          type="radio"
          name="rating"
          value="desc"
        />
        <label>High to Low</label>
      </div>

      <br />
      <br />
      <br />

      <div>
        <PriceSlider />
      </div>
    </div>
  );
};

export default Sidebar;