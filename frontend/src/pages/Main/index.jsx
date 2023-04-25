import React from 'react';
import styles from './Main.module.scss';
import { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export const Main = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = "May, 29, 2023";

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);
    return (
      <>
          <section className={styles.main}>
              <h2 className={styles.date}>22 МАРТА</h2>
              <h1 className={styles.title}>БЛЕСНИ ТАЛАНТОМ <span>KIDS</span></h1>
              <p className={styles.text}>ДО СТАРТА МЕРОПРИЯТИЯ ОСТАЛОСЬ:</p>
              <div className={styles.timer}>
                  <div className="col-4">
                      <div className="box">
                          <p className={styles.day} id="day">{days < 10 ? "0" + days : days}</p>
                          <span className="text">дней</span>
                      </div>
                  </div>
                  <div className="col-4">
                      <div className="box">
                          <p className={styles.hour} id="hour">{hours < 10 ? "0" + hours : hours}</p>
                          <span className="text">часы</span>
                      </div>
                  </div>
                  <div className="col-4">
                      <div className="box">
                          <p className={styles.minute} id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
                          <span className="text">минут</span>
                      </div>
                  </div>
                  <div className="col-4">
                      <div className="box">
                          <p className={styles.seconds} id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
                          <span className="text">секунд</span>
                      </div>
                  </div>
              </div>
              <img className={styles.kidsSing} src={require('../../image/kids-sing.gif')} alt="kids-img"/>
          </section>
          <section className={styles.about}>
              <div className={styles.aboutImg}>
                  <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={70}
                    totalSlides={2}
                  >
                      <Slider>
                          <Slide index={0}>
                              <div className={styles.slideImg1}>

                              </div>
                          </Slide>
                          <Slide index={1}>
                              <div className={styles.slideImg2}>

                              </div>
                          </Slide>
                      </Slider>
                      <ButtonBack className={styles.aboutBtnBack}><svg className={styles.aboutBtnSvg} xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg></ButtonBack>
                      <ButtonNext className={styles.aboutBtnNext}><svg className={styles.aboutBtnSvg} xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg></ButtonNext>
                  </CarouselProvider>
              </div>
              <div className={styles.aboutContent}>
                  <h3 className={styles.aboutContentHeading}>О МЕРОПРИЯТИИ</h3>
                  <p className={styles.aboutContentDescription}>Мы создали чрезвычайно позитивную и непринужденную атмосферу, направленную на развитие ваших навыков, независимо от того, являетесь ли вы абсолютным новичком, пытающимся оторваться от земли, или опытным игроком, стремящимся перейти на следующий уровень. Lorem Ipsum — это просто текст-пустышка полиграфической и наборной индустрии. Lorem Ipsum был стандартным фиктивным текстом в отрасли с 1500-х годов.</p>
              </div>
          </section>
          <section className={styles.organizer}>
              <h3 className={styles.organizerHeading}>ОТВЕТСТВЕННЫЕ КООРДИНАТОРЫ</h3>
              <ul className={styles.organizerList}>
                  <li className={styles.organizerItem}>
                      <p className={styles.organizerText}>ПО ВОПРОСАМ КОНКУРСА</p>
                      <img src={require('../../image/Болат Жанэль.jpg')} alt="" className={styles.organizerImg}/>
                      <h4 className={styles.organizerName}>ЖАНЭЛЬ БОЛАТ</h4>
                      <a className={styles.organizerLink} href="tel:8-747-777-90-06">
                          <img className={styles.organizerSvg} src={require('../../image/phone.svg').default} alt="+7 747 777 90 06"/>
                          +7 747 777 90 06
                      </a>
                  </li>
                  <li className={styles.organizerItem}>
                      <p className={styles.organizerText}>ПО ТЕХНИЧЕСКИМ ВОПРОСАМ</p>
                      <img src={require('../../image/Акбаров Н.М.png')} alt="" className={styles.organizerImg}/>
                      <h4 className={styles.organizerName}>НУРСУЛТАН АКБАРОВ</h4>
                      <a className={styles.organizerLink} href="tel:8-775-153-07-08">
                          <img className={styles.organizerSvg} src={require('../../image/phone.svg').default} alt="+7 775 153 07 08"/>
                          +7 775 153 07 08
                      </a>
                  </li>
              </ul>
          </section>
      </>
    )
}