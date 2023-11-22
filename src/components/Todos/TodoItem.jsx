import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../features/todo/todoSlice";

export default function TodoItem({ id, title, completed }) {
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={() => {
              dispatch(toggleTodo({ id }));
            }}
            type="checkbox"
            className="mr-3"
            checked={completed}
          />
          <span>{title}</span>
        </span>
        <button
          onClick={() => {
            dispatch(deleteTodo({ id }));
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
