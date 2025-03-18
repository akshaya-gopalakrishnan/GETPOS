import React, { useEffect, useState,useRef} from "react";
import { Input, Button, Modal } from "antd";
import CloseCalc from "../../src/assets/images/calc-close.png";
import PrintFormateOfOrder from "./PrintFormateOfOrder";

const CashPaymentPopup = ({ total, isVisible, onClose, handlePlaceOrder,orderData }) => {
  const [cashReceived, setCashReceived] = useState("");
  const printRef = useRef();

  useEffect(() => {
    if (!isVisible) {
      setCashReceived("");
    }
  }, [isVisible]);

  const handleCashReceivedChange = (event) => {
    setCashReceived(event.target.value);
  };

  const handleKeypadClick = (value) => {
    setCashReceived((prev) => prev + value);
  };

  const handlePopupOK = () => {
    const received = cashReceived || total.toFixed(2);
    const balance = (parseFloat(received) - total).toFixed(2);
    
    // Store transaction data
    const transactionData = {
      total: total.toFixed(2),
      cashReceived: parseFloat(received).toFixed(2),
      balance: balance,
    };
    
    localStorage.setItem("cashTransaction", JSON.stringify(transactionData));
    
    // Update order data with payment info
    const updatedOrderData = {
      ...orderData,
      mode_of_payment: "Cash",
      cashReceived: transactionData.cashReceived,
      balanceAmount: transactionData.balance,
    };

    // Close the popup first
    onClose();

    // Handle print after a small delay to ensure proper state updates
    setTimeout(() => {
      if(printRef.current){
        printRef.current.handlePrint(updatedOrderData);
      }
      
      handlePlaceOrder();
      localStorage.removeItem("orderId");
    onClose();
    }, 100);
  };

  const handleKeypadClear = () => {
    setCashReceived("");
  };

  return (
    isVisible && (
      <div className="overlay">
        <div className="cash-popup-box">
          <div className="popup-content">
            <div className="popup-buttons">
              <Button onClick={onClose} className="close-calc">
                <img src={CloseCalc} alt="" />
              </Button>
            </div>
            <div className="popup-main">
              <div className="popup-left-cont">
                <div className="popup-row">
                  <label>Grand Total</label>
                  <Input value={total.toFixed(2)} readOnly />
                </div>
                <div className="popup-row">
                  <label>Cash Received</label>
                  <Input
                    type="text"
                    value={cashReceived}
                    onChange={handleCashReceivedChange}
                  />
                </div>
                <div className="popup-row">
                  <label>Balance</label>
                  <Input
                    value={(cashReceived ? cashReceived - total : 0).toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
              <div className="keypad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                  (num) => (
                    <Button key={num} onClick={() => handleKeypadClick(num)}>
                      {num}
                    </Button>
                  )
                )}
                <Button onClick={handleKeypadClear} className="clearbtn">
                  Clear
                </Button>
                <Button onClick={handlePopupOK} className="ok-btn">
                  Ok
                </Button>
              </div>
            </div>
          </div>
          <PrintFormateOfOrder ref={printRef} doc={orderData} />
        </div>
      </div>
    )
  );
};

export default CashPaymentPopup;