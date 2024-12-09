"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { createTodo, deleteTodo, fetchTodos } from "./utils/api";
import { TodoProps } from "./utils/types";

export default function Home() {

  const [task, setTask] = useState("")

  const { 
    data,
    error,
    isLoading,
    refetch: refetchGetTodos
  } = useQuery<TodoProps[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })
  const todos = data ?? []

  const {
    mutate: createTodoMutation,
    isSuccess: isCreateTodoSuccess,
  } = useMutation({
    mutationFn: createTodo,
  })

  const {
    mutate: deleteTodoMutation,
    isSuccess: isDeleteTodoSuccess
  } = useMutation({
    mutationFn: deleteTodo
  })


  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (task.trim() === "") return; 
    const newTodo = { task };
    createTodoMutation(newTodo)
    setTask("")
  }

  const handleDelete = async (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id)
    if (!todoToDelete) return
    deleteTodoMutation(id)
  }

  useEffect(() => {
    if (isCreateTodoSuccess || isDeleteTodoSuccess) {
      refetchGetTodos()
    }
  }, [isCreateTodoSuccess, refetchGetTodos, isDeleteTodoSuccess])


  if (error) {
    return <p>There's an error fetching the data.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
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

          : <p className="text-gray-500 italic text-start text-xs">No todos yet..</p>
        }
      </ul>
    </div>
   </main>
  );
}
