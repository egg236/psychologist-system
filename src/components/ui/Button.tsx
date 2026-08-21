import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(' ')

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest
    return (
      <a className={classes} href={href} {...linkRest}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as ButtonAsButton
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
