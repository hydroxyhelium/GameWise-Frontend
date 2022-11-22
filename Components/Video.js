import React from "react";
import styles from "./Video.module.css"; 

export default function Video(){
    return(
        <video autoPlay muted src={"/main_vid.mp4"} loop className={styles.main_vid}> 
        </video> 
    )
}