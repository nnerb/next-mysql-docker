
import prisma from "@/app/lib/db";
import { CreateTodoRequestBody, TodoProps } from "@/app/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const todos = await prisma.toDo.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(todos)
  } catch (error) {
    console.log("TODO_GET", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(
  req: Request
) {const body = await req.json() as CreateTodoRequestBody;
  try {
    
    const { task } = body;

    if (!task || typeof task !== "string") {
      return new NextResponse("Invalid input", { status: 400 })
    }

    const newTodo = await prisma.toDo.create({
      data: {
        task
      }
    })
    
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.log("TODO_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request
) {
  try {
    const body = await req.json() as TodoProps;
    const { id, task } = body;

    if (!id) return new NextResponse("Todo ID is required ", { status: 400 })
    if (typeof id !== "number") return new NextResponse("Invalid ID format")
    if (!task) return new NextResponse("Task is required", { status: 400 })
    if (typeof task !== "string") return new NextResponse(("Invalid task format"))
  
    const todo = await prisma.toDo.findFirst({
      where: {
        id 
      }
    })

    if (!todo) {
      return new NextResponse("Todo not found", { status: 404 })
    }

    const updatedTodo = await prisma.toDo.update({
      where: {
        id: todo.id
      },
      data: {
        task
      }
    })
    
    return NextResponse.json(updatedTodo, { status: 200 })
  } catch (error) {
    console.log("TODO_PATCH", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}