import { BASE_URL } from "./utils";
import { useState, useEffect } from "react";
import { Datas, Loading } from "./utils";
import ProductsList from "./components/ProductsList";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [data, setData] = useState<Datas>([]);
  const [loading, setLoading] = useState<Loading>(false);
  useEffect(() => {
    const apiFunc = async () => {
      try {
        setLoading(true);
        const apiURL = await fetch(`${BASE_URL}/products`);
        const response = await apiURL.json();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    apiFunc();
  }, []);
  return (
    <>
      <Box sx={{ textAlign: "center", padding: "30px 0" }}>
        <Typography variant="h1" style={{ fontSize: "30px" }}>
          React with TypeScript
        </Typography>
      </Box>
      {loading && loading ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Loading. . .</Typography>
        </Box>
      ) : (
        <ProductsList data={data} />
      )}
    </>
  );
};

export default App;
