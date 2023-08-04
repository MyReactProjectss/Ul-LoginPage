import React, { useState } from "react";
import "../Login/loginform.css";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../Services/userServices";
import { useNavigate } from "react-router-dom";

const Loginform = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onClickRegister = (event) => {
    event.preventDefault();
    navigate("/registerForm");
    console.log("Register is working");
  };

  const onClickResetPassword = (event) => {
    event.preventDefault();
    navigate("/resetPassword");
    console.log("Reset Password is working");
  };

  const onChangeLogin = (e) => {
    const target = e.target;
    const newUserValue = target.value;
    const nameOfField = target.name;

    setLogin((prevState) => {
      const newLoginObject = {
        ...prevState,
      };
      newLoginObject[nameOfField] = newUserValue;
      return newLoginObject;
    });
  };

  const loginUser = (e) => {
    e.preventDefault();

    var newUser = { ...login };

    let input = [];
    for (const [key, value] of Object.entries(newUser)) {
      if (value === "") {
        toast.error(`Incorrect UserName or Password  ${key}`, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        input.push(newUser);
      }
    }
    if (input.length === 2) {
      console.log("input is here", input[0]);
      userService.userLogin(input[0]).then(onLoginSuccess).catch(onLoginError);
    }
  };

  const onLoginSuccess = (response) => {
    userService
      .currentLoggingIn()
      .then(currentUserSuccess1)
      .catch(currentUserError1);
    console.log(response);
  };

  const onLoginError = (err) => {
    console.log(err);
  };

  const currentUserSuccess1 = (response) => {
    console.log(response);
    props.getId(response.data.item.id);
  };

  const currentUserError1 = (err) => {
    console.log(err);
  };

  return (
    <React.Fragment>
      <div className="bg">
        <div className="cover">
          <h1 className="ltitle">Login Page</h1>
          <img
            className="img-responsive"
            src="https://tse3.mm.bing.net/th?id=OIP.Rg8r7GvuJMr9cwxsUTzGBgHaE8&pid=Api&P=0&h=180"
            alt="Animal"
          ></img>
          <form>
            <div className="form-group">
              <label htmlFor="UserName">UserName</label>
              <div></div>
              <input
                name="username"
                type="username"
                className="form-control"
                id="username1"
                aria-describedby="usernameHelp"
                placeholder="Enter username"
                onChange={onChangeLogin}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <div></div>
              <input
                name="password"
                type="password"
                className="form-control"
                id="Password1"
                placeholder="Password"
                onChange={onChangeLogin}
              />
            </div>
            <div className="text-center py-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Keep me logged in
                </label>
              </div>
              <button1 className="b1" type="submit" onClick={loginUser}>
                Login
              </button1>
              <button1 className="b1" type="submit" onClick={onClickRegister}>
                Register
              </button1>
              <p>Forgot Password and/or Username?</p>
              <button1
                className="b1"
                type="submit"
                onClick={onClickResetPassword}
              >
                Reset UserName Or Password
              </button1>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loginform;
