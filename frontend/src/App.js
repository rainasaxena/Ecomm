import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Rings from "./pages/Rings";
import Earrings from "./pages/Earrings";
import Bracelets from "./pages/Bracelets";
import Necklaces from "./pages/Necklaces";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import Home from "./pages/Home"
import UserProfilePage from "./pages/UserProfilePage";
import CategoryProducts from "./pages/CategoryProducts";


// import {CategoryContextProvider} from "./context/categoryContextProvider";



function App() {
  return (
    // <CategoryContextProvider>
    <>
      <Routes>
        <Route exact path='/' Component={Home}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/update-profile/:username' element={<UpdateUserProfile/>}></Route>
        <Route exact path='/rings' element={<Rings/>}></Route>
        <Route exact path='/earrings' element={<Earrings/>}></Route>
        <Route exact path='/bracelets' element={<Bracelets/>}></Route>
        <Route exact path='/necklaces' element={<Necklaces/>}></Route>
        <Route exact path='/userprofile/:username' element={<UserProfilePage/>}></Route>
        <Route exact path='/:cat_id/products' element={<CategoryProducts/>}></Route>
      </Routes>
    </>
    // </CategoryContextProvider>
  );
}

export default App;
