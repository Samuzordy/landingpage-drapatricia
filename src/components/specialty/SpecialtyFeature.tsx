import { site } from "@/content/site";
import { SkinJourney } from "./dermatology/SkinJourney";

/**
 * Optional themed section between "Atuação" and "Quando procurar" — the place for a
 * specialty-specific interaction (skin layers, heart anatomy, treatment stages, body map…).
 *
 * Variants live in their own folder (src/components/specialty/<specialty>/) with their content,
 * CSS and islands. To add one: create the folder, add its id to `SpecialtyVariant`
 * (src/types/content.ts) and a `case` below. Render it with `bandProps("specialtyFeature")`
 * and `id="destaque"` so the nav and the depth gradient pick it up.
 */
export function SpecialtyFeature() {
  switch (site.specialtyFeature.variant) {
    case "dermatology-skin-journey":
      return <SkinJourney />;
    case "none":
      return null;
  }
}
