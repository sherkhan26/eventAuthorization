import React from 'react';
import ReactPlayer from 'react-player';

import styles from './Live.module.scss';

export const Live = () => {
  return (
    <>
      <h1 className={styles.heading}>ТРАНСЛЯЦИЯ</h1>
      <ReactPlayer
        className={styles.video}
        url={`https://www.youtube.com/embed/GswGTgzhYVk`}
        width='100%'
        controls
      />
    </>
  )
}