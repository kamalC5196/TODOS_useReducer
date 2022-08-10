import { useReducer, useCallback } from "react";
import "./styles.css";

const initialState = [
  {
    id: 1,
    task: "task1",
    done: false
  },
  {
    id: 2,
    task: "task2",
    done: false
  }
];
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "HANDLE_DONE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "ADD_TODO":
      return [...state, action.todo];
    case "DELETE_TODO":
      return state.filter((v) => v.id !== action.id);
    default:
      return state;
  }
};

export default function App() {
  const [todo, dispatch] = useReducer(reducer, initialState);
  const addTodo = useCallback((e) => {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      task: e.target.elements.inp.value,
      done: false
    };
    dispatch({ type: "ADD_TODO", todo });
  }, []);

  return (
    <div>
      <form onSubmit={addTodo}>
        <input type="text" id="inp" />
        <button type="submit">add</button>
      </form>
      {todo.map((t) => (
        <li
          key={t.id}
          onClick={() => {
            dispatch({ type: "HANDLE_DONE", id: t.id });
          }}
          onDoubleClick={() => {
            dispatch({ type: "DELETE_TODO", id: t.id });
          }}
          style={{ textDecoration: t.done ? "line-through" : "none" }}
        >
          {t.task}
        </li>
      ))}
    </div>
  );
}
