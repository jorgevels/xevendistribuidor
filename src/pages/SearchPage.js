import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/products_actions";

import ButtonWhatsApp from "../components/ButtonWhatsApp/ButtonWhatsApp";
import SearchProducts from "../components/Search/SearchProducts";
/* import productsBanner from "../assets/images/products-banner2.jpg"; */

const SearchPage = () => {
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {/*  <Banner image={productsBanner} /> */}
      <SearchProducts products={products} />
      {/* <ClientSlider /> */}
      {/* <ButtonWhatsApp /> */}
      {/*  <ButtonWhatsApp showButton={true} /> */}
     {/*  <ButtonWhatsApp showButton={!sideCartOpen} /> */}
    </>
  );
};

export default SearchPage;
