import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { CartOpen } from "../utils";
import { Dispatch, SetStateAction } from "react";

const TopArea = ({
  setCartOpen,
}: {
  setCartOpen: Dispatch<SetStateAction<CartOpen>>;
}) => {
  return (
    <>
      <Box sx={{ backgroundColor: "#000", padding: "10px 0" }}>
        <Container maxWidth="xl">
          <Grid
            container
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Typography
                variant="h1"
                style={{ fontSize: "24px", color: "#fff" }}
              >
                React with TypeScript
              </Typography>
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              sx={{ textAlign: "right" }}
            >
              <Button sx={{ color: "#fff" }} onClick={() => setCartOpen(true)}>
                Cart
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default TopArea;
