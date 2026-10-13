import Image from "next/image";
import { cropBoxStyle } from "@/lib/image";
import type { ImageAsset } from "@/types/content";

type CroppedImageProps = {
  asset: ImageAsset;
  /** Aspect ratio (width / height) of the frame the image fills. */
  frameAspect: number;
  /** `sizes` for the frame; scaled automatically when the asset is cropped. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Multiplies every width in a `sizes` string (vw, rem, px) by `factor`. */
function scaleSizes(sizes: string, factor: number) {
  if (factor === 1) return sizes;
  return sizes.replace(
    /(\d+(?:\.\d+)?)(vw|rem|px)(?=\s*(,|$))/g,
    (_, n: string, unit: string) => `${Math.ceil(Number(n) * factor)}${unit}`,
  );
}

/**
 * next/image filling its (overflow-hidden) frame, with an optional non-destructive crop
 * (asset.crop) or focal point (asset.objectPosition). Pure component — usable from Server and
 * Client Components. Lazy by default; pass `priority` only for the LCP image (Hero).
 */
export function CroppedImage({
  asset,
  frameAspect,
  sizes,
  priority,
  className = "",
}: CroppedImageProps) {
  const box = cropBoxStyle(asset, frameAspect);
  const factor = asset.crop ? 1 / asset.crop.width : 1;
  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      priority={priority}
      sizes={scaleSizes(sizes, factor)}
      unoptimized={asset.src.endsWith(".svg")}
      // object-position only matters without a crop box (the box already frames the subject).
      style={!box && asset.objectPosition ? { objectPosition: asset.objectPosition } : undefined}
      className={`object-cover ${className}`}
    />
  );
  return box ? <div style={box}>{image}</div> : image;
}
