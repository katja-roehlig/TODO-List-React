import { useEffect, useState } from "react";
import Input from "./components/Input";
import List from "./components/List";
import TodoListName from "./components/TodoListName";

import "./App.css";

type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const date = new Date().toLocaleString("de-DE").slice(0, 9);
  const [listName, setListName] = useState(() => {
    return localStorage.getItem("lastUsedList") || date;
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [editTodo, setEditTodo] = useState<TodoItem | null>(null);

  useEffect(() => {
    if (!listName) return;

    const storageContent = localStorage.getItem(listName);
    if (storageContent) {
      setTodoList(JSON.parse(storageContent));
    } else {
      setTodoList([]);
    }
    localStorage.setItem("lastUsedList", listName);
    setIsLoaded(true);
  }, [listName]);

  useEffect(() => {
    if (isLoaded && listName) {
      localStorage.setItem(listName, JSON.stringify(todoList));
    }
  }, [todoList, listName, isLoaded]);

  return (
    <>
      <header>
        <h1>
          Get your sh<span className="star">*</span>t done
        </h1>
      </header>

      <TodoListName listName={listName} setListName={setListName} date={date} />

      <List
        todoList={todoList}
        setTodoList={setTodoList}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
      <Input
        setTodoList={setTodoList}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    </>
  );
}

export default App;
