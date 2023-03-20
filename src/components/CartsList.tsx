import Cart from "./Cart";

type Props = {
  carts: Cart[];
  deleteCart: (id: number) => Promise<void>;
  handleOpenViewModal: (object: Cart) => void;
};

const CartsList = ({ carts, deleteCart, handleOpenViewModal }: Props) => {
  return (
    <>
      {carts.map((cart, index) => {
        return (
          <Cart
            key={cart.id}
            cart={cart}
            deleteCart={deleteCart}
            handleOpenViewModal={handleOpenViewModal}
            index={index}
          />
        );
      })}
    </>
  );
};

export default CartsList;
