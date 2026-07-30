import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Particles from "../ui/Particles";


export function LikedButton({ active }: ToggleButtonProps) {
    const heartAnimate= active ? {
        scale: [1, 0.8, 1.4, 1.15, 1],
        rotate: [0, -8, 8, -4, 0],
    } : {
        scale: 1,
        rotate: 0,
    }

    const heartStyle=`transition-colors duration-200 ${
        active
        ? "fill-chart-2 text-chart-2"
        : "text-foreground"
    }`

    return (
        <motion.div
        className="relative flex items-center justify-center w-8 h-8"
        whileTap={{ scale: 0.8 }}
        >
            <Particles active={active} color="bg-chart-2"/>

        {/* Coração */}
        <motion.div
            animate={heartAnimate}
            transition={{
            duration: 0.55,
            ease: "easeOut",
            }}
        >
            <Heart
            className={heartStyle}
            />
        </motion.div>
        </motion.div>
    );
}
