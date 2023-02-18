import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
const CreatePost = ({ isShow, handleClose, onReload }) => {
  const [post, setPost] = useState({});
  const OnchangeInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(post);
  };

  const onHandelSubmit = async () => {
    const data = await axios.post(process.env.REACT_APP_API + `/posts`, post);
    console.log(data);
    if (data) {
      alert("thêm post thành công");
      handleClose()
      onReload(data.id);
      
    }
  };

  return (
    <Modal show={isShow} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={OnchangeInput}
              name="name"
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              name="picture"
              type="text"
              placeholder="url picture"
              onChange={OnchangeInput}
            />
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                onChange={OnchangeInput}
                placeholder="Enter price"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              onChange={OnchangeInput}
              placeholder="description"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onHandelSubmit}>
          Save post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CreatePost;
