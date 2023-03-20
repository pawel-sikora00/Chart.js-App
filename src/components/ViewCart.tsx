import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LineChart from "./LineChart";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  openViewModal: boolean;
  handleCloseViewModal: () => void;
  viewedCart: Cart;
};

const ViewCart = ({
  openViewModal,
  handleCloseViewModal,
  viewedCart,
}: Props) => {
  const [userData, setUserData] = useState({
    labels: viewedCart?.products.map((product) => product.title),
    datasets: [
      {
        label: "Original Price",
        data: viewedCart?.products.map((product) => product.price),
      },
      {
        label: "Discounted Price",
        data: viewedCart?.products.map(
          (product) =>
            Number(product.discountedPrice) / Number(product.quantity)
        ),
      },
    ],
  });

  const options = {
    responsive: true,
    scales: {
      x: {
        offset: true,
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  };

  return (
    <>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] h-[60%] md:w-[80%] md:h-[55%] rg:h-[70%] rg:w-[60%] lg:w-[50%] lg:h-[70%] bg-white rounded-lg shadow-xl p-4">
          <Box className="flex items-center justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Viewing Cart ID: {viewedCart.id}
            </Typography>
            <AiOutlineCloseCircle
              size={26}
              onClick={handleCloseViewModal}
              className="cursor-pointer hover:bg-gray-300 rounded-full"
            />
          </Box>
          <Box className="mt-32 md:mt-16 rg:mt-28 lg:mt-16">
            <LineChart chartData={userData} options={options} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ViewCart;
