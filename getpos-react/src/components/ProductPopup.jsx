import React, { useState, useContext, useEffect } from "react";
import NoImage from "../assets/images/no-img.png";
import Close from "../assets/images/cross.png"; // Cross icon for closing
import { CartContext } from "../common/CartContext";
import { Modal } from "antd";
import { useThemeSettings } from "./ThemeSettingContext";
import Slider from "../components/SliderComponent"
const ProductPopup = ({ product, onClose, selectedCustomer }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const { addItemToCart } = useContext(CartContext);
  const [content, setContent] = useState({})
  const themeSettings = useThemeSettings();
  useEffect(() => {
    if (!selectedCustomer) {
      const storedCustomer = localStorage.getItem("selectedCustomer");
      if (storedCustomer) {
        selectedCustomer = JSON.parse(storedCustomer);
      }
    }
  }, [selectedCustomer]);

  const handleAddItem = () => {
    const selectedCustomer = getSelectedCustomer();

    if (!selectedCustomer) {
      Modal.error({
        title: "Attention!",
        content: "Please select a customer before adding items to the cart.",
      });
      return;
    }

    const updatedProduct = { ...product, quantity, selectedAttributes, content };
    addItemToCart(updatedProduct);
    onClose();
  };

  const getSelectedCustomer = () => {
    const customer = localStorage.getItem("selectedCustomer");
    return customer ? JSON.parse(customer) : null;
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSelectionChange = (attributeIndex, option) => {
    const description = product.attributes[attributeIndex].description;
    const maxSelection = parseInt(description.match(/\d+/)[0], 10);
    const selectedOptions = selectedAttributes[attributeIndex] || [];

    if (maxSelection === 1) {
      setSelectedAttributes({
        ...selectedAttributes,
        [attributeIndex]: [option],
      });
    } else {
      const isSelected = selectedOptions.includes(option);
      const updatedOptions = isSelected
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];

      if (updatedOptions.length <= maxSelection) {
        setSelectedAttributes({
          ...selectedAttributes,
          [attributeIndex]: updatedOptions,
        });
      }
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = product.product_price * quantity;
    Object.values(selectedAttributes).forEach((attribute) => {
      attribute.forEach((option) => {
        const attributeOption = product.attributes
          .flatMap((attr) => attr.options)
          .find((opt) => opt.item === option);
        if (attributeOption && attributeOption.price) {
          totalPrice += attributeOption.price * quantity;
        }
      });
    });
    return totalPrice.toFixed(2);
  };

  return (
    <>
      <div className="add-to-cart-overlay"></div>
      <div className="add-to-cart-product-popup">
        {/* Cross button at the top right */}
        <button className="add-to-cart-popup-close" onClick={onClose}>
          <img src={Close} alt="Close" />
        </button>

        <div className="add-to-cart-popup-body">
          {/* Static Item Price */}
          <div className="add-to-cart-heading-img">
            <img src={product.image || NoImage} alt={product.name} />
            <div className="add-to-cart-heading-text">
              {/* Item Name and Price in the same line */}
              <div className="add-to-cart-name-price">
                <h2>{product.name}</h2>
                <span className="static-item-price">
                  {themeSettings.currency_symbol || "AED"}
                  {product.product_price?.toFixed(2)}
                </span>
              </div>

              {/* Quantity in the next line */}
              <div className="add-to-cart-quantity-control">
                <button onClick={decrementQuantity}>-</button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="0"
                  disabled
                />
                <button onClick={incrementQuantity}>+</button>
              </div>
            </div>
          </div>
              <Slider setContent={setContent} item={product.name}/>

          <div className="add-to-cart-attributes-container">
            {product.attributes.map((attribute, index) => (
              <div className="add-to-cart-popup-attribute" key={index}>
                <h3>{attribute.name}</h3>
                <div className="add-to-cart-popup-options">
                  {attribute.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type={
                          attribute.description.includes("Select 1")
                            ? "radio"
                            : "checkbox"
                        }
                        name={`attribute-${index}`}
                        checked={selectedAttributes[index]?.includes(
                          option.item
                        )}
                        onChange={() =>
                          handleSelectionChange(index, option.item)
                        }
                      />
                      {option.item_name} -{" "}
                      {option.price ? `${option.price}` : "Free"}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Updated Dynamic Item Total */}
          <div className="add-to-cart-popup-footer">
            <div className="add-to-cart-btn-total">
              Item Total <br />
              <span>
                {themeSettings.currency_symbol || "AED"}
                {calculateTotalPrice()}
              </span>
            </div>

            <button onClick={handleAddItem}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPopup;
