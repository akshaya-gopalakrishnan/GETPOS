import React, { useState } from "react";
import NoImage from "../assets/images/no-img.png";
import useScanDetection from "use-scan-detection";
import { getItemByScan } from "../modules/LandingPage";
import { Modal, Row } from "antd";
import { useThemeSettings } from "./ThemeSettingContext";

const ProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    return price && price.length > 0 ? price.toFixed(2) : " - NA";
  };
  // const newprice = !product?.attributes?.length && product?.product_price || 0
  // console.log(newprice,"newprice");
  const basePrice = (!product?.attributes?.length && product?.product_price) || 0;
  const newprice = parseFloat((basePrice * 1.05).toFixed(2));

  const [scannedValue, setScannedValue] = useState("");
  const themeSettings = useThemeSettings();

  return (
    <div
      className={`product-card`}
    >
      <div className="product-image">
        <img
          src={product?.image ? product?.image : NoImage}
          alt={product?.name}
        />
      </div>
      <div className="product-details">
        <span className="product-type mt-1 mb-2">{product?.item_type}</span>
        <div style={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
        <h4 className="product-name">{product?.name}</h4>
        <span>{product?.stock?.map((qty) => qty?.stock_qty)}</span>
        </div>
        
        {/* <span className="product-qty">
          {product?.stock?.map((qty) => qty?.stock_qty)}
        </span> */}
        <div className="price-addbtn">
          <span className="product-price">
            {themeSettings?.currency_symbol || "AED"} {" "}
            {newprice}
            {/* {!product?.attributes?.length && product?.product_price || " "} */}
            {/* {formatPrice(product?.product_price) || " - NA"} */}
          </span>
          <button className="add-button" onClick={() => onAddToCart(product)}>
            +Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
