import { useState, type FC } from "react";
import Button from "./Button";
import EditIcon from "../components-svg/EditIcon";
import styles from "../styles/TodoListName.module.css";
import HookIcon from "../components-svg/HookIcon";

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
      setListName(inputName.trim().toUpperCase());
    } else {
      setListName(date);
    }
    setInputName("");
    setShowInput(false);
  };

  const editName = () => {
    setShowInput(true);
    setListName("");
  };
  return (
    <div className="basicWrapper">
      {showInput && (
        <form onSubmit={handleName} className={styles.form}>
          <label htmlFor="todos" className="inputLabel">
            Name your list
          </label>
          <div className={styles.describeSubtitle}>
            <input
              name="todos"
              id="todos"
              autoFocus
              placeholder={"e.g. " + date}
              value={inputName}
              onChange={(event) => setInputName(event.target.value)}
            ></input>
            <Button type="submit">
              <HookIcon size={18} />
            </Button>
          </div>
        </form>
      )}
      {!showInput && (
        <div className={styles.subtitle}>
          <h2 className={styles.h2}>{listName}</h2>
          <Button variant="secondary" handleClick={editName}>
            <EditIcon />
          </Button>
        </div>
      )}
    </div>
  );
};
export default TodoListName;
