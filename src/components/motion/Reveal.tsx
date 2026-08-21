import type { HTMLAttributes, ReactNode } from 'react'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import styles from './Reveal.module.css'

type RevealProps = {
  children?: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section' | 'li'
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>

export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const [ref, visible] = useInViewOnce<HTMLElement>()
  const classes = [styles.reveal, visible ? styles.visible : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
