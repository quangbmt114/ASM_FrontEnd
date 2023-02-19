import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate , Link  } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmPassword : yup.string().oneOf([yup.ref("password")]).required("Not match with password")
}).required();

function ResetPassword() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { username,  email } = data;
    const checkUsername = await axios.get(
      process.env.REACT_APP_API + `/users?username=${username}`
    );
    const checkEmail = await axios.get(
      process.env.REACT_APP_API+`/users?email=${email}`
    );

    if((checkUsername.status === 200 && checkUsername.data.length)
      && (checkEmail.status === 200 && checkEmail.data.length)
    ){
        const response = await axios.get(process.env.REACT_APP_API+`/users?username=${username}`);
          if (response.status === 200) {
            const set = await axios.put(process.env.REACT_APP_API+`/users/${response.data[0].id}`,data);
            alert("Reset password successfully");
            navigate("/signin");
          } else {
            alert("Reset password fail")
          }
        return;
    }else{
            alert("email or username fail")
    }
   
  };
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100" style={{marginTop: 20}}>
      <Col md={{ span: 5 }}>
        <h3 style={{marginLeft:180}}>Reset Password</h3>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              {...register("email")}
              placeholder="Enter name"
            />
            <p style={{color:"red"}}>{errors.email?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              {...register("username")}
              placeholder="Enter name"
            />
           <p style={{color:"red"}}>{errors.username?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              {...register("password")}
              placeholder="Enter password"
              rows={3}
            />
            <p style={{color:"red"}}>{errors.password?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label>Password confrim</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Enter confirm password"
              rows={3}
            />
            <p style={{color:"red"}}>{errors.confirmPassword?.message}</p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Reset
          </Button>
        </Form>
      </Col>
    </div>
  );
}

export default ResetPassword;
