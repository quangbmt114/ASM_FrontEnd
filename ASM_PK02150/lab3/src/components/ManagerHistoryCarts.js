import React, { useContext,useState,useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { CartContext } from "../context";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash,faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const ManagerHistoryCarts  = () => {
    const [dataHistory,SetDataHistory] = useState([])
  const data = JSON.parse(localStorage.getItem("user"))
useEffect(() => {
    value()
}, []);
   const value =()=>{
    axios.get(`http://localhost:3000/historyUser`)
    .then(res=>{
        SetDataHistory(res)
        console.log(dataHistory);
    })
   }  
  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);
  const navigate = useNavigate();
  if (!dataHistory.data) {
    return (
        <Row>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <h4 style={{ marginTop:300 }}>No order item in History</h4>
                    <Button
                        variant="secondary"
                        style={{ display: "block", marginTop: 10,marginLeft:50 }}
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
        {
localStorage.setItem(data.id,JSON.stringify(carts.items))
 }
          <h2 style={{ textAlign: "center" }}>Shopping Cart</h2>
          <Table style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>address</th>
                <th>phone</th>
                <th>notes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                dataHistory.data.map((item) => (
                  <tr  key={item.id}>
                    <td>
                      <Link to={`/managerdetailcart/${item.date}`}><p
                        style={{ width: 100 }}
                      >{item.date}</p></Link>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}
                    </td>
                    <td>
                    {item.notes}
                    </td>
                    <td>{
                        item.status ==true ? "?????t":"h???y ?????t"
                    }</td>
                    <td>
                    <Button
                        variant="success"
                        onClick={ async() => {
                          await axios.patch(`http://localhost:3000/historyUser/${item.id}`,{
                            status:true
                            })
                            const data = await axios.get(`http://localhost:3000/historyUser/`)
                            SetDataHistory(data)
                        }}
                      >
                        <FontAwesomeIcon icon={faFileCircleCheck} />
                      </Button>
                      <Button
                        variant="danger" style={{marginLeft:20}}
                        onClick={async() => {
                         const dataUpdate = await axios.patch(`http://localhost:3000/historyUser/${item.id}`,{
                            status:false
                            })
                            const data = await axios.get(`http://localhost:3000/historyUser/`)
                            SetDataHistory(data)
                            
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
           
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default ManagerHistoryCarts;
