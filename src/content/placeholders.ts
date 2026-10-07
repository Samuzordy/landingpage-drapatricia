/**
 * PROVISIONAL visual assets used while the client's photos are missing.
 * Neutral, generated illustrations — never a photo that could pass as Dra. Valéria or as a
 * clinical image. TODO(cliente): replace with the real files listed in docs/ROTEIRO_PROMPTS.md
 * (retrato-hero.png and textura-pele-detalhe.jpg) and drop this module.
 */
import type { ImageAsset } from "@/types/content";

export const portraitPlaceholder: ImageAsset = {
  src: "/images/placeholders/retrato-provisorio.svg",
  alt: "Espaço reservado para o retrato da Dra. Valéria (imagem provisória)",
  width: 800,
  height: 1000,
};

export const skinDetailPlaceholder: ImageAsset = {
  src: "/images/placeholders/pele-detalhe-ilustrativa.svg",
  // Revealed by the lens only; decorative, so it stays out of the accessibility tree.
  alt: "",
  width: 800,
  height: 1000,
};
