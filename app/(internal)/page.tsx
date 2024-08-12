//dasdhboard last up 24

import CCard from "../components/chart_card";
import Header from "../components/header";
import Card from "../components/card";
import image from "../images/dbg.jpg";
import { Auth } from "../actions/userAction";
import { getPerforma,taskCount,getOntime,getNext } from "../actions/taskActions";
import { currentuser } from "../actions/userAction";

//grab 
async function Getinfo()
{
    //performance
    const monthfailed=await getPerforma("failed") 
    const monthsuccess=await getPerforma("completed")
    if(monthfailed !=null && monthsuccess!=null)
    {
        var performance=monthsuccess/(monthfailed+monthsuccess)

    } else {
        performance=0;
    }
    //task count 
    var taskcount=await taskCount()
    var weekperforma=await getOntime()
    var nextTask=await getNext()
    var username =(await currentuser()).name

    return {
        taskcount:taskcount,
        performance:performance,
        sessionalTask:weekperforma,
        nexttask:nextTask,
        username:username
    }

}

export default async function Homepage() {
    await Auth()
    const info =await Getinfo()
    return (
        <div className="container">
            <Header name={info.username || "guest"} />
            <div className="flex flex-row w-full flex-wrap justify-center bg-cover" style={{ backgroundImage: `url(${image.src})` }}>
                <CCard header="TASK COMPLETION" type="bar" data={{ labels: ["expired", "completed"], datas: [info.taskcount?.failed, info.taskcount?.completed] }} />
                <CCard header="OVER VIEW" type="don" data={{ labels: ["expired", "completed", "pending"], datas: [info.taskcount?.failed, info.taskcount?.completed,info.taskcount?.penidng] }} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-orange-700"> summary of The tasks</h1>
            <div className="flex flex-row w-full flex-wrap p-3">
                <Card header="Tasks with in 3 days" count={info.sessionalTask?.threecount || 0} />
                <Card header="Today Active tasks" count={info.sessionalTask?.todaycount || 0} />
                <Card header="Performance of the month" count={info.performance *100} type="overall" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-orange-700"> NEXT ACTIVE TASK</h1>
            <div className="flex flex-row w-full font-light text-2xl gap-6 shadow-sm p-10
             bg-gradient-to-r from-red-300 to-zinc-50 dark:bg-gradient-to-r dark:from-slate-400 dark:to-slate-950 dark:text-white">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <h1>{info.nexttask?.name}</h1>
            </div>
        </div >

    )
}
