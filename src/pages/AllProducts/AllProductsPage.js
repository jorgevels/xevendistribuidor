import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products/products_actions";

import productsBanner from "../../assets/images/Banner-Todos.png";
import AllProducts from "../../components/AllProducts/AllProducts";
import Banner from "../../components/Banner/Banner";
import ButtonWhatsApp from "../../components/ButtonWhatsApp/ButtonWhatsApp";
import Categories from "../../components/Categories/Categories";
import ClientSlider from "../../components/ClientSlider/ClientSlider";
import "./AllProducts.scss";

const AllProductsPage = (isCartSidebarOpen) => {
  const { sideCartOpen } = useSelector((state) => state.sidebar);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Banner image={productsBanner} />
      <Categories />
      <AllProducts products={products} isCartSidebarOpen={sideCartOpen} />
      <ClientSlider />
      {/* <ButtonWhatsApp showButton={true} /> */}
     {/*  <ButtonWhatsApp showButton={!sideCartOpen} /> */}
    </>
  );
};

export default AllProductsPage;
