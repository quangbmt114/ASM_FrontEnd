import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { CartContext } from "../context";
import { useNavigate,useParams } from "react-router-dom";
import { ACTION } from "../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManagerDetailCart = () => {
  const {date}= useParams()
  const [cart,setCart]=useState(null)
  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);
  const navigate = useNavigate();
const fectBlog= async()=>{
  const data = await axios.get(`http://localhost:3000/historyUser?date=${date}`)
  setCart(data.data[0].carts)
    
}
useEffect(() => {
  fectBlog()
}, []);

  if (cart) {
  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col>
          <h2 style={{ textAlign: "center" }}>Shopping Cart</h2>
          <Table style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Add</th>
                <th>Minus</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
            
            {
                cart.items.map((item) => (
                  
                  <tr key={item.id}>
                  
                    <td>
                      <img
                        src={`${item.picture}`}
                        alt=""
                        style={{ width: 100 }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      
                    </td>
                    <td>
                      
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          dispatch({
                            type: ACTION.REMOVE_ITEM,
                            payload: {
                              id: item.id,
                            },
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  SUM: <span>${cart.sum}</span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Container>
  )}
};
export default ManagerDetailCart;
