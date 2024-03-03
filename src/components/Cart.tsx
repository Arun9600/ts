import {
  Box,
  Container,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { CartOpen, Datas } from "../utils";
import { Dispatch, SetStateAction } from "react";
const Cart = ({
  cart,
  cartOpen,
  setCartOpen,
  qtyIncrease,
  qtyDecrease,
  setCart,
}: {
  cart: Datas[];
  cartOpen: CartOpen;
  setCartOpen: Dispatch<SetStateAction<CartOpen>>;
  qtyIncrease: (datas: Datas) => void;
  qtyDecrease: (datas: Datas) => void;
  setCart: Dispatch<SetStateAction<Datas[]>>;
}) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("sm"));
  const sideBarWidth = isLarge ? "500px" : "320px";

  const CartValue = cart.reduce(
    (acc, item) => acc + (item.quantity || 0) * (item.price as number),
    0
  );

  const deleteItem = (datas: Datas) => {
    const deleteI = cart.filter((items) => items !== datas);
    setCart(deleteI);
  };

  return (
    <>
      <Box>
        <Drawer
          open={cartOpen}
          anchor="right"
          onClose={() => setCartOpen(false)}
          PaperProps={{ sx: { width: `${sideBarWidth}` } }}
        >
          <Box>
            <Container>
              {cart && cart.length === 0 ? (
                <Box sx={{ textAlign: "center", padding: "20px 0" }}>
                  <Typography
                    variant="h6"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Your Cart is Empty
                  </Typography>
                </Box>
              ) : (
                cart.map((item) => (
                  <Box
                    key={item.id}
                    sx={{ padding: "20px 0", borderBottom: "1px solid #ccc" }}
                  >
                    <Grid
                      container
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                        <img
                          src={item.image}
                          title={item.title}
                          width={130}
                          height={130}
                          alt={item.title}
                        />
                      </Grid>
                      <Grid item xl={7} lg={7} md={7} sm={7} xs={7}>
                        <Typography
                          variant="h5"
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          {item.quantity} X {item.price} = Rs.
                          {(item.quantity ?? 0) * (item.price as number)}
                        </Typography>
                        <Typography
                          onClick={() => qtyIncrease(item)}
                          variant="body1"
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                            border: "1px solid #ccc",
                            padding: "10px 15px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </Typography>
                        <Typography
                          onClick={() => {
                            qtyDecrease(item);
                          }}
                          variant="body1"
                          style={{
                            display: "inline-block",
                            border: "1px solid #ccc",
                            padding: "10px 15px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </Typography>
                      </Grid>
                      <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                        <Typography
                          onClick={() => {
                            deleteItem(item);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Delete
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              )}
            </Container>
          </Box>

          {cart && cart.length !== 0 ? (
            <Box sx={{ marginTop: "40px" }}>
              <Container>
                <Grid>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    xs={12}
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Total: Rs. {CartValue}
                  </Grid>
                </Grid>
              </Container>
            </Box>
          ) : (
            ""
          )}
        </Drawer>
      </Box>
    </>
  );
};

export default Cart;
