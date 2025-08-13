import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (editTodo) {
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
    /*   cursorRef.current?.focus(); */
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
        return sortedList.toSorted(
          (a, b) => Number(a.isDone) - Number(b.isDone)
        );
      });
      setTodo("");
      setPrio(false);
      cursorRef.current?.focus();
    }
  };

  return (
    <>
      <div className={`basicWrapper ${styles.inputWrapper}`}>
        <form onSubmit={handleTodo} className={styles.formContainer}>
          <label htmlFor="todos" className="inputLabel">
            Add Todo
          </label>
          <div className={styles.describeTodo}>
            <div className={styles.inputSection}>
              <input
                name="todos"
                id="todos"
                ref={cursorRef}
                autoFocus
                required
                placeholder="wash your clothes"
                value={todo}
                className={styles.inputField}
                onChange={(event) => setTodo(event.target.value)}
              />
              <label className={styles.prioLabel}>
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
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
