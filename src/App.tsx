import { useEffect, useState } from "react";
import Input from "./components/Input";
import List from "./components/List";

import "./App.css";

type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  useEffect(() => {
    const storageContent = localStorage.getItem("list");
    if (storageContent) {
      setTodoList(JSON.parse(storageContent));
    }
  }, []);

  return (
    <>
      <h1>Get your sh*t done</h1>
      <Input todoList={todoList} setTodoList={setTodoList} />
      <List todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

export default App;
