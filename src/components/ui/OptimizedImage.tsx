// Optimized Image Component with best practices for performance
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<NextImageProps, 'quality' | 'loading' | 'placeholder'> {
    quality?: number;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
    blur?: boolean;
}

export function OptimizedImage({
    quality = 85,
    loading = 'lazy',
    priority = false,
    blur = true,
    ...props
}: OptimizedImageProps) {
    return (
        <NextImage
            {...props}
            quality={quality}
            loading={priority ? 'eager' : loading}
            priority={priority}
            placeholder={blur && !props.src.toString().endsWith('.svg') ? 'blur' : 'empty'}
            blurDataURL={
                blur && !props.src.toString().endsWith('.svg')
                    ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
                    : undefined
            }
        />
    );
}

// Pre-configured variants for common use cases

export function HeroImage(props: Omit<OptimizedImageProps, 'priority' | 'quality'>) {
    return <OptimizedImage {...props} priority quality={90} />;
}

export function CardImage(props: Omit<OptimizedImageProps, 'quality'>) {
    return <OptimizedImage {...props} quality={80} />;
}

export function ThumbnailImage(props: Omit<OptimizedImageProps, 'quality'>) {
    return <OptimizedImage {...props} quality={75} />;
}

export function IconImage(props: Omit<OptimizedImageProps, 'quality' | 'blur'>) {
    return <OptimizedImage {...props} quality={90} blur={false} />;
}
