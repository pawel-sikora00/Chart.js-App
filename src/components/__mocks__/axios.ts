const mockResponse = {
  data: {
    carts: <Cart[]>[
      {
        discountedTotal: 1941,
        id: 667,
        products: <Product[]>[
          {
            discountPercentage: 8.71,
            discountedPrice: 55,
            id: 59,
            price: 20,
            quantity: 3,
            title: "Spring and summershoes",
            total: 60,
          },
          {
            discountPercentage: 8.71,
            discountedPrice: 55,
            id: 59,
            price: 20,
            quantity: 3,
            title: "Spring and summershoes",
            total: 60,
          },
          {
            discountPercentage: 8.71,
            discountedPrice: 55,
            id: 59,
            price: 20,
            quantity: 3,
            title: "Spring and summershoes",
            total: 60,
          },
        ],
        total: 2328,
        totalProducts: 3,
        totalQuantity: 10,
        userId: 97,
      },
      {
        discountedTotal: 1941,
        id: 668,
        products: <Product[]>[
          {
            discountPercentage: 8.71,
            discountedPrice: 55,
            id: 59,
            price: 20,
            quantity: 3,
            title: "Spring and summershoes",
            total: 60,
          },
          {
            discountPercentage: 8.71,
            discountedPrice: 55,
            id: 59,
            price: 20,
            quantity: 3,
            title: "Spring and summershoes",
            total: 60,
          },
          {
            discountPercentage: 8.71,
            discountedPrice: 55,
            id: 59,
            price: 20,
            quantity: 3,
            title: "Spring and summershoes",
            total: 60,
          },
        ],
        total: 2328,
        totalProducts: 3,
        totalQuantity: 10,
        userId: 97,
      },
    ],
  },
};

export default {
  get: jest.fn().mockResolvedValue(mockResponse),
};
