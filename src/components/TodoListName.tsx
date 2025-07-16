import { useState, type FC } from "react";
import Button from "./Button";
import EditIcon from "../components-svg/EditIcon";
import styles from "./TodoListName.module.css";

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
      inputName.trim().toUpperCase();
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
    <div className="basicWrapper">
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
      <div className={styles.subtitle}>
        <h2 className={styles.h2}>{listName}</h2>
        <Button
          variant="secondary"
          className={styles.editSubtitle}
          handleClick={editName}
        >
          <EditIcon />
        </Button>
      </div>
    </div>
  );
};
export default TodoListName;
