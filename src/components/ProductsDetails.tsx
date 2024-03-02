import { IDNum, ProductDatas, Loading } from "../utils";
import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { BASE_URL } from "../utils";
const ProductDetails = ({ productsID }: { productsID: IDNum }) => {
  const [productsDetail, setProductDetails] = useState<ProductDatas>();
  const [loading, setLoading] = useState<Loading>(false);
  useEffect(() => {
    const apiFunc = async () => {
      try {
        if (productsID !== null) {
          setLoading(true);
          const URL = await fetch(`${BASE_URL}/products/${productsID}`);
          const response = await URL.json();
          setProductDetails(response);
          setLoading(false);

          console.log(response);
        }
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    };
    apiFunc();
  }, [productsID]);
  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <Typography
          variant="h4"
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "30px" }}
        >
          Product Details
        </Typography>

        {loading && loading ? (
          <Box>
            <Typography>Loading. . .</Typography>
          </Box>
        ) : (
          <Container>
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                <img
                  src={productsDetail?.image}
                  alt={productsDetail?.title}
                  width={130}
                  height={130}
                />
              </Grid>
              <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                <Typography
                  variant="h5"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  {productsDetail?.title}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Rs. {productsDetail?.price}
                </Typography>
                {productsDetail?.category}
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default ProductDetails;
