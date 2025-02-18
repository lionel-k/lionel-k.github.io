import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export function OptimizedImage({ src, alt, className, width, height }: Props) {
  const webpSrc = src.replace(/\.png$/, ".webp");

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
      />
    </picture>
  );
}
