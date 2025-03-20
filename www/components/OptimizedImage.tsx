import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: Props) {
  // Use Next.js Image for better performance when possible
  if (src.startsWith("/")) {
    // Generate WebP source path from original path
    const webpSrc = src.replace(/\.(png|jpe?g)$/i, ".webp");

    return (
      <div className="next-image-container">
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <Image
            src={src}
            alt={alt}
            className={className}
            width={width || 1200}
            height={height || 630}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </picture>
      </div>
    );
  }

  // Fallback to traditional picture element for external images
  // For external images, still try to use WebP if available
  const webpSrc = src.replace(/\.(png|jpe?g)$/i, ".webp");

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={src} type="image/png" />
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
