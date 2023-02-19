import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";


function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { username, email } = data;
    const response = await axios.get(
      process.env.REACT_APP_API +
        `/users?username=${username}&email=${email}`
    );
    if(response.status === 200 && response.data.length > 0) {
      navigate("/changepassword")
    }
     else {
      alert("Wrong Username or Email");
    }
    console.log(response.data);
  };
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100" style={{marginTop: 20}}>
      <Col md={{ span: 5 }}>
        <h3 style={{marginLeft:180}}>Change Password</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>password</Form.Label>
            <Form.Control
              name="password"
              type="text"
              {...register("username", { required: true })}
              placeholder="Enter name"
            />
            {errors?.username?.type === "required" && (
              <p className="text-danger">Username is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter email"
              rows={3}
            />
            {errors?.email?.type === "required" && (
              <p className="text-danger">Password is required</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </div>
  );
}

export default ChangePassword;
