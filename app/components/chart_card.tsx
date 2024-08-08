//chart card  
"use client"
import { Bar, Doughnut } from "react-chartjs-2"
import "../globals.css"
import { Chart as Chartjs, Legend, CategoryScale, Title, BarElement, LinearScale,ArcElement } from "chart.js"
import { Inter } from "next/font/google"

//register chart ele
Chartjs.register(Legend, CategoryScale, Title, BarElement, LinearScale,ArcElement)

//card prop 
interface cardprop {
    header: string,
    data: {
        labels: string[],
        datas: any[],
    },
    type:string
}

//fo
const inter = Inter({
    subsets: ["latin"]
})


export default function CCard(detail: cardprop) {

    return (
        <div className="bg-green-200 dark:bg-black dark:text-white bg= w-1/3 max-sm:w-full m-5 flex flex-col
         items-center shadow-md">
            <h1 className={"text-3xl font-bold" + inter.className}>{detail.header}</h1>
            {(detail.type == "bar") &&
                <Bar data={{
                    labels: detail.data.labels,
                    datasets: [{
                        label: "number of tasks",
                        backgroundColor: ["rgb(255,0,0)", "rgb(0,255,0)"],
                        borderColor: ["rgb(0,0,255)"],
                        data: detail.data.datas,
                    }]
                }}></Bar>
            }

            {(detail.type == "don") &&
                <Doughnut data={{
                    labels: detail.data.labels,
                    datasets: [{
                        label: "number of tasks",
                        backgroundColor: ["rgb(255,0,0)", "rgb(0,255,0)","rgb(0,0,255)"],
                        borderColor: ["rgb(0,0,255)"],
                        data: detail.data.datas,
                    }]
                }}></Doughnut>
            }
        </div>
    )
}