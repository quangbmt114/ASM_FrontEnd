import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UpdatePost = ({ isShow, handleClose, props, onReload }) => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  
  const OnchangeInput = (event) => {
    setPost({...post,[event.target.name]: event.target.value });
  };
  
  const onHandelSubmit = async () => {
    console.log(document.getElementById("formBasicName").value);
    const data = await axios.put(process.env.REACT_APP_API + `/posts/${id}`, post);
    console.log(post);
    if (data) {
       setPost(data)
       handleClose()
      onReload(id)
      alert("Update Success");
      
     
      
    }
  };
  return (
    <Modal show={isShow} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={OnchangeInput}
              name="name"
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPicture">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              name="picture"
              type="text"
              placeholder="url picture"
              onChange={OnchangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={OnchangeInput}
              name="price"
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
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
        <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Button variant="info" onClick={onHandelSubmit}>
        Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdatePost;
