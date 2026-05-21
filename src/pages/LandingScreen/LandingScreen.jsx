import { motion } from "framer-motion";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import styles from "./LandingScreen.module.css";
import pairsData from "../../data/pairs.json";

// Liste plate des images issues de pairs.json (inspiration + innovation)
const CARD_IMAGES = pairsData.pairs.flatMap((pair) => [
    pair.inspiration.image,
    pair.innovation.image,
]);

// Format : [left, top, width, height, tone, opacity] — ratio 7:10 (images 350×500)
const W = 63;
const H = 90;
const CARDS = [
    // === LIGNE DU HAUT (De gauche à droite) ===
    [-40, -60, W, H, "base", 1],
    [60, 0, W, H, "dark", 1],
    [140, 15, W, H, "alt", 1],
    [220, 35, W, H, "base", 1],
    [310, 10, W, H, "dark", 1],
    [390, 40, W, H, "base", 1],
    [470, -10, W, H, "alt", 1],
    [550, 15, W, H, "dark", 1],
    [640, 45, W, H, "base", 1],
    [720, -5, W, H, "dark", 1],
    [800, 10, W, H, "base", 1],
    [880, 30, W, H, "alt", 1],
    [960, -5, W, H, "dark", 1],
    [1040, 25, W, H, "base", 1],
    [1120, -15, W, H, "dark", 1],
    [1200, 15, W, H, "alt", 1],

    // === VIRAGE À DROITE (Descente) ===
    [1260, 100, W, H, "base", 1],
    [1270, 200, W, H, "dark", 1],
    [1240, 290, W, H, "base", 1],

    // === LIGNE DU MILIEU (De droite à gauche) ===
    [1160, 320, W, H, "alt", 1],
    [1080, 290, W, H, "base", 1],
    [990, 330, W, H, "dark", 1],
    [910, 300, W, H, "alt", 1],
    [830, 340, W, H, "base", 1],
    [740, 320, W, H, "dark", 1],
    [660, 350, W, H, "base", 1],
    [580, 310, W, H, "alt", 1],
    [500, 280, W, H, "base", 1],
    [420, 330, W, H, "dark", 1],
    [340, 310, W, H, "base", 1],
    [260, 290, W, H, "alt", 1],
    [180, 340, W, H, "dark", 1],
    [100, 320, W, H, "base", 1],
    [20, 300, W, H, "alt", 1],

    // === VIRAGE À GAUCHE & LIGNE DU BAS (De gauche à droite sous le texte) ===
    [-10, 420, W, H, "dark", 1],
    [10, 520, W, H, "base", 1],
    [30, 620, W, H, "alt", 1],
    [110, 650, W, H, "base", 1],
    [190, 620, W, H, "dark", 1],
    [280, 670, W, H, "alt", 1],
    [360, 640, W, H, "base", 1],
    [440, 680, W, H, "dark", 1],
    [520, 620, W, H, "base", 1],
    [600, 650, W, H, "alt", 1],
    [680, 690, W, H, "dark", 1],
    [760, 660, W, H, "base", 1],
    [840, 630, W, H, "alt", 1],
    [920, 670, W, H, "dark", 1],
];

function LandingScreen({ onStart }) {
    return (
        <div className={styles.page}>
            <div className={styles.maskWrapper}>
                <div className={styles.cardsLayer}>
                    {CARDS.map(([left, top, width, height, , opacity], i) => (
                        <motion.img
                            key={i}
                            src={CARD_IMAGES[i % CARD_IMAGES.length]}
                            alt=""
                            aria-hidden="true"
                            className={styles.card}
                            style={{
                                left: `${left}px`,
                                top: `${top}px`,
                                width: `${width}px`,
                                height: `${height}px`,
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: opacity ?? 1, scale: 1 }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.95,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.content}>
                {/* <Logo /> */}
                <img src="/assets/images/STK-logo.svg" alt="STK" className={styles.logo} />
                <h1>Titre que Noé va trouver</h1>
                <p className={styles.subtitle}>
                    Apprenez en plus sur le biomimétisme avec
                    <br />
                    une expériencel udique wow torp bien
                </p>
                <div className={styles.cta}>
                    <Button onClick={onStart}>Commencer l'exploration</Button>
                </div>
            </div>
        </div>
    );
}

export default LandingScreen;