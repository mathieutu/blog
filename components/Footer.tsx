import * as React from 'react'

import * as config from '@/lib/config'

import styles from './styles.module.css'

export function FooterImpl() {
  return (
    <footer className={styles.footer}>
      <div>{/* Just to push the copyright notice on right */}</div>
      <div className={styles.copyright}>
        {new Date().getFullYear()} {config.author} CC-BY-SA
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
