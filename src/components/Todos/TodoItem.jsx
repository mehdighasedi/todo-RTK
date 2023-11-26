import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncTodo,
  toggleAsyncTodo,
  toggleTodo,
} from "../../features/todo/todoSlice";

export default function TodoItem({ id, title, completed }) {
  const { loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={() => {
              dispatch(toggleAsyncTodo({ id, completed: !completed }));
            }}
            type="checkbox"
            className="mr-3"
            checked={completed}
          />
          <span>{title}</span>
        </span>
        <button
          onClick={() => {
            dispatch(deleteAsyncTodo({ id }));
          }}
          className="btn btn-danger"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
}
