import { useEffect, useState, forwardRef } from "react";
import CartsList from "./CartsList";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import CreateCart from "./CreateCart";
import ViewCart from "./ViewCart";
import Alert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { BsCart2 } from "react-icons/bs";
import axios from "axios";

const DashBoard = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);

  //Create Modal
  const [openCartModal, setOpenCartModal] = useState(false);
  const handleOpenCartModal = () => setOpenCartModal(true);
  const handleCloseCartModal = () => setOpenCartModal(false);

  //View Modal
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewedCart, setViewedCart] = useState<Cart>();
  const handleOpenViewModal = (object: Cart) => {
    setOpenViewModal(true);
    setViewedCart(object);
  };
  const handleCloseViewModal = () => setOpenViewModal(false);

  const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />;
    }
  );

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/carts");
        const savedCarts = JSON.parse(localStorage.getItem("carts-app-data")!);
        if (savedCarts == null) {
          setCarts(response.data.carts);
        } else {
          setCarts(savedCarts);
        }
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const deleteCart = async (id: number) => {
    try {
      await axios.delete(`https://dummyjson.com/carts/${id}`, {
        method: "DELETE",
      });
      const postsList = carts.filter((cart) => cart.id !== id);
      setCarts(postsList);
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }

    try {
      const postsList = carts.filter((cart) => cart.id !== id);
      setCarts(postsList);
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleCloseAlertNewCart = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlert(false);
  };

  return (
    <div className="my-8 mx-[5%] md:mx-[10%] rg:mx-[20%] ">
      <div className="mb-4 ">
        <Button
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#1E90FF",
          }}
          onClick={handleOpenCartModal}
          size="large"
        >
          <span>Add a Cart</span>
          <BsCart2 className="ml-2 mb-1" />
        </Button>
        {openCartModal && (
          <CreateCart
            openCartModal={openCartModal}
            handleCloseCartModal={handleCloseCartModal}
            carts={carts}
            setOpenCartModal={setOpenCartModal}
            setSuccessAlert={setSuccessAlert}
          />
        )}
        {openViewModal && (
          <ViewCart
            openViewModal={openViewModal}
            handleCloseViewModal={handleCloseViewModal}
            viewedCart={viewedCart!}
          />
        )}
      </div>
      <div className="flex items-center justify-center">
        {isLoading && <CircularProgress />}
      </div>
      <main>
        {!isLoading && (
          <CartsList
            carts={carts}
            deleteCart={deleteCart}
            handleOpenViewModal={handleOpenViewModal}
          />
        )}
        <Snackbar
          open={successAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlertNewCart}
          sx={{ height: "10%" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <SnackbarAlert onClose={handleCloseAlertNewCart} severity="success">
            New cart has been added successfully!
          </SnackbarAlert>
        </Snackbar>
      </main>
    </div>
  );
};

export default DashBoard;
