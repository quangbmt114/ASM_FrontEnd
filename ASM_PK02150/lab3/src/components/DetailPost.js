/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { callAPI } from "../services/api";
import { useParams } from "react-router-dom";

const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetchDetail();
  }, []);
  const fetchDetail = async () => {
    const data = await callAPI(`/posts/${id}`, "GET");
    if (data) {
      console.log(data);
      setPost(data);
      setLoading(false);
    }
  };

  if (loading) {
    <Row>
      <h1>loading</h1>
    </Row>;
  }
  if (post) {
    return (
      <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <div className="white-box text-center">
                <img alt="..." src={`${post.picture || "https://via.placeholder.com/150"}`} className="img-responsive mw-100" />
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6">
              <div className="group-status">
                <div className="reviews_detail_product first_status">
                </div>
              </div>
              <h3 className="card-title">{post.name}</h3>
              <h2 className="text-danger">{post.price}</h2>
              <div className="des">
                <h4 className="info">Info</h4>
                <p>{post.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
};
export default PostDetail;
