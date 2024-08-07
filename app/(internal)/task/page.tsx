import TaskBox from "@/app/components/Taskbox"
import { Button } from "@/components/ui/button"
import { tableSchema } from "@/app/actions/schemas"
import { getTasks, getType } from "@/app/actions/taskActions"
import { Auth } from "@/app/actions/userAction"
//tasks list page
export default async function TaskInfo() {

    //mak-au
    await Auth()
    let tasks = await getTasks()
    if (!tasks)
        tasks = []
    let active = await getType("pending")
    if (!active)
        active = []

    return (
        <div className="container">
            <h1 className="text-5xl font-bold max-sm:text-3xl text-slate-900 dark:text-white">Tasks</h1>
            <TaskBox alltask={tasks} activetask={active} />
        </div>
    )
}
