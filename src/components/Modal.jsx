import styled from "styled-components";
import React, { useState, useRef } from "react";

const Modal = ({
  width = 20,
  height = 10,
  btnText = "Open Modal",
  modalContent = "Todo",
  updateTodo,
  dataId,
  dataArrIdx,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(modalContent);
  const ModalEvent = () => {
    setIsModalOpen(!isModalOpen);
  };

  const ModalSubmitEvent = () => {
    updateTodo(inputRef.current, dataId, dataArrIdx);
    setIsModalOpen(!isModalOpen);
  };

  const checkModalOut = ({ target }) => {
    if (target.className.includes("modalContainer")) ModalEvent();
  };

  const changeVal = ({ target }) => (inputRef.current = target.value);

  return (
    <div>
      {isModalOpen ? (
        <ModalContainer onClick={checkModalOut} className="modalContainer">
          <ModalDiv>
            <ModalSubmitOutDiv onClick={ModalSubmitEvent}>
              제출
            </ModalSubmitOutDiv>
            <ModalOutDiv onClick={ModalEvent}>취소</ModalOutDiv>
            <input type="text" ref={inputRef} onChange={changeVal} />
          </ModalDiv>
        </ModalContainer>
      ) : (
        <></>
      )}
      <ModalBtn width={width} height={height} onClick={ModalEvent}>
        {btnText}
      </ModalBtn>
    </div>
  );
};

const ModalBtn = styled.button`
  background: purple;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  color: white;
  border: 0px;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

// ModalDiv는 position relative를 해도 상관은없다.
// 어차피 부모가 전체 넓이를 fixed로 차지한 것을 기준으로
// 중간위치를 위해 top left 50% 지정하고 딱 정중앙을 위해 transform을 사용했기 때문
const ModalDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 20vw;
  height: 15vh;
  border-radius: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: purple;
  padding: 1%;
`;

const ModalOutDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 90%;
  left: 90%;
  color: black;
  cursor: pointer;
`;

const ModalSubmitOutDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 60%;
  left: 90%;
  color: black;
  cursor: pointer;
`;

export default Modal;
