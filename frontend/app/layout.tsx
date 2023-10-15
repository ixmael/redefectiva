'use client'

import { Inter } from 'next/font/google'
import { useTranslation } from 'react-i18next'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'

import './globals.scss'

import styles from './layout.module.scss'

import LangIcon from '@/app/assets/icons/lang'

const inter = Inter({ subsets: ['latin'] })

/*
export const metadata: Metadata = {
  title: 'Red Efectiva',
  description: 'Prueba de frontend que despliega publicaciones y las filtra',
}
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t, i18n } = useTranslation();

  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar expand="lg" className="bg-body-tertiary bg-primary justify-content-between">
          <Container>
            <Navbar.Brand href="/">Red Efectiva</Navbar.Brand>

            <Dropdown className="dropstart">
              <Dropdown.Toggle id="dropdown-basic" className="btn-xl" title={t('domain:language:change')}>
                <LangIcon fill="rgba(255,255,255,0.9)" width="32" height="32" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => i18n.changeLanguage('es')} disabled={i18n.language === 'es'}>
                  Español
                </Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage('en')} disabled={i18n.language === 'en'}>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Navbar>

        <Container className={styles.description}>
          {t('domain:technicaltest:description')}
        </Container>

        <Container>
          {children}
        </Container>
      </body>
    </html>
  )
}
