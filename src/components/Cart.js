import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, InputNumber, Row, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formaterCurrency } from "../utils";
import { DecreaseQuantity, DeleteCart, IncreaseQuantity } from "../actions";
export const Cart = () => {
   const [subTotal, setSubTotal] = useState(0);
   const [update, setUpdate] = useState(true);
   const cart = useSelector((state) => {
      console.log("changeState");
      return state.productData.shoppingCart;
   });

   const dispatch = useDispatch();

   useEffect(() => {
      let temp = 0;

      cart.forEach((ele) => {
         temp += ele.quantity * ele.price;
      });
      setSubTotal(temp);
   }, [update]);

   const increaseProduct = (id) => {
      dispatch(IncreaseQuantity({ id }));
      setUpdate(!update);
   };

   const decreaseProduct = (id) => {
      dispatch(DecreaseQuantity({ id }));
      setUpdate(!update);
   };

   const deleteProductIncart = (id) => {
      dispatch(DeleteCart({ id }));
      setUpdate(!update);
   };

   return (
      <div
         style={{
            width: "70%",
            margin: "32px auto",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
         }}
      >
         {console.log("cart", cart)}
         <Row
            style={{
               fontSize: "1.1em",
               borderBottom: "2px solid #dfdfdf",
               padding: "8px 0px 8px 0px",
            }}
         >
            <Col span={1}></Col>
            <Col span={4}>
               <b>Name</b>
            </Col>
            <Col span={4}>
               <b>Image</b>
            </Col>
            <Col span={4}>
               <b>Price</b>
            </Col>
            <Col span={5}>
               <b>Quantity</b>
            </Col>
            <Col span={6}>
               <b>Total</b>
            </Col>
         </Row>
         <div style={{ minHeight: "200px", overflow: "auto" }}>
            {cart.length > 0 &&
               cart.map((ele) => (
                  <Row
                     style={{
                        fontSize: "1.1em",
                        borderBottom: "1px solid #dfdfdf",
                        padding: "8px 0px 8px 0px",
                     }}
                     justify="space-around"
                     align="middle"
                  >
                     <Col span={1}>
                        <Tooltip title="search">
                           <Button
                              shape="circle"
                              icon={<DeleteOutlined />}
                              danger
                              onClick={() => {
                                 deleteProductIncart(ele.id);
                              }}
                           />
                        </Tooltip>
                     </Col>
                     <Col span={4}>
                        <p>{ele.name}</p>
                     </Col>
                     <Col span={4}>
                        <img
                           src={ele.image}
                           style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "cover",
                           }}
                           alt=".png"
                        ></img>
                     </Col>
                     <Col span={4}>
                        <p>{formaterCurrency(ele.price)}</p>
                     </Col>
                     <Col
                        span={5}
                        style={{
                           display: "flex",
                           justifyContent: "center",
                        }}
                     >
                        <Button
                           type="primary"
                           icon={<PlusOutlined />}
                           onClick={() => {
                              increaseProduct(ele.id);
                           }}
                        />
                        <Input
                           disabled={true}
                           value={ele.quantity}
                           style={{
                              width: "48px",
                              margin: "0 4px",
                              textAlign: "center",
                           }}
                        />
                        <Button
                           type="primary"
                           icon={<MinusOutlined />}
                           onClick={() => {
                              decreaseProduct(ele.id);
                           }}
                        />
                     </Col>
                     <Col span={6}>
                        <p>{formaterCurrency(ele.quantity * ele.price)}</p>
                     </Col>
                  </Row>
               ))}
         </div>

         <div>
            <Row
               style={{
                  fontSize: "1.1em",
                  padding: "16px 0",
               }}
               justify="space-around"
               align="middle"
            >
               <Col span={18}>
                  <h3>Subtotal</h3>
               </Col>
               <Col span={6}>
                  <p>{formaterCurrency(subTotal)}</p>
               </Col>
            </Row>
         </div>
      </div>
   );
};
