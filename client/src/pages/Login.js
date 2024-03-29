import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

function Login(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (proxy, { data: { login: userData } }) => {
      context.login(userData);
      navigate("/");
    },
    // onCompleted: (data) => {
    //   console.log("data: ", data);
    //   navigate("/");
    // },
    onError: (err) => {
      console.log("errors:", err?.graphQLErrors[0]?.extensions?.errors);
      if (err) setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
  });

  /**
   * reason we are using this function is because it will be hoisted and recognized by useForm but addUser won't
   * all functions declared with function keyword get hoisted but const function do not :o
   */
  function loginUserCallback() {
    loginUser({ variables: values });
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors?.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;
