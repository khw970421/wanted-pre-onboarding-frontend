import React, { useEffect, useRef, useState } from "react";
import { getItem } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import request, { getRequest, putRequest } from "./../api/axios";

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
    console.log(todos);
  };

  const addTodo = async () => {
    const p = await request(
      "/todos",
      {
        todo: inputRef.current.value,
      },
      getItem("loginToken")
    );
    console.log(p);
  };

  const clickCheckbox = ({ target }) => {
    const res = putRequest(
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
            <span>{todo}</span>
            <BtnContainer>
              <Btn>수정</Btn>
              <Btn>삭제</Btn>
            </BtnContainer>
          </Li>
        ))}
      </TodoList>
    </div>
  );
};

const Add = styled.div``;
const TodoList = styled.ul``;
const BtnContainer = styled.div``;
const Btn = styled.button`
  margin: 5px;
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
