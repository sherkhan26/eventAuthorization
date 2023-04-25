import React from 'react';
import styles from "../Footer/Footer.module.scss";
import Container from "@mui/material/Container";

export const Footer = () => {
  return (
    <footer className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <p className={styles.description}>ТОО «KAP Technology»
            <span> создает самые современные решения для цифровизации Казатомпрома и является динамично развивающейся ИТ-компанией</span> <br/>
            &copy;2023 <a className={styles.logoLink} target="_blank" href="https://kaptechnology.kazatomprom.kz/ru">ТОО «KAP Technology»</a>
          </p>
        </div>
      </Container>
    </footer>
  )
}