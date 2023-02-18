/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import Footer from "./components/Footer";
import { CartContext } from "./context";
import { ACTION } from "./const";
import HeaderAdmin from "./components/HeaderAdmin";

const cartInit = {
  items: [],
  sum: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.ADD_ITEM: {
      const { item = {} } = action.payload;
      const index = state.items.findIndex((cart) => cart.id === item.id);
      if (index === -1) {
        //them moi
        return {
          ...state,
          items: [...state.items, item],
          sum: item.price,
        };
      }
      const newItems = [...state.items];
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity + 1,
      };
      return {
        ...state,
        items: newItems,
        sum: newItems.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        ),
      };
    }
    case ACTION.REMOVE_ITEM: {
      const { id } = action.payload;
      const items = state.items.filter((item) => item.id !== id);
      return {
        ...state,
        items: items,
        sum: items.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        ),
      };
    }
    case ACTION.MINUS_ITEM: {
      const { id } = action.payload;
      const items = state.items.filter((item) => item.id !== id);
      const { item = {} } = action.payload;
      const index = state.items.findIndex((cart) => cart.id === item.id);
      if (index === -1) {
        //them moi
        return {
          ...state,
          items: [...state.items, item],
          sum: item.price,
        };
      }
      const newItems = [...state.items];
      newItems[index] = {
        ...newItems[index],
        quantity: newItems[index].quantity - 1,
      };
      if(newItems[index].quantity === 0){
        return {
          ...state,
          items: items,
          sum: items.reduce(
            (accumulator, item) => accumulator + item.price * item.quantity,
            0
          ),
        }
      }
      return {
        ...state,
        items: newItems,
        sum: newItems.reduce(
          (accumulator, item) => accumulator + item.price * item.quantity,
          0
        ),
      };
    }

    default:
      return state;
  }
}

const LayoutAdmin = (props) => {
  const [state, dispatch] = useReducer(reducer, cartInit);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(localStorage.getItem("user"));
    }
  }, [location]);

  return (
    <CartContext.Provider
      value={{
        cartReducer: state,
        cartDispatch: dispatch,
      }}
    >
      <Container auth={currentUser}>
        <HeaderAdmin auth={currentUser} />
        {props.children}
        <Footer></Footer>
      </Container>
    </CartContext.Provider>
  );
};
export default LayoutAdmin;
