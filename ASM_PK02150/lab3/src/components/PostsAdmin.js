import { callAPI } from "../services/api";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React,{useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonDelete from "./images/delete-24px.png"
const PostsAdmin = ({ posts, keyword, onReload }) => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [isShow,SetIsShow]=useState(false)
  const OnchangeInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const onHandelSubmit = async () => {
    const data = await axios.put(process.env.REACT_APP_API + `/posts/${id}`, post);
    if (data) {
      alert("Update Success");
    }
  };
  const onHandleUpdate = async(id)=>{
    SetIsShow(true)
    const data = await axios.get(process.env.REACT_APP_API + `/posts/${id}`,post)
    console.log(data.data.name);
    document.getElementById("formBasicText").value = data.data.name
    document.getElementById("formBasicPicture").value = data.data.picture
    document.getElementById("formBasicPrice").value = data.data.price
    document.getElementById("formBasicDescription").value = data.data.description

  }
  return (
    <section style={{ backgroundColor: "#eee" ,marginBottom:30}} >
    <div className="container py-3">
      <div className="row ">
      <Modal show={isShow} onHide={()=>SetIsShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText" >
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={OnchangeInput}
              name="name"
              type="text"
              placeholder="Enter name"
              className="abc"
              
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
        <Button variant="secondary" onClick={()=>SetIsShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={onHandelSubmit}>
          Save post
        </Button>
      </Modal.Footer>
    </Modal>
        {posts.map((post) => {
          return (
            <div key={post.id} className="post col col-md-12 col-lg-3 mb-4 mb-lg-0">
              <div className="p-3 mb-5 bg-white rounded">
                <div className="product product-body">
                  <div className="product-image mb-2">
                    <img style={{width:220}} src={post.picture || "https://via.placeholder.com/150"} alt="" />
                  </div>
                  <p className="product-name fw-bold">
                    <Link to={`/posts/${post.id}`} className="text-decoration-none text-secondary">{post.name}</Link>
                  </p>
                  <p className="text-dark fw-bold">{post.price}</p>
                  <p >{post.description}</p>
                  <Button style={{marginRight:5}} variant="danger" onClick={async () => {
                      const response = await callAPI(
                        `/posts/${post.id}`,
                        "DELETE"
                      );
                      if (response) {
                        alert("delete successfully");
                        onReload(post.id);
                      }
                    }}>
                       <img src={ButtonDelete} style={{width:15,margin:5}}/>
                       </Button>
                      <Button onClick={()=>onHandleUpdate(post.id)}>Update</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>



  </section>


  );
};
export default PostsAdmin;
