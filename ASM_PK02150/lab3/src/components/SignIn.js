import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";


function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { username, password } = data;
    const response = await axios.get(
      process.env.REACT_APP_API +
        `/users?username=${username}&password=${password}`
    );
    if (response.status === 200 && response.data.length > 0 &&  username==="admin") {
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      navigate("/adminApp");
    } else if(response.status === 200 && response.data.length > 0) {
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      navigate("/userApp")
    }
     else {
      alert("Wrong Username or Password");
    }
    console.log(response.data);
  };
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100" style={{marginTop: 20}}>
      <Col md={{ span: 5 }}>
        <h3 style={{marginLeft:180}}>Sign In</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              {...register("username", { required: true })}
              placeholder="Enter name"
            />
            {errors?.username?.type === "required" && (
              <p className="text-danger">Username is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter password"
              rows={3}
            />
            {errors?.password?.type === "required" && (
              <p className="text-danger">Password is required</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
          <p className="mt-3" style={{textAlign:"center",marginTop:0}} >Don't Have an Account ? <span><Link to="/signUp"> Sign up</Link></span></p>
          <p className="mt-3" style={{textAlign:"center",marginTop:0}} >You don't sign in with your Account <span><Link to="/resetpassword"> Reset Password</Link></span></p>
        </Form>
      </Col>
    </div>
  );
}

export default SignIn;
