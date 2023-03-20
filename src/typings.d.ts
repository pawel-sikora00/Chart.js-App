interface Product {
  discountPercentage: number | string;
  discountedPrice: number | string;
  id: number;
  price: number | string;
  quantity: number | string;
  title: string;
  total: number;
}

interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId?: number;
}
