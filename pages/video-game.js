import Head from 'next/head'
import Video from '../Components/Video'

import styles from '../styles/video-game.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { convertstring } from '../Components/helper'
import VideoGameComponent from '../Components/VideoGame'

export default function VideoGame(){
    const [gamelist,setGamelist]=useState([])
    const [fetch, setFetch]= useState(false)

    useEffect(()=>{
        //console.log(convertstring("\"hi\""))
        axios.get("http://localhost:8000/random").
        then((response)=>{
            var temp = response.data
            console.log(temp)
            console.log(convertstring(response.data))
            setGamelist(convertstring(response.data))
        }).catch((error)=>{
            console.log(error)
        })
    }, [])


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

        <VideoGameComponent gamelist={gamelist} fetch={fetch} setFetch={setFetch}/> 
        
    </div>

    <Video/>
</div>
    )
}