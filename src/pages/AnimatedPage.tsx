import { motion } from "motion/react"

interface AnimatedPageProps {
    children: React.ReactNode;
}

export const AnimatedPage = ({ children }: AnimatedPageProps) => {
    const animations = {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
    }

    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >
            {children}
        </motion.div>
    )
}
