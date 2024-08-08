//dasdhboard last up 24

import CCard from "../components/chart_card";
import Header from "../components/header";
import Card from "../components/card";
import image from "../images/dbg.jpg";
import { Auth } from "../actions/userAction";
export default async function Homepage() {
    await Auth()

    return (
        <div className="container">
            <Header name="foby" />
            <div className="flex flex-row w-full flex-wrap justify-center bg-cover" style={{ backgroundImage: `url(${image.src})` }}>
                <CCard header="TASK COMPLETION" type="bar" data={{ labels: ["expired", "completed"], datas: [1, 5] }} />
                <CCard header="OVER VIEW" type="don" data={{ labels: ["expired", "completed", "pending"], datas: [1, 5, 10] }} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-orange-700"> summary of The tasks</h1>
            <div className="flex flex-row w-full flex-wrap p-3">
                <Card header="Tasks with in 3 days" count={12} />
                <Card header="Today Active tasks" count={2} />
                <Card header="Performance of the month" count={50} type="overall" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-orange-700"> NEXT ACTIVE TASK</h1>
            <div className="flex flex-row w-full font-light text-2xl gap-6 shadow-sm p-10
             bg-gradient-to-r from-red-300 to-zinc-50 dark:bg-gradient-to-r dark:from-slate-400 dark:to-slate-950 dark:text-white">
                <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                <h1>praying a God!</h1>
            </div>
        </div >

    )
}
