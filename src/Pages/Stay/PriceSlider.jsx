import React from "react";
import "./PriceSlider.css";

const PriceSlider = ({
  minPrice,
  maxPrice,
  onChange
}) => {
  const safeMin = Math.min(
    Number(minPrice) || 0,
    Number(maxPrice) || 20000
  );

  const safeMax = Math.max(
    Number(maxPrice) || 20000,
    safeMin
  );

  return (
    <div className="price-range-slider">
      <div
        className="range-bar"
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          className="slider"
          style={{ marginBottom: "14%" }}
        >
          <p>Minimum Price</p>

          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={safeMin}
            onChange={(event) => {
              const value = Math.min(
                Number(event.target.value),
                safeMax
              );

              onChange("minPrice", value);
            }}
            className="slider-input"
          />

          <span className="slider-value">
            ₹{safeMin.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="slider">
          <p>Maximum Price</p>

          <input
            type="range"
            min="0"
            max="20000"
            step="100"
            value={safeMax}
            onChange={(event) => {
              const value = Math.max(
                Number(event.target.value),
                safeMin
              );

              onChange("maxPrice", value);
            }}
            className="slider-input"
          />

          <span className="slider-value">
            ₹{safeMax.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <p className="range-text">
        ₹{safeMin.toLocaleString("en-IN")}
        {" - "}
        ₹{safeMax.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default PriceSlider;