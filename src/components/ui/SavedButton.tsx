import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, CirclePlus } from "lucide-react";

const MotionPlus=motion(CirclePlus)
const MotionCheck=motion(CircleCheck)

export default function SavedButton({isActive,onClick}:ActiveButtonProps){
    return(
        <motion.button 
            onClick={onClick} 
            whileTap={{scale:0.8}}
            className="relative flex items-center justify-center p-2"
        >
            <AnimatePresence mode="wait" initial={false}>
                {!isActive ? (
                    <MotionPlus
                        key={"plus"}
                        animate={{rotate:0,scale:1,opacity:1}}
                        exit={{rotate:90,scale:0.5,opacity:0}}

                    />
                ):(
                    <MotionCheck
                        key={"check"}
                        animate={{rotate:0,scale:1,opacity:1}}
                        exit={{rotate:90,scale:0.5,opacity:0}}
                        transition={{duration:0.2,ease:"easeOut"}}
                        className="fill-primary transition-colors ease-out"
                    />
                )}       
            </AnimatePresence>
            
        </motion.button>
    )
}