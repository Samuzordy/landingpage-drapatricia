import type { CSSProperties } from "react";
import type { ImageAsset } from "@/types/content";

/**
 * Non-destructive crop for photos that carry captions, logos or text around the subject
 * (e.g. Instagram posts): the original file is untouched. A box is scaled and offset inside the
 * frame (which has overflow: hidden) and the `fill` image covers that box, so only the chosen
 * region of the photo is visible.
 *
 * `crop` (fractions of the source) gives x, y and width; the height follows from the frame's
 * aspect ratio, so the frame keeps its layout proportions and nothing is distorted.
 */
export function cropBoxStyle(asset: ImageAsset, frameAspect: number): CSSProperties | undefined {
  const crop = asset.crop;
  if (!crop) return undefined;
  const height = (crop.width * asset.width) / frameAspect / asset.height;
  return {
    position: "absolute",
    width: `${100 / crop.width}%`,
    height: `${100 / height}%`,
    left: `${(-crop.x / crop.width) * 100}%`,
    top: `${(-crop.y / height) * 100}%`,
  };
}

/** How much wider than its frame a cropped image renders (for next/image `sizes`). */
export function cropScale(asset: ImageAsset): number {
  return asset.crop ? 1 / asset.crop.width : 1;
}
