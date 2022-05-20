import { combineReducers } from "redux";

const initProduct = {
   products: [],
   shoppingCart: [],
   numberCart: 0,
};

const productData = (state = initProduct, action) => {
   switch (action.type) {
      case "GET_ALL_PRODUCT":
         return {
            ...state,
            products: action.payload,
         };
      case "GET_NUMBER_CART":
         return { ...state };

      case "ADD_CART": {
         console.log(state);
         let temp = { ...action.payload, quantity: 1 };

         const findIndex = state.shoppingCart.findIndex(
            (ele) => ele.id === action.payload.id
         );

         if (findIndex === -1) {
            return {
               ...state,
               shoppingCart: [...state.shoppingCart, temp],
               numberCart: state.numberCart + 1,
            };
         } else {
            state.shoppingCart[findIndex].quantity++;
            return {
               ...state,
               shoppingCart: state.shoppingCart,
               numberCart: state.numberCart + 1,
            };
         }
      }

      case "DELETE_CART": {
         // TODO
         const findIndex = state.shoppingCart.findIndex(
            (ele) => ele.id === action.payload.id
         );

         let numberCartAfter =
            state.numberCart - state.shoppingCart[findIndex].quantity;

         let shoppingCartAfter = state.shoppingCart.filter(
            (ele) => ele.id !== action.payload.id
         );

         return {
            ...state,
            shoppingCart: shoppingCartAfter,
            numberCart: numberCartAfter,
         };
      }

      case "UPDATE_CART":
         // TODO
         return state;

      case "INCREASE_QUANTITY": {
         console.log("state", state);
         const findIndex = state.shoppingCart.findIndex(
            (ele) => ele.id === action.payload.id
         );
         state.shoppingCart[findIndex].quantity++;
         return {
            ...state,
            shoppingCart: state.shoppingCart,
            numberCart: state.numberCart + 1,
         };
      }

      case "DECREASE_QUANTITY": {
         const findIndex = state.shoppingCart.findIndex(
            (ele) => ele.id === action.payload.id
         );
         state.shoppingCart[findIndex].quantity--;
         return {
            ...state,
            shoppingCart: state.shoppingCart,
            numberCart: state.numberCart - 1,
         };
      }
      default:
         return state;
   }
};

export const shopReducers = combineReducers({
   productData: productData,
});
