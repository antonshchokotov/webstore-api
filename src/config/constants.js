const ERROR_MESSAGES = {
  INVALID_REQUEST_JSON: "Invalid request JSON",
  SOMETHING_WENT_WRONG: "Something went wrong!",
  INVALID_PRODUCTS_REQUESTED: "Requested products are invalid",
  CUSTOMER_NAME_REQUIRED: "Customer name is required",
  CUSTOMER_EMAIL_REQUIRED: "Customer email is required",
  INVALID_CUSTOMER_EMAIL: "Customer email is invalid",
  DELIVERY_ADDRESS_REQUIRED: "Delivery address is required",
  PRODUCTS_UNAVAILABLE: "Some of the products unavailable",
};

const REGEX = {
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

const ORDER_STATUSES = {
  NEW: "new",
  PENDING: "pending",
  PAID: "paid",
  UNPAID: "unpaid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

export { ERROR_MESSAGES, REGEX, ORDER_STATUSES };
