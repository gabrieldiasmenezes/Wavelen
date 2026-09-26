import { useEffect, useState } from "react"

type ProgressBarProps={
    step:Step
}
export default function ProgressBar({step}:ProgressBarProps){
    const [currentProgress,setCurrentProgress]=useState( step == "genre" ? 50 : 100)
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setCurrentProgress(Math.min(100,Math.max(0,currentProgress)))
        },100)
        return ()=>clearTimeout(timer);
    },[currentProgress])
    return(
        <div className="flex flex-col px-10 gap-2 md:px-20 ">
            <div className="flex w-full px-3 justify-between">
                <p className="text-sm font-semibold">{`Step ${step == "genre" ? 1 : 2} of 2`}</p>
                <p className="text-sm font-semibold">{currentProgress}%</p>
            </div>
            <div className="flex w-full bg-card border border-border rounded-full h-4">
                <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                style={{width:`${currentProgress}%`}}
                />
            </div>
        </div>
    )
}