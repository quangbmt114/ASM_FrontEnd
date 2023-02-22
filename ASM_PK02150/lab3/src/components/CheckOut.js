import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CartList from "./CartList";
import { CartContext } from "../context";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
 const dataUser = JSON.parse(localStorage.getItem("user"))
  // eslint-disable-next-line no-unused-vars
  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);

  const handleFormSubmit = async(e) => {
    e.preventDefault();
      const data = await axios.post("http://localhost:3000/historyUser",{
        name:name,
        email:email,
        address:address,
        phone:phone,
        notes:note,
        date:new Date() ,
        carts:carts,
        status :true
      })
      alert("cập nhật thông tin đơn hàng thành công!!")
      localStorage.removeItem(dataUser.id)
      carts.items =[]
      navigate("/")
      console.log(data);
    // Handle form submission logic here
  };

  return (
    <Container style={{marginTop : 25}}>
      <Row>
        <Col md={6}>
          <h1>Checkout</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="note">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Enter address"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
            <Button style={{marginTop : 20}} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <CartList carts={carts} />
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;