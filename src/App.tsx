import { BASE_URL } from "./utils";
import { useState, useEffect } from "react";
import { Datas, Loading, CartOpen } from "./utils";
import ProductsList from "./components/ProductsList";
import { Box, Typography } from "@mui/material";
import TopArea from "./components/TopArea";

const App = () => {
  const [data, setData] = useState<Datas[]>([]);
  const [loading, setLoading] = useState<Loading>(true);
  const [cartOpen, setCartOpen] = useState<CartOpen>(false);
  useEffect(() => {
    const apiFunc = async () => {
      try {
        const apiURL = await fetch(`${BASE_URL}/products`);
        const response = await apiURL.json();
        setData(response);
      } catch (error: any) {
        setData(error);
      } finally {
        setLoading(false);
      }
    };
    apiFunc();
  }, []);

  return (
    <>
      <Box sx={{ marginBottom: "50px" }}>
        <TopArea setCartOpen={setCartOpen} />
      </Box>
      {loading && loading ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Loading. . .</Typography>
        </Box>
      ) : (
        <ProductsList
          data={data}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      )}
    </>
  );
};

export default App;
