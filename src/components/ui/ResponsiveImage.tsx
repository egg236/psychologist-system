type ResponsiveImageProps = {
  desktop: string
  mobile: string
  alt: string
  className?: string
  mobileMaxWidth?: number
  loading?: 'lazy' | 'eager'
}

export function ResponsiveImage({
  desktop,
  mobile,
  alt,
  className,
  mobileMaxWidth = 980,
  loading = 'lazy',
}: ResponsiveImageProps) {
  return (
    <picture>
      <source
        media={`(max-width: ${mobileMaxWidth}px)`}
        srcSet={mobile}
        type="image/webp"
      />
      <source srcSet={desktop} type="image/webp" />
      <img
        className={className}
        src={desktop}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={loading === 'eager' ? 'high' : undefined}
      />
    </picture>
  )
}
