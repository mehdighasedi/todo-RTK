import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/Todos/AddTodoForm";
import TodoList from "./components/Todos/TodoList";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state.todo);
  console.log(state);
  return (
    <div className="container pt-3">
      <h1 className="text-center">TodoApp with RTK</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;