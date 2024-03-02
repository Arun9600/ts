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
}: {
  cart: Datas[];
  cartOpen: CartOpen;
  setCartOpen: Dispatch<SetStateAction<CartOpen>>;
}) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("sm"));
  const sideBarWidth = isLarge ? "500px" : "320px";
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
                        />
                      </Grid>
                      <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Typography
                          variant="h5"
                          style={{ fontSize: "15px", fontWeight: "bold" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          Rs. {item.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              )}
            </Container>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Cart;
