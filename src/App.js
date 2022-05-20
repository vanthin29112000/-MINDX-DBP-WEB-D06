import "./App.css";
import { HeaderComponent } from "./components/HeaderComponent";
import { Layout } from "antd";
import { FooterComponent } from "./components/FooterComponent";
import { Route, Routes } from "react-router-dom";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
function App() {
   return (
      <div className="App">
         <Layout className="layout">
            <HeaderComponent></HeaderComponent>
            <Routes>
               <Route path="/" element={<Products />} />
               <Route path="/cart" element={<Cart />} />
            </Routes>
            <FooterComponent></FooterComponent>
         </Layout>
      </div>
   );
}

export default App;
