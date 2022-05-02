import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "../util/hooks";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Register(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  // const [values, setValues] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  //   confirmPassword: "",
  // });

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // update: (proxy, result) => navigate("/"),
    onCompleted: (data) => {
      console.log("data: ", data);
      // props.history.push("/");
      navigate("/");
    },
    onError: (err) => {
      console.log("errors:", err?.graphQLErrors[0]?.extensions?.errors);
      if (err) setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
  });

  /**
   * reason we are using this function is because it will be hoisted and recognized by useForm but addUser won't
   * all functions declared with function keyword get hoisted but const function do not :o
   */
  function registerUser() {
    addUser({ variables: values });
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors?.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={errors?.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors?.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors?.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {/* {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

export default Register;
