import { useEffect, useState } from "react";
import API from "../api";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import todoImg from "../assets/images/todo2.png";

function TodoPage() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async (title) => {
    const res = await API.post("/todos", { title, completed: false });
    setTodos([...todos, res.data]);
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    const res = await API.put(`/todos/${id}`, {
      completed: !todo.completed,
    });

    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTodos();

    console.log("todo", todos);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="py-10 px-4 h-full">
        <div className="bg-gray-900 text-white rounded-xl shadow-lg">
          <div className="py-6 px-4 md:px-8">
            <p className="text-3xl font-bold mb-6 flex items-center gap-3">
              <u>To-do-List</u>
              <img src={todoImg} alt="todo" className="w-10 h-10" />
            </p>

            <TodoForm addTodo={addTodo} />

            <hr className="my-6 border-gray-700" />

            <ul className="space-y-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
