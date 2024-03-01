import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import Home from "./pages/Home";
import UserProfilePage from "./pages/UserProfilePage";
import Payments from "./pages/Payments";

import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import CategoryProducts from "./pages/Product Page/CategoryProducts";
import Cart from "./pages/Cart Page/Cart";
import Wishlist from "./pages/Whishlist Page/Wishlist";
import UploadData from "./UploadData";
import Footer from "./components/Footer";
import PaymentPage from "./pages/Payment/Payment";
import PaymentStatusPage from "./pages/Payment/PaymentStatusPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={Home}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route
          exact
          path="/update-profile/:username"
          element={<UpdateUserProfile />}
        ></Route>
        <Route
          exact
          path="/userprofile/:username"
          element={<UserProfilePage />}
        ></Route>
        <Route
          exact
          path="/:cat_id/products"
          element={<CategoryProducts />}
        ></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/favourites" element={<Wishlist />}></Route>
        <Route exact path="/payments" element={<Payments />}></Route>
        <Route exact path="/upload-data" element={<UploadData />}></Route>
        <Route exact path="/payment" element={<PaymentPage />} />
        <Route
          path="/:merchantId/:transactionId"
          element={<PaymentStatusPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
