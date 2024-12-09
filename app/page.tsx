"use client"

import { FormEvent, useEffect, useState } from "react";

interface TodoProps {
  id: number;
  task: string;
} 


export default function Home() {

  const [task, setTask] = useState("")
  const [todos, setTodos] = useState<TodoProps[] | []>([])

  useEffect(() => {
    const fetchTodos =  async() => {
      try {
        const res = await fetch("/api/todo", {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          },
        })
        if (res.ok) {
          const data = await res.json()
          setTodos(data)
        } else {
          console.log("Error fetching todos..")
        }
      } catch (error) { 
        console.error("Error fetching todos..", error)
      }
    }
    fetchTodos()
  },[])

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

  if (task.trim() === "") return; 

  try {
    const newTodo = { task };

    const res = await fetch("/api/todo", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(newTodo)
    })

    console.log(JSON.stringify(newTodo))

    if (res.ok) {
      const data = await res.json()
      setTodos([...todos, data]);
      setTask("");
    } else {
      console.log("Failed to add todo")
    }
  } catch (error) {
    console.log("Failed to add todo", error)
  }
  };

  const handleDelete = async (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id)
    if (!todoToDelete) return

    try {
      const res = await fetch(`/api/todo/${id}`,{
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
      if (res.ok) {
        setTodos(prev => prev.filter(todo => todo.id !== id))
      } else {
        console.error("Failed to delete the todo. Response status:", res.status);
      }
    } catch (error) {
      console.error("Something went wrong", error)
    }

  }


  return (
   <main className="flex flex-col items-center border border-blue-00 mx-auto max-w-[350px] mt-10 rounded-lg">
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-4xl">
        TO DO:
      </h1>
      <form className="flex gap-4" onSubmit={handleAddTodo} autoComplete="off">
        <input
          placeholder="Type your todo here..."
          type="text"
          onChange={(e) => setTask(e.target.value)}
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
      <ul className="text-center flex flex-col gap-2">
        { todos.length > 0 
          ? todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center gap-1 w-full"
            >
              <p>- {todo.task}</p>
              <button 
                className="
                  ml-auto py-1 px-3 ring-1 ring-white rounded-md duration-300
                hover:bg-red-800 text-sm
                "
                onClick={() => handleDelete(todo.id)}
                >
                Delete
              </button>
            </li>
          )) 

          : <p>Loading..</p>
        }
      </ul>
    </div>
   </main>
  );
}
