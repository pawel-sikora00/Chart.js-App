import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateCart from "../../CreateCart";
import user from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import DashBoard from "../../Dashboard";
import ViewCart from "../../ViewCart";

const mockedData = jest.fn();

const DashBoardMock = () => {
  return (
    <BrowserRouter>
      <DashBoard />
    </BrowserRouter>
  );
};

const addProduct = async () => {
  const addProduct = await screen.findByLabelText("add-product");
  await user.click(addProduct);

  const inputTitle = (await screen.findByTestId("input-title")).querySelector(
    "input"
  );
  fireEvent.change(inputTitle!, { target: { value: "hello" } });

  const inputPrice = (await screen.findByTestId("input-price")).querySelector(
    "input"
  );
  fireEvent.change(inputPrice!, { target: { value: "123" } });

  const inputQuantity = (
    await screen.findByTestId("input-quantity")
  ).querySelector("input");
  fireEvent.change(inputQuantity!, { target: { value: "37" } });

  const inputDiscount = (
    await screen.findByTestId("input-discount")
  ).querySelector("input");
  fireEvent.change(inputDiscount!, { target: { value: "56" } });

  const submitProduct = await screen.findByLabelText("submit-product");
  user.click(submitProduct);

  const product = await screen.findByTestId("product-item-0");

  expect(product).toBeInTheDocument();
};

const submitCart = async () => {
  const submit = await screen.findByLabelText("submit-cart");
  await user.click(submit);
};

const expectCarts = async () => {
  const cart = await screen.findByTestId("cart-item-0");
  const cart2 = await screen.findByTestId("cart-item-1");
  expect(cart).toBeInTheDocument();
  expect(cart2).toBeInTheDocument();
};

const { rerender } = render(
  <CreateCart
    carts={[]}
    openCartModal={true}
    setSuccessAlert={mockedData}
    setOpenCartModal={mockedData}
    handleCloseCartModal={mockedData}
  />
);

describe("TEST - Add Cart, tests if at least one Product can be added then new Cart created", () => {
  it("should add a Product, then asubmit a new Cart", async () => {
    rerender(
      <CreateCart
        carts={[
          {
            discountedTotal: 1941,
            id: 667,
            products: [
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
        ]}
        openCartModal={true}
        setSuccessAlert={mockedData}
        setOpenCartModal={mockedData}
        handleCloseCartModal={mockedData}
      />
    );
    await addProduct();
    await submitCart();
    render(<DashBoardMock />);
    await expectCarts();
  });
});

describe("TEST - Check if Carts are displayed", () => {
  it("should display 2 Carts", async () => {
    render(<DashBoardMock />);
    await expectCarts();
  });
});

describe("TEST - Check if Product can be deleted", () => {
  it("delete a Product", async () => {
    render(
      <CreateCart
        carts={[]}
        openCartModal={true}
        setSuccessAlert={mockedData}
        setOpenCartModal={mockedData}
        handleCloseCartModal={mockedData}
      />
    );

    await addProduct();
    const product = await screen.findByTestId("product-item-0");
    const deleteButton = await within(product).findByLabelText(
      "delete-product"
    );
    await user.click(deleteButton);
    expect(product).not.toBeInTheDocument();
  });
});

describe("TEST - Check if Cart can be deleted", () => {
  it("deletes a Cart", async () => {
    render(<DashBoardMock />);
    const cart = await screen.findByTestId("cart-item-0");
    expect(cart).toBeInTheDocument();
    const removeButton = await within(cart).findByTestId("remove-cart-0");
    await user.click(removeButton);
    expect(cart).not.toBeInTheDocument();
  });
});

describe("TEST - Check if Chart is displayed", () => {
  it("checks if cart chart is dislpayed", async () => {
    render(
      <ViewCart
        openViewModal={true}
        handleCloseViewModal={mockedData}
        viewedCart={{
          discountedTotal: 1941,
          id: 667,
          products: [
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
        }}
      />
    );
    const chart = await screen.findByTestId("cart-chart");
    expect(chart).toBeInTheDocument();
    screen.debug();
  });
});
