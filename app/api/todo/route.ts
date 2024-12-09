
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const { task } = body;

    if (!task || typeof task !== "string") {
      return new NextResponse("Invalid input", { status: 400 })
    }

    const newTodo = await prisma.toDo.create({
      data: {
        task
      }
    })
    
    return NextResponse.json(newTodo)
  } catch (error) {
    console.log("TODO_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(
  req:Request 
) {
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