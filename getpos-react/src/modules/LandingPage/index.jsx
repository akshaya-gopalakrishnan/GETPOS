import axiosInstance from "../../axiosInstance";
import APIs from "../../api";

export const login = async (email, password) => {
  try {
    // Make the POST request to the login API
    // const response = await axiosInstance.get(APIs.login, {
    //   usr: email,
    //   pwd: password,
    // });
    const response = await axiosInstance.get(`${APIs.login}?usr=${email}&pwd=${password}`);

   
      return response.data;
   
  } catch (error) {
    // Handle errors, such as network issues or server errors
    throw error;
  }
};
export const getUser = async () => {
  try {
    const response = await axiosInstance.get(`${APIs.get_user}`);  
      return response.data;  
  } catch (error) {
    // Handle errors, such as network issues or server errors
    throw error;
  }
};

export const fetchOpeningData = async () => {
  try {
    const response = await axiosInstance.get(APIs.getOpeningData);
    // console.log("Opening data:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching opening data:", error);
    throw error;
  }
};

export const getOpeningShift = async (openingShiftData) => {
  try {
    const response = await axiosInstance.post(
      APIs.createOpeningShift,
      openingShiftData
    );
    // console.log("POS opening shift created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating POS opening shift:", error);
    throw error;
  }
};
export const getClosingShift = async (closingShiftData) => {
  try {
    const payload = {
      closing_shift: {
        period_start_date: closingShiftData.closing_shift.period_start_date,
        posting_date: closingShiftData.closing_shift.posting_date,
        pos_profile: closingShiftData.closing_shift.pos_profile,
        pos_opening_shift: closingShiftData.closing_shift.pos_opening_shift,
        doctype: closingShiftData.closing_shift.doctype,
        payment_reconciliation: closingShiftData.closing_shift.payment_reconciliation,
        period_end_date: closingShiftData.closing_shift.period_end_date
      }
    };

    const response = await axiosInstance.post(APIs.createClosingShift, payload);
    // console.log("POS Shift Closed Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Closing the shift:", error);
    throw error;
  }
};

