import { Button, Card, List } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCart, fetchAllProduct } from "../actions";
import { formaterCurrency } from "../utils";

export const Products = () => {
   const products = useSelector((state) => {
      return state.productData.products;
   });

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchAllProduct());
   }, [dispatch]);

   const addProductInCart = (product) => {
      dispatch(AddCart(product));
   };
   return (
      <div
         className="site-layout-background"
         style={{ padding: 24, minHeight: 380 }}
      >
         <List
            grid={{
               gutter: 16,
               xs: 1,
               sm: 2,
               md: 4,
               lg: 4,
               xl: 6,
               xxl: 3,
            }}
            dataSource={products}
            renderItem={(item) => (
               <List.Item>
                  <Card
                     style={{ width: 200, height: 300 }}
                     cover={
                        <img
                           alt="example"
                           src={item.image}
                           style={{ width: 200, height: 150 }}
                        />
                     }
                  >
                     <Meta
                        title={item.name}
                        description={formaterCurrency(item.price)}
                     ></Meta>
                     <Button
                        type="primary"
                        onClick={() => {
                           addProductInCart(item);
                        }}
                        style={{ marginTop: "16px" }}
                     >
                        Add Cart
                     </Button>
                  </Card>
               </List.Item>
            )}
         />
      </div>
   );
};
