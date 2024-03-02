import {
  Box,
  Button,
  Container,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Datas, IDNum } from "../utils";
import { useState } from "react";
import ProductDetails from "./ProductsDetails";
const ProductsList = ({ data }: { data: Datas }) => {
  const [productsID, setProductsId] = useState<IDNum>(null);
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("sm"));
  const sideBarWidth = isLarge ? "500px" : "320px";
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
                style={{ marginBottom: "30px", textAlign: "center" }}
              >
                <img
                  src={datas.image}
                  alt={datas.title}
                  width={250}
                  height={250}
                />
                <Box>{datas.title}</Box>
                <Grid container>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Button
                      color="success"
                      onClick={() => {
                        setProductsId(datas.id);
                        setSideBarOpen(true);
                      }}
                    >
                      View Product
                    </Button>
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Button color="success">Add to Cart</Button>
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
    </>
  );
};

export default ProductsList;
