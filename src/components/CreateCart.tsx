import React, { useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Snackbar, TextField } from "@mui/material";
import { GoDiffAdded } from "react-icons/go";
import Alert, { AlertProps } from "@mui/material/Alert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";

type Props = {
  carts: Cart[];
  openCartModal: boolean;
  setOpenCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseCartModal: () => void;
  setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCart = ({
  carts,
  openCartModal,
  setOpenCartModal,
  handleCloseCartModal,
  setSuccessAlert,
}: Props) => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number | string>(
    ""
  );
  const [productsCheckAlert, setProductsCheckAlert] = useState(false);
  const [quantity, setQuantity] = useState<number | string>("");
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [discountPercentageError, setDiscountPercentageError] = useState(false);

  const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />;
    }
  );

  const handleCloseAlertProducts = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setProductsCheckAlert(false);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleAddProduct = () => {
    if (title.length === 0) {
      setTitleError(true);
    }
    if (price <= 0) {
      setPriceError(true);
    }
    if (quantity <= 0) {
      setQuantityError(true);
    }
    if (discountPercentage <= 0) {
      setDiscountPercentageError(true);
    }
    if (
      title.length > 0 &&
      price > 0 &&
      quantity > 0 &&
      discountPercentage > 0
    ) {
      const uniqueProductId = Math.floor(Math.random() * 1000);
      let DiscountPercentage = discountPercentage;
      let Title = title;
      let Price = price;
      let Quantity = quantity;
      let Total = Number(price) * Number(quantity);
      let Discount = Total * (Number(discountPercentage) / 100);
      let DiscountedPrice = Total - Discount;
      products.push({
        discountPercentage: DiscountPercentage,
        discountedPrice: DiscountedPrice,
        id: uniqueProductId,
        price: Price,
        quantity: Quantity,
        title: Title,
        total: Total,
      });
      setTitle("");
      setPrice("");
      setQuantity("");
      setDiscountPercentage("");
      setTitleError(false);
      setPriceError(false);
      setQuantityError(false);
      setDiscountPercentageError(false);
      handleShow();
    }
  };

  const handleDeleteProduct = (id: number) => {
    const productsList = products.filter((name) => name.id !== id);
    setProducts(productsList);
  };

  const handleAddCart = () => {
    if (products.length === 0) {
      setProductsCheckAlert(true);
    } else {
      const uniqueCartId = Math.floor(Math.random() * 1000) + 20;
      let Products = products;
      let TotalProducts = products.length;
      let ProductsTotal = products.reduce((accumulator, title) => {
        return accumulator + title.total!;
      }, 0);
      let TotalQuantity = products.reduce((accumulator, title) => {
        return accumulator + Number(title.quantity);
      }, 0);
      let DiscountedTotal = products.reduce((accumulator, title) => {
        return accumulator + Number(title.discountedPrice);
      }, 0);
      carts.push({
        id: uniqueCartId,
        products: Products,
        total: ProductsTotal,
        discountedTotal: DiscountedTotal,
        totalProducts: TotalProducts,
        totalQuantity: TotalQuantity,
      });
      localStorage.setItem("carts-app-data", JSON.stringify(carts));
      setTitle("");
      setPrice("");
      setQuantity("");
      setDiscountPercentage("");
      setOpenCartModal(false);
      setSuccessAlert(true);
    }
  };

  return (
    <>
      <Modal
        open={openCartModal}
        onClose={handleCloseCartModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] h-[60%] md:w-[60%] rg:w-[50%] lg:w-[40%] xl:w-[30%] bg-white rounded-lg shadow-xl py-4 pl-4 pr-2 overflow-hidden">
          <Box className="overflow-auto flex flex-col justify-between h-[100%] pr-2 scrollbar-thin scrollbar-thumb-[#A9A9A9]">
            <Box>
              <Box className="flex items-center justify-between">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  Create A Cart
                </Typography>
                <AiOutlineCloseCircle
                  size={26}
                  onClick={handleCloseCartModal}
                  className="cursor-pointer hover:bg-gray-300 rounded-full"
                />
              </Box>
              <Typography
                id="modal-modal-title"
                variant="subtitle1"
                component="h2"
              >
                Add products
              </Typography>
              <Box>
                {products.map((name, index) => (
                  <motion.div
                    key={name.id}
                    className="mt-4 flex items-center text-xl md:text-2xl"
                    data-testid={`product-item-${index}`}
                    animate={{ y: -5 }}
                  >
                    <span className="font-bold mr-2">{index + 1}.</span>
                    {name.title}
                    <button
                      aria-label="delete-product"
                      className="ml-4 cursor-pointer hover:bg-red-200 rounded-lg"
                      onClick={() => {
                        handleDeleteProduct(name.id);
                      }}
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </motion.div>
                ))}
              </Box>
              {show === true ? (
                <Box className="mt-8 mb-4">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleAddProduct();
                    }}
                    aria-label="submit-product"
                  >
                    Submit
                  </Button>
                </Box>
              ) : (
                <Box className="mt-8 mb-8">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShow}
                    aria-label="add-product"
                  >
                    <GoDiffAdded />
                    <span className="ml-2">Add</span>
                  </Button>
                </Box>
              )}
              {show && (
                <motion.div
                  className="grid grid-cols-2 justify-between gap-2 mt-2 mb-2"
                  animate={{ y: show ? 15 : -15 }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    data-testid="input-title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    error={titleError}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Price"
                    data-testid="input-price"
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    required
                    error={priceError}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Quantity"
                    data-testid="input-quantity"
                    variant="outlined"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required
                    error={quantityError}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Discount %"
                    data-testid="input-discount"
                    variant="outlined"
                    type="number"
                    value={discountPercentage}
                    onChange={(e) =>
                      setDiscountPercentage(parseInt(e.target.value))
                    }
                    required
                    error={discountPercentageError}
                  />
                </motion.div>
              )}
            </Box>
            <Box className="place-self-center mt-4">
              <Button
                variant="contained"
                aria-label="submit-cart"
                color="primary"
                onClick={() => {
                  handleAddCart();
                }}
              >
                Submit Cart
              </Button>
            </Box>
            <Snackbar
              open={productsCheckAlert}
              autoHideDuration={2000}
              onClose={handleCloseAlertProducts}
              sx={{ height: "10%" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <SnackbarAlert
                onClose={handleCloseAlertProducts}
                severity="warning"
              >
                You need to add at least 1 product to the cart
              </SnackbarAlert>
            </Snackbar>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default CreateCart;
