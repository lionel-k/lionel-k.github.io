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
    // For static export, we'll use a simpler approach
    return (
      <div className="next-image-container">
        <picture>
          <img
            src={src}
            alt={alt}
            className={className}
            width={width || 1200}
            height={height || 630}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            style={{
              contentVisibility: priority ? "auto" : undefined,
              display: "block",
            }}
          />
        </picture>
      </div>
    );
  }

  // Fallback to traditional picture element for external images
  return (
    <picture>
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
