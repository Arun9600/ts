import {
  Box,
  Button,
  Container,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CartOpen, Datas, IDNum } from "../utils";
import { useState } from "react";
import ProductDetails from "./ProductsDetails";
import { Dispatch, SetStateAction } from "react";
import Cart from "./Cart";
const ProductsList = ({
  data,
  cartOpen,
  setCartOpen,
}: {
  data: Datas[];
  cartOpen: CartOpen;
  setCartOpen: Dispatch<SetStateAction<CartOpen>>;
}) => {
  const [productsID, setProductsId] = useState<IDNum>(null);
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<Datas[]>([]);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("sm"));
  const sideBarWidth = isLarge ? "500px" : "320px";

  const addToCart = (datas: Datas) => {
    const cartLogic = cart.find((item) => item.id === datas.id);
    if (cartLogic) {
      const newCart = cart.map((item) =>
        item.id === datas.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, { ...datas, quantity: 1 }]);
    }
  };

  const qtyIncrease = (datas: Datas) => {
    const increase = cart.map((item) =>
      item.id === datas.id
        ? { ...item, quantity: (item.quantity || 0) + 1 }
        : item
    );
    setCart(increase);
  };

  const qtyDecrease = (datas: Datas) => {
    const decrease = cart.map((item) =>
      item.id === datas.id && (datas.quantity || 0) > 1
        ? { ...item, quantity: (item.quantity || 0) - 1 }
        : item
    );
    setCart(decrease);
  };

  return (
    <>
      <Box>
        <Container>
          <Grid container>
            {data.map((datas) => (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                key={datas.id}
                style={{ marginBottom: "50px", textAlign: "center" }}
              >
                <img
                  src={datas.image}
                  alt={datas.title}
                  width={250}
                  height={250}
                  style={{ marginBottom: "15px" }}
                />
                <Box sx={{ marginBottom: "20px" }}>{datas.title}</Box>
                <Grid container>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Button
                      color="success"
                      variant="outlined"
                      onClick={() => {
                        setProductsId(datas.id);
                        setSideBarOpen(true);
                      }}
                    >
                      View Product
                    </Button>
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Button
                      color="success"
                      variant="outlined"
                      onClick={() => {
                        addToCart(datas);
                        setCartOpen(true);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Drawer
        open={sidebarOpen}
        anchor="right"
        onClose={() => setSideBarOpen(false)}
        PaperProps={{ sx: { width: `${sideBarWidth}` } }}
      >
        <ProductDetails productsID={productsID} />
      </Drawer>
      <Cart
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        qtyIncrease={qtyIncrease}
        qtyDecrease={qtyDecrease}
        setCart={setCart}
      />
    </>
  );
};

export default ProductsList;
