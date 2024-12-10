"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "./utils/api";
import { TodoProps } from "./utils/types";
import Button from "./components/button";

export default function Home() {

  const [task, setTask] = useState("")
  const [idToEdit, setIdToEdit] = useState<number | null>(null)

    const { 
      data: todos = [],
      error: isFetchTodosError,
      isLoading: isFetchTodosLoading,
      refetch: refetchGetTodos
    } = useQuery<TodoProps[]>({
      queryKey: ['todos'],
      queryFn: fetchTodos
    })

  const {
    mutate: createTodoMutation,
    isPending: isCreateTodoPending
  } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => refetchGetTodos()
  })

  const {
    mutate: updateTodoMutation,
    isPending: isUpdateTodoPending
  } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      setTask("")
      setIdToEdit(null)
      refetchGetTodos()
    }
  })

  const {
    mutate: deleteTodoMutation,
    isPending: isDeleteTodoPending
  } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => refetchGetTodos()
  })

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (task.trim() === "") return; 

    if (idToEdit) {
      updateTodoMutation({ id: idToEdit, task })
      return
    }
    createTodoMutation({ task })
    setTask("")
    return 
  }

  const handleDelete = async (id: number) => {
    const todoToDelete = todos.find(todo => todo.id === id)
    if (!todoToDelete) return
    return deleteTodoMutation(id)
  }

  const handleEdit = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id) 
    if (!todoToEdit) return  
    setTask(todoToEdit.task)
    setIdToEdit(todoToEdit.id)
    return
  }

  if (isFetchTodosError) {
    return ( 
      <p className="text-xl text-black bg-red-300 py-2 px-4 text-center">
        There's an error fetching the data.
      </p>
    )
  }

  const isLoadingOrPending = isFetchTodosLoading || isCreateTodoPending || isDeleteTodoPending || isUpdateTodoPending
 
  return (
   <main className="grid place-items-center mt-10 w-full">
    <div className="p-5 flex flex-col gap-5 border rounded-lg">
      <h1 className="text-4xl">
        TO DO:
      </h1>
      <form className="flex gap-4" onSubmit={handleAddTodo} autoComplete="off">
        <input
          placeholder="Type your todo here..."
          type="text"
          disabled={isLoadingOrPending}
          onChange={(e) => setTask(e.target.value)}
          className="
            text-black text-xs py-1 px-2 
             ring-1 ring-slate-500  outline-0
             focus:ring-slate-400 rounded-md
          "
          value={task}
          name="task"
        />
         {idToEdit ? (
          <div className="flex items-center gap-1">
            <Button
              isLoading={isUpdateTodoPending}
              onClick={() => {
                setIdToEdit(null)
                setTask('')
                return
              }}
              color="red"
              type="button"
            >
              Cancel
            </Button>
            <Button
              isLoading={isUpdateTodoPending}
              color="blue"
              type="submit"
            >
              Save changes
            </Button>
          </div>
         )
          : (
          <Button
            isLoading={isLoadingOrPending}
            color="gray"
            type="submit"
          >
           Add task
          </Button>
        )
       }
      </form>
      {/* <button onClick={() => fetchTodos}>click me</button> */}
      <ul className="text-center flex flex-col gap-2">
        {isFetchTodosLoading && <p className="text-gray-500 italic text-start text-xs">Fetching todos..</p>}
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
             {!idToEdit && (
              <div className="ml-auto flex items-center gap-2">
                <Button
                  isLoading={isLoadingOrPending}
                  onClick={() => handleEdit(todo.id)}
                  color="green"
                  type="submit"
                >
                  Edit
                </Button>
                <Button
                  isLoading={isLoadingOrPending}
                  onClick={() => handleDelete(todo.id)}
                  color="red"
                  type="submit"
                >
                  Delete
                </Button>
              </div>
            )}
            </li>
          )) 
        }
        
      </ul>
    </div>
   </main>
  );
}
