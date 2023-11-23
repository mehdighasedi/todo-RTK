import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodos } from "../../features/todo/todoSlice";

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    dispatch(addAsyncTodos({ title: value }));
    setValue("");
  };

  return (
    <form className={`form-inline mt-3 mb-4 `} onSubmit={handleSubmit}>
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        autoComplete="off"
        id="name"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-1">
        {loading ? "submitting..." : "submit"}
      </button>
    </form>
  );
};

export default AddTodoForm;
