import { AnimatePresence, motion } from "framer-motion";
import Particles from "../ui/Particles";
import { CircleCheck, CirclePlus } from "lucide-react";


function CheckButton(){
    return(
        <motion.div
            key="check"
            initial={{
              scale: 0,
              rotate: -180,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1.3, 0.95, 1],
              rotate: [-180, 15, -5, 0],
              opacity: 1,
            }}
            exit={{
              scale: 0,
              rotate: 180,
              opacity: 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
        >
            <CircleCheck className="text-blue-500" />
        </motion.div>
    )
}

function PlusButton(){
    return(
        <motion.div
            key="plus"
            initial={{
              scale: 0,
              rotate: 180,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [180, -10, 0],
              opacity: 1,
            }}
            exit={{
              scale: 0,
              rotate: -180,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
        >
            <CirclePlus className="text-foreground" />
        </motion.div>
    )
}

export function SavedButton({ active }: ToggleButtonProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-8 h-8"
      whileTap={{ scale: 0.8 }}
    >
        <Particles active={active} color="bg-chart-4"/>

        <AnimatePresence mode="wait">
            {active ? <CheckButton/> : <PlusButton/>}
        </AnimatePresence>
    </motion.div>
  );
}