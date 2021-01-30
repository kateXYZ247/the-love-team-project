export const addressTypes = [
  { value: "Home", label: "Home" },
  { value: "Hotel", label: "Hotel" },
  {
    value: "Office",
    label: "Office",
  },
];

export const orderTaxRate = 0.05;
export const orderGratuityRate = 0.2;

export const ORDER_STATUS = {
  ADD_TO_CART: "add to cart",
  FILL_DATE_ADDRESS: "fill date address",
  FILL_PAYMENT: "fill payment",
  CONFIRMED: "confirm",
};

export const orderProductsPageButtonText = "Select Date & Time";
export const orderTimeAddressPageButtonText = "Account Details";
export const orderCreditCardPageButtonText = "Book Now";
export const sampleOrderServices = [
  {
    name: "Blowout",
    duration: 46,
    price: 55,
    addressType: "Home",
  },
  {
    name: "Pedicure",
    duration: 47,
    price: 65,
    addressType: "Home",
  },
  {
    name: "Blowout",
    duration: 48,
    price: 55,
    addressType: "Home",
  },
  {
    name: "Kids Haircut",
    duration: 49,
    price: 60,
    addressType: "Home",
  },
  {
    name: "Kids Haircut",
    duration: 2000,
    price: 60,
    addressType: "Home",
  },
];
export const sampleOrderTotalPrice = 371.7;
export const sampleOrderHistory = [
  {
    orderId: 0,
    totalPrice: 175,
    services: [
      {
        name: "Blowout",
        duration: 48,
        price: 55,
        createdAt: "Thu Jan 21 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Thu Jan 28 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        status: "requested",
      },
      {
        name: "Kids Haircut",
        duration: 49,
        price: 60,
        createdAt: "Thu Jan 21 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Thu Jan 28 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        status: "accepted",
      },
      {
        name: "Kids Haircut",
        duration: 2000,
        price: 60,
        createdAt: "Thu Jan 21 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Thu Jan 28 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        status: "accepted",
      },
    ],
  },
  {
    orderId: 1,
    totalPrice: 55,
    services: [
      {
        name: "Blowout",
        duration: 48,
        price: 55,
        createdAt: "Wed Jan 20 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Fri Jan 29 2021 09:30:16 GMT-0800 (Pacific Standard Time)",
        status: "accepted",
      },
    ],
  },
  {
    orderId: 2,
    totalPrice: 55,
    services: [
      {
        name: "Blowout",
        duration: 48,
        price: 55,
        createdAt: "Mon Jan 18 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Fri Jan 29 2021 06:00:16 GMT-0800 (Pacific Standard Time)",
        status: "finished",
      },
    ],
  },
  {
    orderId: 3,
    totalPrice: 120,
    services: [
      {
        name: "Kids Haircut",
        duration: 49,
        price: 60,
        createdAt: "Mon Jan 18 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Sat Jan 30 2021 07:20:16 GMT-0800 (Pacific Standard Time)",
        status: "finished",
      },
      {
        name: "Kids Haircut",
        duration: 2000,
        price: 60,
        createdAt: "Mon Jan 18 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Sat Jan 30 2021 07:20:16 GMT-0800 (Pacific Standard Time)",
        status: "requested",
      },
    ],
  },
  {
    orderId: 4,
    totalPrice: 175,
    services: [
      {
        name: "Blowout",
        duration: 48,
        price: 55,
        createdAt: "Mon Jan 11 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Sat Jan 31 2021 11:45:16 GMT-0800 (Pacific Standard Time)",
        status: "requested",
      },
      {
        name: "Kids Haircut",
        duration: 49,
        price: 60,
        createdAt: "Mon Jan 11 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Sat Jan 31 2021 11:45:16 GMT-0800 (Pacific Standard Time)",
        status: "accepted",
      },
      {
        name: "Kids Haircut",
        duration: 2000,
        price: 60,
        createdAt: "Mon Jan 11 2021 10:30:16 GMT-0800 (Pacific Standard Time)",
        startTime: "Sat Jan 31 2021 11:45:16 GMT-0800 (Pacific Standard Time)",
        status: "requested",
      },
    ],
  },
];
