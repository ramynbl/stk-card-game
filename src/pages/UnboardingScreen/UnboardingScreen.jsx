import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import styles from "./UnboardingScreen.module.css";

const SLIDES = [
    {
        eyebrow: null,
        showLogo: true,
        body: "Apprenez en plus sur le biomimétisme avec une expérience ludique et interactive.",
    },
    {
        eyebrow: "Comment faire le lien",
        showLogo: false,
        body: "Associez chaque carte de la nature à son innovation pour découvrir le lien qui les unit.",
    },
    {
        eyebrow: "Je ne sais pas ?",
        showLogo: false,
        body: "Des indices sont disponibles à tout moment pour vous guider si vous êtes bloqué.",
    },
];

function UnboardingScreen({ onComplete }) {
    const [index, setIndex] = useState(0);
    const [exiting, setExiting] = useState(false);
    const isLast = index === SLIDES.length - 1;
    const slide = SLIDES[index];

    const goNext = useCallback(() => {
        if (!isLast) {
            setIndex(i => i + 1);
        } else {
            setExiting(true);
        }
    }, [isLast]);

    return (
        <div className={styles.page}>
            <div className={styles.inner}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        className={styles.slide}
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className={styles.videoPlaceholder} />

                        <div className={styles.textBlock}>
                            {slide.eyebrow && (
                                <p className={styles.eyebrow}>{slide.eyebrow}</p>
                            )}
                            {slide.showLogo && (
                                <img
                                    src="/assets/images/STK-logo.svg"
                                    alt="STK"
                                    className={styles.logo}
                                />
                            )}
                            <p className={styles.body}>{slide.body}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className={styles.footer}>
                    <Button onClick={goNext} disabled={exiting}>
                        {isLast ? "Commencer" : "Suivant"}
                    </Button>
                    <div className={styles.dots}>
                        {SLIDES.map((_, i) => (
                            <span
                                key={i}
                                className={`${styles.dot} ${i === index ? styles.dotActive : i < index ? styles.dotDone : ""}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {exiting && (
                    <motion.div
                        className={styles.fadeOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        onAnimationComplete={onComplete}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default UnboardingScreen;
