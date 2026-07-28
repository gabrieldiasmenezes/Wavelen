import { AnimatePresence, motion } from "framer-motion";

type ColorProps={
    color:string
}

const PARTICLES = 8
const DISTANCE =20

function Particle({color}:ColorProps){
    return(
        [...Array(PARTICLES)].map((_, i) => {
            const angle = (i * 360) / PARTICLES;
            const x = Math.cos((angle * Math.PI) / 180) * DISTANCE
            const y = Math.sin((angle * Math.PI) / 180) * DISTANCE
            return (
                <motion.span
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full ${color}`}
                initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 0,
                }}
                animate={{
                    x,
                    y,
                    opacity: 0,
                    scale: [0, 1.5, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
                />
            );
        })
    )
}

type ParticleProps= ToggleButtonProps & ColorProps

export default function Particles({active,color}:ParticleProps){

    return(
        <AnimatePresence>
            {active && (
            <>
                <Particle color={color}/>

                {/* Onda */}
                <motion.div
                className={`absolute w-7 h-7 rounded-full border-2 ${color}`}
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{
                    scale: 2.2,
                    opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                />
            </>
            )}
        </AnimatePresence>
    )
}