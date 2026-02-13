import {
  HashRouter,
  Route,
  Switch
} from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// pages
import {
  AllProducts,
  Annals,
  Contact,
  Electrifying,
  Energizing,
  Error,
  Featured,
  Home,
  Info,
  Lubricant,
  Multiorgasm,
  Oil,
  Payment,
  Pheromonas,
  Recommended,
  Search,
  SingleProduct,
  Success,
  Toy,
  Welfare,
} from "../pages";

// components
import CartSidebarWhatsApp from "../components/CartSidebarWhatsApp/CartSidebarWhatsApp";
import Footer from "../components/Footer/Footer";
import OrderWhatsApp from "../components/InfoOrderWhatsApp/OrderWhatsApp";
import InfoPago from "../components/InfoPagos/InfoPago";
import InfoPagoWhatsApp from "../components/InfoPagosWhatsApp/OrderPagoWhatsApp";
import Login from "../components/Login/Login/Login";
import Signup from "../components/Login/Signup/Signup";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
/* import { CategoriesProvider } from "../components/Categories/Categories"; */

import { SelectedCategoryProvider } from "../context/SelectedCategoryContext";

// scroll to top component
import ScrollToTop from "../utils/ScrollToTop";

const App = () => {
  const showButton = true;
  return (
    <HashRouter>
      <SelectedCategoryProvider>
        <ScrollToTop />
        <Navbar />
        {/*  <CartSidebar /> */}
        <CartSidebarWhatsApp />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/lubricant" component={Lubricant} />
          <Route exact path="/oil" component={Oil} />
          <Route exact path="/electrifying" component={Electrifying} />
          <Route exact path="/toy" component={Toy} />
          <Route exact path="/energizing" component={Energizing} />
          <Route exact path="/pheromonas" component={Pheromonas} />
          <Route exact path="/annals" component={Annals} />
          <Route exact path="/welfare" component={Welfare} />
          <Route exact path="/multiorgasm" component={Multiorgasm} />

          <Route exact path="/featured" component={Featured} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/recommended" component={Recommended} />
          <Route exact path="/info" component={Info} />
          <Route
            exact
            path="/order-review/f8119184-6568-421b-85c6-5e6859ddbbd7/:id"
            component={InfoPagoWhatsApp}
          />
          <Route exact path="/infoPago" component={InfoPago} />
          <Route exact path="/orderWhatsApp" component={OrderWhatsApp} />
          <Route exact path="/info/payment" component={Payment} />
          <Route exact path="/info/success" component={Success} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" children={<SingleProduct />} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </SelectedCategoryProvider>
    </HashRouter>
  );
};

export default App;
