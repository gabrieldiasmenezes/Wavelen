import { motion } from "framer-motion";

type SoundWaveProps={
  barStyle:string,
}
export default function SoundWave({barStyle}:SoundWaveProps) {

  const bars = [
    { min: 0.2, max: 0.5 },
    { min: 0.3, max: 0.8 },
    { min: 0.2, max: 1.0 }, 
    { min: 0.3, max: 0.7 },
    { min: 0.2, max: 0.4 },
    { min: 0.3, max: 0.6 },
    { min: 0.2, max: 0.9 },
  ];

  return (
    <div className="flex gap-1.5 items-center justify-center h-8 w-30">
      {bars.map((config, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: config.min }}
            animate={{ scaleY: [config.min, config.max, config.min] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 0.6 + i * 0.15, 
              ease: "easeInOut",
              delay: i * 0.1, 
            }}
            className={`w-1 h-full rounded-full origin-center ${barStyle}`}
          />
      ))}
    </div>
  );
}