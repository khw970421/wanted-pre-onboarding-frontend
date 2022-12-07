import React, { useEffect, useRef, useState } from "react";
import { getItem } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import request, { deleteRequest, getRequest, putRequest } from "./../api/axios";
import Modal from "../components/Modal";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const inputRef = useRef("");
  useEffect(() => {
    const token = getItem("loginToken");
    if (!token) {
      navigate("/");
    }
    getTodos();
  }, []);

  const getTodos = async () => {
    const todos = await getRequest("/todos", getItem("loginToken"));
    setTodos(todos);
  };

  const addTodo = async () => {
    const addTodo = await request(
      "/todos",
      {
        todo: inputRef.current.value,
      },
      getItem("loginToken")
    );
    const newTodos = [...todos, addTodo];
    setTodos(newTodos);
  };

  const clickCheckbox = async ({ target }) => {
    const res = await putRequest(
      `/todos/${target.dataset["id"]}`,
      {
        todo: todos[target.dataset["arridx"]].todo,
        isCompleted: !todos[target.dataset["arridx"]].isCompleted,
      },
      getItem("loginToken")
    );
    const newTodos = [...todos];
    newTodos[target.dataset["arridx"]].isCompleted =
      !newTodos[target.dataset["arridx"]].isCompleted;
    setTodos(newTodos);
  };

  const updateTodo = async (target, dataId, dataArrIdx) => {
    await putRequest(
      `/todos/${dataId}`,
      {
        todo: target,
        isCompleted: todos[dataArrIdx].isCompleted,
      },
      getItem("loginToken")
    );
    const newTodos = [...todos];
    newTodos[dataArrIdx].todo = target;
    setTodos(newTodos);
  };

  const deleteTodo = async ({ target }) => {
    await deleteRequest(
      `/todos/${target.dataset["id"]}`,
      getItem("loginToken")
    );
    const newTodos = [...todos];
    newTodos.splice(target.dataset["arridx"], 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <Add>
        <input type="text" ref={inputRef} />
        <button onClick={addTodo}>할일 추가</button>
      </Add>
      <TodoList>
        {todos.map(({ id, todo, isCompleted, userId }, idx) => (
          <Li key={idx}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={clickCheckbox}
              data-id={id}
              data-arridx={idx}
            ></input>
            <Span isCompleted={isCompleted}>{todo}</Span>
            <BtnContainer>
              <Modal
                dataId={id}
                dataArrIdx={idx}
                btnText="수정"
                width={50}
                height={30}
                modalContent={todo}
                updateTodo={updateTodo}
              />
              <Btn onClick={deleteTodo} data-id={id} data-arridx={idx}>
                삭제
              </Btn>
            </BtnContainer>
          </Li>
        ))}
      </TodoList>
    </div>
  );
};

const Add = styled.div``;
const TodoList = styled.ul``;
const BtnContainer = styled.div`
  display: flex;
  margin: 10px;
`;
const Span = styled.span`
  text-decoration: ${({ isCompleted }) => (isCompleted ? "line-through" : "")};
`;
const Btn = styled.button`
  margin: 5px;
  width: 50px;
  height: 30px;
`;
const Li = styled.li`
  list-style: none;
  width: 500px;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin: 5px;
  border-radius: 5px;
`;
export default Todos;
