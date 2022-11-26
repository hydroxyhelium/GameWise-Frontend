import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Video from '../Components/Video'


import dynamic from 'next/dynamic'


const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.video_wrapper}> 

      <div className={styles.main_content}>
        <div className={styles.main_title}> 
        GameWise
        </div>

        <div className={styles.feature_line_1}> 
        Personalize your gaming experience
        </div> 

        <div className={styles.getting_started_button}> 
        <button className={styles.button_17} onClick={(e)=>{console.log(e)}}>
          Get Started
       </button>
        </div>

      </div>

      {/* <video autoPlay muted src={"/main_vid.mp4"} loop className={styles.main_vid}>
      </video> */}
      <Video/>
      
      </div>
    </div>
  )
}
