import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const CartList = ({ carts }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {carts?.items?.length &&
          carts.items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={`${item.picture}`} alt="" style={{ width: 100 }} />
              </td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            SUM: <span>${carts.sum}</span>
          </td>
        </tr>
        <Button
          variant="dark"
          style={{ marginTop: 7 }}
          onClick={() => navigate("/cart")}
        >
          Back to cart
        </Button>
      </tfoot>
    </Table>
  );
};
export default CartList;
