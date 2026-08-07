import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HeartButton({isActive,onClick}:ActiveButtonProps){
    const particles = [
        { x: 0, y: -24 }, 
        { x: 20, y: -12 },  
        { x: 20, y: 12 },   
        { x: 0, y: 24 },    
        { x: -20, y: 12 },  
        { x: -20, y: -12 }, 
    ];
    return(
        <motion.button 
            onClick={onClick} 
            whileTap={{scale:0.8}}
            animate={{scale: isActive ? [1,1.4,1] : 1}}
            transition={{duration:0.5,ease:"easeOut"}}
            className="relative flex items-center justify-center p-2"
        >
            
            <Heart
                className={`${isActive ? "fill-accent text-accent" : ""} transition-colors ease-out`}
            />
            <AnimatePresence>
                {isActive && particles.map((particle,i)=>(
                    <motion.span
                    key={i}
                    initial={{x:0,y:0}}
                    animate={{
                        x:particle.x,
                        y:particle.y,
                        scale:[0,1,0],
                        opacity:[1,1,0]
                    }}
                    exit={{opacity:0}}
                    transition={{duration:0.6,ease:"easeOut"}}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent pointer-events-none"
                    >

                    </motion.span>
                ))}
            </AnimatePresence>        
        </motion.button>
    )
}