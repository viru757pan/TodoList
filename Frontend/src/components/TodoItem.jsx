import { Badge, BadgeCheck } from "lucide-react";

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  console.log("Topoo", todo);

  return (
    <div className="flex items-center justify-between p-2 border rounded mb-2">
      <div className="flex items-center gap-3 p-2">
        {/* Toggle icon */}
        <div onClick={() => toggleTodo(todo._id)} className="cursor-pointer">
          {todo["completed"] ? <BadgeCheck /> : <Badge />}
        </div>

        {/* Title */}
        <span
          className={`cursor-pointer ${
            todo["completed"] ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.title}
        </span>
      </div>

      {/* Delete */}
      <button onClick={() => deleteTodo(todo._id)} className="text-red-500">
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
