import { CreateTodoRequestBody, TodoProps } from "./types"

export const fetchTodos = async (): Promise<TodoProps[]> => {
  const res = await fetch("/api/todo", {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    },
  })
  if (!res.ok) {
    console.error("Error fetching todos..")
  }
  return res.json()
}

export const createTodo = async (body: CreateTodoRequestBody) => {
  const res = await fetch("/api/todo", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    console.error("Failed to add todo")
  } 
  return res.json()
}

export const deleteTodo = async (id: number) => {
  const res = await fetch(`/api/todo/${id}`,{
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
  if (!res.ok) {
    console.error("Failed to delete the todo. Response status:", res.status);
  } 

  return res.json()
}