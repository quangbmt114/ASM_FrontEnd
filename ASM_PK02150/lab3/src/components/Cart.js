import React, { useContext } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { CartContext } from "../context";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";



const Cart = () => {
  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);
  const navigate = useNavigate();
  if (!carts?.items?.length) {
    return (
      <Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h4 style={{ marginTop: 40 }}>No item in Cart</h4>
            <Button
              variant="secondary"
              style={{ display: "block", marginTop: 10 }}
              onClick={() => navigate("/userapp")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Row>
    );
  }
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
              {carts?.items?.length &&
                carts.items.map((item) => (
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
                      <Button
                        variant="secondary"
                        onClick={() => {
                          dispatch({
                            type: ACTION.ADD_ITEM,
                            payload: {
                              item: { ...item, quantity: 1 },
                            },
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          dispatch({
                            type: ACTION.MINUS_ITEM,
                            payload: {
                              item: { ...item, quantity: 1 },
                            },
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
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
                  SUM: <span>${carts.sum}</span>
                </td>
                <td></td>
              </tr>
              <Button
                variant="dark"
                style={{ marginTop: 7 }}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
            </tfoot>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Cart;
