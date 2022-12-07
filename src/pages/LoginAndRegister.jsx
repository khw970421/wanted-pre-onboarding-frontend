import React, { useState } from "react";
import styled from "styled-components";

const LoginAndRegister = () => {
  const [isLoginBtnClick, setIsLoginBtnClick] = useState(true);
  const [isValidSubmit, setIsValidSubmit] = useState({
    email: false,
    password: false,
  });

  const clickBtn = () => setIsLoginBtnClick(!isLoginBtnClick);
  const changeInputValue = ({ target }) => {
    if (target.type === "email") {
      setIsValidSubmit({
        ...isValidSubmit,
        ...{ email: isEmailValid(target.value) },
      });
    } else if (target.type === "password") {
      setIsValidSubmit({
        ...isValidSubmit,
        ...{ password: isPasswordValid(target.value) },
      });
    }
  };

  const isEmailValid = (email) => email.includes("@");
  const isPasswordValid = (password) => password.length >= 8;

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
      <button disabled={!(isValidSubmit.email && isValidSubmit.password)}>
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
