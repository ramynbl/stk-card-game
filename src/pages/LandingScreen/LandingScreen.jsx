import Button from "../../components/Button";
import Logo from "../../components/Logo";
import styles from "./LandingScreen.module.css";
import pairsData from "../../data/pairs.json";

// Liste plate des images issues de pairs.json (inspiration + innovation)
const CARD_IMAGES = pairsData.pairs.flatMap((pair) => [
    pair.inspiration.image,
    pair.innovation.image,
]);

// Format : [left, top, width, height, tone, opacity]
const CARDS = [
    // === LIGNE DU HAUT (De gauche à droite) ===
    [-40, -60, 65, 95, "base", 1],
    [60, 0, 55, 85, "dark", 1],
    [140, 15, 60, 95, "alt", 1],
    [220, 35, 70, 85, "base", 1],
    [310, 10, 60, 105, "dark", 1],
    [390, 40, 55, 90, "base", 1],
    [470, -10, 65, 95, "alt", 1],
    [550, 15, 60, 85, "dark", 1],
    [640, 45, 75, 90, "base", 1],
    [720, -5, 55, 100, "dark", 1],
    [800, 10, 60, 85, "base", 1],
    [880, 30, 65, 95, "alt", 1],
    [960, -5, 60, 90, "dark", 1],
    [1040, 25, 70, 85, "base", 1],
    [1120, -15, 55, 100, "dark", 1],
    [1200, 15, 65, 90, "alt", 1],

    // === VIRAGE À DROITE (Descente) ===
    [1260, 100, 60, 95, "base", 1],
    [1270, 200, 65, 90, "dark", 1],
    [1240, 290, 55, 85, "base", 1],

    // === LIGNE DU MILIEU (De droite à gauche) ===
    [1160, 320, 60, 95, "alt", 1],
    [1080, 290, 70, 90, "base", 1],
    [990, 330, 55, 85, "dark", 1],
    [910, 300, 65, 95, "alt", 1],
    [830, 340, 60, 90, "base", 1],
    [740, 320, 75, 105, "dark", 1],
    [660, 350, 55, 85, "base", 1],
    [580, 310, 60, 95, "alt", 1],
    [500, 280, 65, 90, "base", 1],
    [420, 330, 60, 85, "dark", 1],
    [340, 310, 55, 95, "base", 1],
    [260, 290, 65, 90, "alt", 1],
    [180, 340, 60, 100, "dark", 1],
    [100, 320, 55, 85, "base", 1],
    [20, 300, 65, 95, "alt", 1],

    // === VIRAGE À GAUCHE & LIGNE DU BAS (De gauche à droite sous le texte) ===
    [-10, 420, 55, 90, "dark", 1],
    [10, 520, 60, 95, "base", 1],
    [30, 620, 65, 85, "alt", 1],
    [110, 650, 60, 90, "base", 1],
    [190, 620, 55, 85, "dark", 1],
    [280, 670, 70, 95, "alt", 1],
    [360, 640, 65, 90, "base", 1],
    [440, 680, 60, 85, "dark", 1],
    [520, 620, 75, 100, "base", 1],
    [600, 650, 55, 90, "alt", 1],
    [680, 690, 65, 95, "dark", 1],
    [760, 660, 60, 85, "base", 1],
    [840, 630, 55, 90, "alt", 1],
    [920, 670, 65, 85, "dark", 1],
];

function LandingScreen({ onStart }) {
    return (
        <div className={styles.page}>
            <div className={styles.maskWrapper}>
                <div className={styles.cardsLayer}>
                    {CARDS.map(([left, top, width, height, , opacity], i) => (
                        <img
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
                                opacity: opacity !== undefined ? opacity : 1,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.content}>
                <Logo />
                <h1 className={styles.title}>Titre du jeu un peu long</h1>
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
