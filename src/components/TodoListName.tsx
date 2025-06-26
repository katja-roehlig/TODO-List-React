import { useState, type FC } from "react";
import Button from "./Button";

type TodoListNameProps = {
  listName: string | "";
  setListName: React.Dispatch<React.SetStateAction<string>>;
  date: string;
};

const TodoListName: FC<TodoListNameProps> = ({
  listName,
  setListName,
  date,
}) => {
  const [inputName, setInputName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleName = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputName.length > 3) {
      setListName(inputName);
    } else {
      setListName(date);
    }
    setInputName("");
  };

  const editName = () => {
    setShowInput(true);
    setListName("");
  };
  return (
    <>
      {showInput && (
        <form onSubmit={handleName}>
          <label htmlFor="todos">Name your TodoList </label>
          <input
            name="todos"
            id="todos"
            /* ref={cursorRef} */
            autoFocus
            placeholder={"e.g. " + date}
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
          ></input>
          <button type="submit">Add Name </button>
        </form>
      )}
      <h2>{listName}</h2>
      <Button handleClick={editName}>Edit</Button>
    </>
  );
};
export default TodoListName;
