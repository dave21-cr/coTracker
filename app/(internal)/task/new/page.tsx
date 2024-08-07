import { getServerSession } from "next-auth";
import Taskform from "./taskform";
import {getUser_,currentuser,Auth} from "@/app/actions/userAction";
import { TaskSchema } from "@/app/actions/schemas";
import {z} from "zod"
import { create as TCreate}   from "@/app/actions/taskActions";
import { redirect } from "next/navigation";

export default async function NewTask() {
  await Auth()
  return (
    <main className="flex w-full h-full items-center justify-center p-10 bg-gradient-to-r from-slate-50 to-slate-300">
      <div className="flex flex-col items-start justify-start shadow-sm shadow-black bg-slate-200
       w-[560px] h-[250px] max-sm:w-full max-sm:h-[300px]">
        <Taskform />
      </div>
    </main>
  )
}