export const fetchCategoriesAndProducts = async (costCenter) => {
  // console.log(costCenter,"Checking")
  try {
    const res = await axiosInstance.get(`${APIs.getCategoriesAndProducts}?cost_center=${costCenter}`);
    if (res.data && res.data.message) {
      // console.log("API Data:", res.data.message);
      return res.data.message;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error while fetching categories and products", error);
    throw error;
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await axiosInstance.get(APIs.getAllCustomers);
    if (response.data && response.data.message.success_key === 1) {
      // console.log("Customer Data:", response.data.message.customer);
      return response.data.message.customer;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getQuickCustomer = async () => {
  try {
    const response = await axiosInstance.get(APIs.getDefaultCustomer + "?pos=" + JSON.parse(localStorage.getItem("openShiftData"))["selectedProfile"]);
    if (response.data && response.data.message.success_key === 1) {
      // console.log("Customer Data:", response.data.message.customer);
      return response.data.message.customer;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};



export const updateCustomer = async (customer) => {
  try {
    const response = await axiosInstance.put(APIs.editCustomer, {
      name: customer.name,
      customer_name: customer.customer_name,
      mobile_no: customer.mobile_no,
      email_id: customer.email_id,
    });
    if (response.data && response.data.message.success_key === 1) {
      return response.data.message.customer;
    } else {
      throw new Error("Failed to update customer");
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const searchCustomers = async (mobileNo) => {
  try {
    const response = await axiosInstance.get(
      `${APIs.getCustomer}?mobile_no=${mobileNo}`
    );
    if (response.data && response.data.message.success_key === 1) {
      // console.log("Customer Data:", response.data.message.customer);
      return response.data.message.customer;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getGuestCustomer = async () => {
  try {
    const res = axiosInstance.get(APIs.getGuestCustomer);
    return res;
  } catch (error) {
    console.log("Error while getting the token", error);
    return error.response;
  }

};
export const getCouponCodeList = async () => {
  try {
    const res = await axiosInstance.get(APIs.getCouponCodeList);  
    return res.data;  
  } catch (error) {
    console.log("Error while getting the coupon codes", error);
    return error.response;
  }
};
export const validatePromoCode = async (code) => {
  try {
    const response = await axiosInstance.post(APIs.validatePromoCode,
      { coupon_code: code }
    );
    console.log(response.data.message, "Promo code response");
    return response.data.message;
  } catch (error) {
    console.error("Error validating promo code:", error);
    return null;
  }
};

export const fetchSalesOrderList = async (hubManagerEmail, pageNo) => {
  try {
    const response = await axiosInstance.get(
      `${APIs.getSalesOrderList}?hub_manager=${hubManagerEmail}&page_no=${pageNo}`
    );
    if (response.data && response.data.message.success_key === 1) {
      // console.log("Sales Order Data:", response.data.message);
      return response.data.message;
      // order_list
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching sales order list:", error);
    throw error;
  }
};

export const fetchKitchenOrders = async (hubManagerEmail, pageNo) => {
  try {
    const response = await axiosInstance.get(
      `${APIs.getKitchenOrderList}?hub_manager=${hubManagerEmail}&page_no=${pageNo}`
    );
    if (response.data && response.data.message.success_key === 1) {
      // console.log("Sales Order Data:", response.data.message);
      return response.data.message;
      // order_list
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching kitchen order list:", error);
    throw error;
  }
};

export const changePassword = async (user, oldPassword, newPassword) => {
  try {
    const response = await axiosInstance.post(APIs.changePassword, {
      usr: user,
      old_pwd: oldPassword,
      new_pwd: newPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchBasicInfo = async (hubManagerEmail) => {
  try {
    const response = await axiosInstance.get(
      `${APIs.getBasicInfo}?hub_manager=${hubManagerEmail}`
    );
    if (response.data.message.success_key === 1) {
      return response.data.message;
    } else {
      throw new Error("Failed to fetch profile information");
    }
  } catch (error) {
    console.error("Error fetching profile information:", error);
    throw error;
  }
};

export const createCustomer = async (name, phone, email) => {
  try {
    const response = await axiosInstance.post(APIs.createCustomer, {
      customer_name: name,
      mobile_no: phone,
      email_id: email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createSalesOrder = async (orderDetails) => {
  try {
    const response = await axiosInstance.post(APIs.createOrder, {
      order_list: orderDetails,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating sales order:", error);
    throw error;
  }
};

export const returnSalesOrder = async (salesInvoice) => {
  try {
    const response = await axiosInstance.post(APIs.returnSalesOrder, {
      sales_invoice: salesInvoice,
    });
    return response.data;
  } catch (error) {
    console.error("Error returning sales order:", error);
    throw error;
  }
};

export const getCustomerDetail = async (name) => {
  try {
    const response = await axiosInstance.get(
      `${APIs.getCustomerDetails}?name=${name}`
    );
    if (response.data.message.success_key === 1) {
      return response;
    } else {
      throw new Error("Failed to customer details");
    }
  } catch (error) {
    console.error("Error fetching profile information:", error);
    throw error;
  }
};

export const getLocation = async () =>{
  try{
    const response = await axiosInstance.get(`${APIs.getlocation}`);
    if(response.status === 200){
      return response
    } else {
      throw new Error("Failed to get the Location");
    }

  } catch(error) {
    console.log("Error getting the Locations:",error);
    throw error;
  }
}

export const fetchstore = async (custom_location) => {
  console.log(custom_location)
  try{
    const response = await axiosInstance.get(`${APIs.getlocation}?custom_location=${custom_location}`);
    if(response.status === 200){
      return response
    } else {
      throw new Error("Failed to get the Stores");
    }
  } catch(error) {
    console.log("Error getting the Stores",error);
    throw error;
  }
}
export const validateGiftCard = async (code,customerName) => {
  try {
    const response = await axiosInstance.post(APIs.validateGiftCode,
      { 
        gift_card : {
          code:code,
          customer:customerName
      }
      }
    );
    // console.log(response.data.message, "Gift Code response");
    return response.data.message;
  } catch (error) {
    console.error("Error validating gift code:", error);
    return null;
  }
};

export const sendMailToUser = async (sales_order_id) => {
  try {
    const response = await axiosInstance.post(APIs.sendMail,
      { 
          sales_order:sales_order_id
      }
    );
    // console.log(response.data.message, "Mail Api Response");
    return response.data.message;
  } catch (error) {
    console.error("Error to Send Mail:", error);
    return null;
  }
};

export const getItemByScan = async (barcode,costCenter) => {
  const Barcode = barcode.split("Enter")[0] 
  try {
    const res = await axiosInstance.get(`${APIs.getCategoriesAndProducts}?barcode=${Barcode}&cost_center=${costCenter}`);
    if (res.data && res.data.message) {
      // console.log("API Data:", res.data.message);
      return res;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error while fetching product", error);
    throw error;
  }
};

export const fetchSearchSalesOrderList = async (hubManagerEmail, name='',mobile_no='') => {
  
  try {
    const response = await axiosInstance.get(
      `${APIs.getSalesOrderList}?hub_manager=${hubManagerEmail}&name=${name}&mobile_no=${mobile_no}`
    );
    if (response.data && response.data.message.success_key === 1) {
      // console.log("Sales Order Data:", response.data.message.order_list);
      // console.log("response Order List",response);
      return response.data.message.order_list;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching Search sales order list:", error);

    throw error;
  }
};

export const getCloseShiftDetails = async (payload) => {
  try {
    const response = await axiosInstance.post(APIs.getShiftDetails, payload);
    return response;
  } catch (error) {
    console.error("Error returning sales order:", error);
    throw error;
  }
};


export const deleteSalesOrder = async (salesOrderId) => {
  try {
    const response = await axiosInstance.delete(`${APIs.SalesOrderURL}/${salesOrderId}`);
    return response;
  } catch (error) {
    console.error("Error deleting sales order:", error);
    throw error;
  }
};

export const getContents = async (item) => {
  try {
    const response = await axiosInstance.get(`${APIs.getBom}?limit=1&filters=[["item", "=" , "${item}"], ["is_active", "=", 1]]`);  
    console.log(response.data);
    if (response?.data?.data.length > 0){
      const name = response.data.data[0].name
      if (name){
        const res = await axiosInstance.get(`${APIs.getBom}/${name}`); 
        return res.data
      }
    }
    return {}
  } catch (error) {
    // Handle errors, such as network issues or server errors
    throw error;
  }
};

export const updateOrderStatus = async (order) =>{
  try {
    const response = await axiosInstance.put(`${APIs.SalesOrderURL}/${order["name"]}`, {"custom_order_status": order["value"]});  
    console.log(response.data);
    return
  } catch (error) {
    // Handle errors, such as network issues or server errors
    throw error;
  }
}