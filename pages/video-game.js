import Head from 'next/head'
import Video from '../Components/Video'

import styles from '../styles/video-game.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { convertstring } from '../Components/helper'
import VideoGameComponent from '../Components/VideoGame'

export default function VideoGame(){
    const [gamestringlist, setGamestringlist]=useState('')
    const [gamelist,setGamelist]=useState([])

    useEffect(()=>{
        //console.log(convertstring("\"hi\""))
        axios.get("http://localhost:8000/random").
        then((response)=>{
            setGamestringlist(response.data)
            var temp = response.data
            console.log(temp)
            setGamelist(convertstring(response.data))
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    useEffect(()=>{
        console.log("hi, I'm changed")
    }, [gamelist])

    return(
<div className={styles.video_wrapper}>
    <div className={styles.main_content}>
        <div>
            Get a Personalized Video Game Recommendation!
        </div>

        <div>
            How this works is we will give you a list of 10 games and you can tell us weather you like or dislike them. 
            We can then, output a video game that you will enjoy for sure!   
        </div>

        <VideoGameComponent gamelist={gamelist} /> 
        
    </div>

    <Video/>
</div>
    )
}