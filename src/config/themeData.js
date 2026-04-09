import jan from '../assets/jan.png';
import feb from '../assets/feb.png';
import mar from '../assets/mar.png';
import apr from '../assets/apr.png';
import jul from '../assets/jul.png';
import sep from '../assets/sep.png';

export const themeData = [
  // 0: January - Winter Alpine (Monochromatic minimalism)
  {
    name: "Winter Alpine",
    imgSrc: jan, // Local generated image
    palette: {
      base: "#8CBEE0",
      hover: "#76A6C6",
      light: "rgba(140, 190, 224, 0.15)",
      medium: "rgba(140, 190, 224, 0.25)",
      glow: "rgba(140, 190, 224, 0.4)",
    }
  },
  // 1: February - Brutalist Ice (High contrast architecture)
  {
    name: "Brutalist Ice",
    imgSrc: feb, // Local generated image
    palette: {
      base: "#7C8CA1",
      hover: "#5E6C7D",
      light: "rgba(124, 140, 161, 0.15)",
      medium: "rgba(124, 140, 161, 0.25)",
      glow: "rgba(124, 140, 161, 0.4)",
    }
  },
  // 2: March - Misty Forest (Dark moody slate-greens)
  {
    name: "Misty Forest",
    imgSrc: mar, // Local generated image
    palette: {
      base: "#4A6B53",
      hover: "#344D3A",
      light: "rgba(74, 107, 83, 0.15)",
      medium: "rgba(74, 107, 83, 0.25)",
      glow: "rgba(74, 107, 83, 0.4)",
    }
  },
  // 3: April - Dark Glass Rain (Condensation, muted tones)
  {
    name: "Dark Condensation",
    imgSrc: apr, // Replaced stock image
    palette: {
      base: "#566D80",
      hover: "#3F5161",
      light: "rgba(86, 109, 128, 0.15)",
      medium: "rgba(86, 109, 128, 0.25)",
      glow: "rgba(86, 109, 128, 0.4)",
    }
  },
  // 4: May - Deep Fern Texture (Macro slate-greens)
  {
    name: "Deep Flora",
    imgSrc: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop", // Dark leaves macro
    palette: {
      base: "#224A30",
      hover: "#152E1D",
      light: "rgba(34, 74, 48, 0.15)",
      medium: "rgba(34, 74, 48, 0.25)",
      glow: "rgba(34, 74, 48, 0.4)",
    }
  },
  // 5: June - Architectural Shadows (Harsh light, geometric)
  {
    name: "Brutalist Shadows",
    imgSrc: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop", // Concrete architecture
    palette: {
      base: "#9BA2A6",
      hover: "#727B80",
      light: "rgba(155, 162, 166, 0.15)",
      medium: "rgba(155, 162, 166, 0.25)",
      glow: "rgba(155, 162, 166, 0.4)",
    }
  },
  // 6: July - Arid Geometry (Desert shadow scale)
  {
    name: "Arid Dunes",
    imgSrc: jul, // Local generated image
    palette: {
      base: "#C77B4B",
      hover: "#9E5D34",
      light: "rgba(199, 123, 75, 0.15)",
      medium: "rgba(199, 123, 75, 0.25)",
      glow: "rgba(199, 123, 75, 0.4)",
    }
  },
  // 7: August - Deep Abyss (Ocean blues, scale)
  {
    name: "Deep Ocean",
    imgSrc: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1200&auto=format&fit=crop", // Dark minimal ocean waves
    palette: {
      base: "#1B4D89",
      hover: "#11325A",
      light: "rgba(27, 77, 137, 0.15)",
      medium: "rgba(27, 77, 137, 0.25)",
      glow: "rgba(27, 77, 137, 0.4)",
    }
  },
  // 8: September - Autumn Rust (Oxidized texture)
  {
    name: "Oxidized Steel",
    imgSrc: sep, // Local fallback image
    palette: {
      base: "#B34A29",
      hover: "#87351A",
      light: "rgba(179, 74, 41, 0.15)",
      medium: "rgba(179, 74, 41, 0.25)",
      glow: "rgba(179, 74, 41, 0.4)",
    }
  },
  // 9: October - Foggy Pass (Decaying cinematic landscape)
  {
    name: "Foggy Pass",
    imgSrc: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", // Dark moody mountains
    palette: {
      base: "#8C715A",
      hover: "#614E3E",
      light: "rgba(140, 113, 90, 0.15)",
      medium: "rgba(140, 113, 90, 0.25)",
      glow: "rgba(140, 113, 90, 0.4)",
    }
  },
  // 10: November - Decaying Architecture (Dark geometry)
  {
    name: "Decay Geometry",
    imgSrc: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop", // Dark minimal
    palette: {
      base: "#504E54",
      hover: "#333236",
      light: "rgba(80, 78, 84, 0.15)",
      medium: "rgba(80, 78, 84, 0.25)",
      glow: "rgba(80, 78, 84, 0.4)",
    }
  },
  // 11: December - The Original Alpine (The neon blue)
  {
    name: "Alpine Neon",
    imgSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", // Classic dark mountain
    palette: {
      base: "#0047FF",
      hover: "#0037CC",
      light: "rgba(0, 71, 255, 0.15)",
      medium: "rgba(0, 71, 255, 0.25)",
      glow: "rgba(0, 71, 255, 0.4)",
    }
  }
];
