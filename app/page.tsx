"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { createTodo, deleteTodo, fetchTodos } from "./utils/api";
import { TodoProps } from "./utils/types";

export default function Home() {

  const [task, setTask] = useState("")

    const { 
      data: fetchTodo,
      error: isFetchTodosError,
      isLoading: isFetchTodosLoading,
      refetch: refetchGetTodos
    } = useQuery<TodoProps[]>({
      queryKey: ['todos'],
      queryFn: fetchTodos
    })
    const todos = fetchTodo ?? []

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


  if (isFetchTodosError) {
    return ( 
      <p className="text-xl text-black bg-red-300 py-2 px-4 text-center">
        There's an error fetching the data.
      </p>
    )
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
          className={`
            py-1 px-3 ring-1 ring-white rounded-md duration-300
            hover:bg-gray-800 ${isFetchTodosLoading ? "bg-gray-600 cursor-not-allowed" : ""}
          `} 
          type="submit"
          disabled={isFetchTodosLoading}
          >
          Add task
        </button>
      </form>
      <ul className="text-center flex flex-col gap-2">
        {isFetchTodosLoading && <p className="text-gray-500 italic text-start text-xs">Loading..</p>}
        {!isFetchTodosLoading && todos.length === 0 && (
          <p className="text-gray-500 italic text-start text-xs">No todos yet..</p>
        )}
        { (!isFetchTodosLoading && todos.length > 0) && 
          todos.map((todo, index) => (
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
        }
        
      </ul>
    </div>
   </main>
  );
}
