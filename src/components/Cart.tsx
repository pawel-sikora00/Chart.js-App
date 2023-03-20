import { Button } from "@mui/material";
import { BsEye } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  cart: Cart;
  deleteCart: (id: number) => Promise<void>;
  handleOpenViewModal: (object: Cart) => void;
  index: number;
};

const Cart = ({ cart, deleteCart, handleOpenViewModal, index }: Props) => {
  return (
    <div
      className="border-2 p-[5%] mt-2 flex justify-between text-sm md:text-xl rg:text-2xl rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-500 hover:scale-105"
      data-testid={`cart-item-${index}`}
    >
      <span className="flex items-center">
        Cart Id:
        <div className="pl-2 font-bold">{cart.id}</div>
      </span>
      <div className="flex gap-4">
        <Button
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#3CB371",
          }}
          aria-label="view-cart"
          onClick={() => handleOpenViewModal(cart)}
        >
          View
          <BsEye className="ml-1" />
        </Button>
        <Button
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#CD5C5C",
          }}
          data-testid={`remove-cart-${index}`}
          onClick={() => deleteCart(cart.id)}
        >
          Remove
          <AiOutlineDelete />
        </Button>
      </div>
    </div>
  );
};

export default Cart;
