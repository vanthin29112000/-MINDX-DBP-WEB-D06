import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct, GetNumberCart } from "../actions";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

export const HeaderComponent = () => {
   const cart = useSelector((state) => {
      return state.productData.numberCart;
   });

   return (
      <div>
         <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
               <Menu.Item key={1}>
                  <Link to="/">Trang chủ</Link>
               </Menu.Item>
               <Menu.Item key={2}>
                  <Link to="/cart">Giỏ hàng : {cart}</Link>
               </Menu.Item>
            </Menu>
         </Header>
      </div>
   );
};
