import { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  };

  return (
    <div className="pb-4">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              id="input-box"
              placeholder="Add your text"
              className="flex-1 px-4 py-3 text-lg text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              title="Set due date"
              className="text-gray-600 hover:text-blue-600"
            >
              <i className="fas fa-calendar-alt text-xl"></i>
            </button>

            <button
              type="button"
              id="addButton"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={(e) => submit(e)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;
