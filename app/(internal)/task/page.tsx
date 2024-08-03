import Tablebox from "@/app/components/table"
import { Button } from "@/components/ui/button"

//tasks list page
export default function TaskInfo() {
    return (
        <div className="container">
            <h1 className="text-5xl font-bold max-sm:text-3xl text-slate-900 dark:text-white">Tasks</h1>
            <div className="flex flex-row justify-start">
                <Button variant={"outline"} className="text-white font-bold hover:bg-green-500 bg-green-800">New</Button>
            </div>
            <Tablebox />
        </div>
    )
}
