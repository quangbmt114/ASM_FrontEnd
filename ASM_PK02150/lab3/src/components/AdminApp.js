/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../App.css";
import Posts from "./PostsAdmin";
import { callAPI } from "../services/api";
import { paginate } from "../utils/helper";
import CreatePost from "./CreatePost";
import { Container, Row, Pagination, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import NewPost from "./images/new-document-32px.png"
import PostsAdmin from "./PostsAdmin"
function App() {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChangeInput = (event) => {
    setTimeout(() => {
      setKeyword(event.target.value);
    }, [3000]);
  };

  useEffect(() => {
    fetchBlog();
  }, [keyword]);

  const fetchBlog = async () => {
    let url = "/posts?";
    if (keyword) {
      url = `/posts?q=${keyword}`;
    }
    const data = await callAPI(url, "GET");
    setData(data);
  };

  const Sorting = async () => {
    let url = "/posts?_sort=id&_order=desc";
    const data = await callAPI(url, "GET");
    setData(data);
  };

  const SortPriceDown = async () => {
    let url = "/posts?_sort=price&_order=desc";
    const data = await callAPI(url, "GET");
    setData(data);
  };

  const SortPriceUp = async () => {
    let url = "/posts?_sort=price&_order=asc";
    const data = await callAPI(url, "GET");
    setData(data);
  };

  if (data.length > 0) {
    console.log(paginate(data, limit, 3));
  }

  let items = [];
  for (let number = 1; number <= Math.ceil(data.length / limit); number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setPage(number);
        }}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleReload = (id) => {
    console.log("id removed", id);
    const updatePost = data.filter((post) => post.id !== id);
    setData(updatePost);
  };

  return (
    <Container style={{ marginBottom: 80 }}>
      <Row>
        <div>
          <div className="input-group mb-3 mt-3 w-50">
            <input
              type="text"
              className="form-control rounded"
              placeholder="Tìm Kiếm Sản phẩm"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={handleOnChangeInput}
            />
            <Button style={{ marginLeft: 5 }} variant="secondary">
            <FontAwesomeIcon icon= {faMagnifyingGlass} />
            </Button>
            <Button
            variant="info"
              style={{ marginLeft: 5 }}
              onClick={() => setIsOpen(!isOpen)}
            >
           <img src={NewPost}/>
            </Button>
            <DropdownButton className="detail"
              style={{ marginLeft: 5}}
            >
              <Dropdown.Item eventKey="1" onClick={Sorting}>Theo ID
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={SortPriceDown}>
               Theo Giá Giảm dần
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onClick={SortPriceUp}>
               Theo giá Tăng dần
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <PostsAdmin
          keyword={keyword}
          onReload={handleReload}
          posts={paginate(data, limit, page)}
        />
        <Pagination>{items}</Pagination>
        <CreatePost onReload={handleReload} isShow={isOpen} handleClose={() => setIsOpen(false)} />

      </Row>
    </Container>
  );
}

export default App;
