import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/Todos/AddTodoForm";
import TodoList from "./components/Todos/TodoList";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

function App() {
  const state = useSelector((state) => state.todos);
  console.log(state);
  return (
    <div className="container pt-3">
      <Toaster
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#edd479",
          },
        }}
      />
      <h1 className="text-center">TodoApp with RTK</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
