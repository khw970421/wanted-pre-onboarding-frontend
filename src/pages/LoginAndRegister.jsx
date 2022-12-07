import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import request from "../api/axios";
import { getItem, setItem } from "../utils/localStorage";

const LoginAndRegister = () => {
  const [isLoginBtnClick, setIsLoginBtnClick] = useState(true);
  const [isValidSubmit, setIsValidSubmit] = useState({
    email: false,
    password: false,
  });
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItem("loginToken");
    if (token) {
      navigate("/todos");
    }
  }, []);

  const clickBtn = () => setIsLoginBtnClick(!isLoginBtnClick);
  const changeInputValue = ({ target }) => {
    if (target.type === "email") {
      setIsValidSubmit({
        ...isValidSubmit,
        ...{ email: isEmailValid(target.value) },
      });
      setInputData({ ...inputData, ...{ email: target.value } });
    } else if (target.type === "password") {
      setIsValidSubmit({
        ...isValidSubmit,
        ...{ password: isPasswordValid(target.value) },
      });
      setInputData({ ...inputData, ...{ password: target.value } });
    }
  };

  const isEmailValid = (email) => email.includes("@");
  const isPasswordValid = (password) => password.length >= 8;

  const clickSubmit = async () => {
    const { access_token } = await request(
      `/auth/signup`,
      inputData.email,
      inputData.password
    );
    access_token && setItem("loginToken", access_token);
  };

  return (
    <div>
      <LoginBtn
        isLoginBtnClick={isLoginBtnClick}
        disabled={isLoginBtnClick}
        onClick={clickBtn}
      >
        로그인
      </LoginBtn>
      <RegisterBtn
        isLoginBtnClick={isLoginBtnClick}
        disabled={!isLoginBtnClick}
        onClick={clickBtn}
      >
        회원가입
      </RegisterBtn>
      <input type="email" onChange={changeInputValue}></input>
      <input type="password" onChange={changeInputValue}></input>
      <button
        onClick={clickSubmit}
        disabled={!(isValidSubmit.email && isValidSubmit.password)}
      >
        제출
      </button>
    </div>
  );
};

const BtnContainer = styled.div``;

const LoginBtn = styled.button`
  color: ${({ isLoginBtnClick }) => (isLoginBtnClick ? "black" : "grey")};
`;

const RegisterBtn = styled.button`
  color: ${({ isLoginBtnClick }) => (isLoginBtnClick ? "grey" : "black")};
`;

export default LoginAndRegister;
