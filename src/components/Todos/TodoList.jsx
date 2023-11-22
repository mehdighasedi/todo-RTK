import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todo);
  return (
    <div>
      <h2>TodoList</h2>
      <ul className="list-group">
        {!todos.length ? (
          <h6>There is No Todo`s Yet</h6>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
        )}
      </ul>
    </div>
  );
};
export default TodoList;
