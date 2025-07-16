import { /* useEffect */ useEffect, useRef, useState } from "react";
import type { FC } from "react";
import Button from "./Button";
import PrioIcon from "../components-svg/PrioIcon";
import styles from "../styles/Input.module.css";
import AddIcon from "../components-svg/AddIcon";
import HookIcon from "../components-svg/HookIcon";

//Type declaration
type TodoItem = { id: string; name: string; prio: boolean; isDone: boolean };
type InputProps = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  editTodo: TodoItem | null;
  setEditTodo: (todo: TodoItem | null) => void;
};

const Input: FC<InputProps> = ({ setTodoList, editTodo, setEditTodo }) => {
  //Variables
  const uuid = crypto.randomUUID();

  const cursorRef = useRef<HTMLInputElement>(null);
  //States
  const [todo, setTodo] = useState("");
  const [prio, setPrio] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (editTodo) {
      setShowInput(true);
      setTodo(editTodo.name);
      setPrio(editTodo.prio);
    }
  }, [editTodo]);

  const handleEditTodo = (event: React.FormEvent) => {
    event.preventDefault();
    setTodoList((prev) =>
      prev
        .map((item) => {
          if (item.id === editTodo?.id) {
            return {
              ...item,
              isDone: item.isDone,
              prio: prio,
              name: todo,
            };
          }
          return item;
        })
        .sort((a, b) => Number(b.prio) - Number(a.prio))
    );

    setEditTodo(null);
    setTodo("");
    setPrio(false);
    cursorRef.current?.focus();
  };

  const handleClose = () => {
    if (editTodo) {
      setEditTodo(null);
      setTodo("");
      setPrio(false);
      cursorRef.current?.focus();
    }
    setShowInput(false);
  };

  //Functions
  const handleTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (editTodo) {
      handleEditTodo(event);
      return;
    }
    if (todo.length > 3) {
      const newTodo: TodoItem = {
        id: uuid,
        name: todo,
        prio: prio,
        isDone: false,
      };

      setTodoList((prev) => {
        const sortedList = [...prev, newTodo];
        sortedList.sort((a, b) => {
          return Number(b.prio) - Number(a.prio); // true correspond to 1, false correspond to 0 - you have to convert them into Numbers
        });
        return sortedList;
      });
      setTodo("");
      setPrio(false);
      cursorRef.current?.focus();
    }
  };

  return (
    <>
      {!showInput && (
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.callInput}
            handleClick={() => setShowInput(true)}
            type="button"
          >
            <AddIcon />
          </Button>
        </div>
      )}
      <div
        className={`${styles.inputWrapper} ${
          showInput ? styles.visible : styles.hidden
        }`}
      >
        <Button
          variant="secondary"
          className={styles.closeButton}
          type="button"
          handleClick={handleClose}
        >
          <AddIcon size={15} className={styles.closeIcon} />
        </Button>
        <div className="basicWrapper">
          <form onSubmit={handleTodo}>
            <label htmlFor="todos" className="inputLabel">
              Add Todo
            </label>
            <div className={styles.describeTodo}>
              <input
                name="todos"
                id="todos"
                ref={cursorRef}
                autoFocus
                required
                placeholder="wash your clothes"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
              />

              <label>
                <input
                  type="checkbox"
                  className="hiddenElement"
                  checked={prio}
                  onChange={() => setPrio(!prio)}
                />
                <div className={styles.checkPrio}>
                  <PrioIcon
                    color={
                      prio ? "var(--accent-color)" : "var(--font-color-done)"
                    }
                    size={30}
                  />
                </div>
              </label>
            </div>
            <div className={styles.buttonWrapper}>
              <Button variant="primary">
                {editTodo ? <HookIcon size={18} /> : <AddIcon size={18} />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Input;
