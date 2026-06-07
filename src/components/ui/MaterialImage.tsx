import Image from "next/image";
import { cn } from "@/lib/utils";

type MaterialImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function MaterialImage({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw"
}: MaterialImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[var(--surface-muted)]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
