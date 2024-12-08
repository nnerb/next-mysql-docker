"use client"

import { FormEvent, useState } from "react";

export default function Home() {

  const todosData = [
    { id: 1, task: "task 1", complete: false }, 
    { id: 2, task: "task 2", complete: false }, 
    { id: 3, task: "task 3", complete: false }, 
  ]

  const [task, setTask] = useState("")
  const [todos, setTodos] = useState(todosData)

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page

    if (task.trim() === "") return; // Avoid adding empty tasks

    const newTodo = {
      id: todos.length + 1,
      task,
      complete: false,
    };

    console.log(([...todos, newTodo]))
    setTodos([...todos, newTodo]); // Add the new todo to the list
    setTask(""); // Clear the input field
  };

  return (
   <main className="flex flex-col items-center border border-blue-200 mx-auto max-w-[350px] mt-10 rounded-lg">
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-4xl">TO DO:</h1>
      <form className="flex gap-4" onSubmit={handleAddTodo}>
        <input
          type="text"
          onChange={(e) => setTask(e.target.value) }
          className="
            text-black text-xs py-1 px-2 
             ring-1 ring-slate-500  outline-0
             focus:ring-slate-600 rounded-md
          "
          value={task}
          name="task"
        />
        <button 
          className="
            py-1 px-3 ring-1 ring-white rounded-md duration-300
            hover:bg-gray-800
          " 
          type="submit"
          >
          Add task
        </button>
      </form>
      <ul className="text-center">

        { todos.length > 0 
          ? todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-1"
            >
              <p>- {todo.task}</p>
            </li>
          )) 

          : <p>No todos yet..</p>
        }
      </ul>
    </div>
   </main>
  );
}
