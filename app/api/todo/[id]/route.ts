import prisma from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params } : { params: Promise<{ id: string }>}
){

  try {
    const { id } = await params
    const parseId = parseInt(id)

    if (!parseId) {
      return new NextResponse("Todo ID is required", { status: 400 })
    }

    const taskToDelete = await prisma.toDo.delete({
      where: {
        id: parseId
      }
    })

    return NextResponse.json(taskToDelete);

  } catch (error) {
    console.log("[TODO_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500})
  }
}