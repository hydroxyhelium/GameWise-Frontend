import axios from "axios"
import { useState, useEffect } from "react"
import styles from "./VideoGame.module.css"

const getGameData = async (gamelist, setTemp) =>{

    var Array = []

    for(var i = 0; i<10; ++i){
        var element = gamelist[i]
        var req = {
            'game_name':element
        }

        var res = await axios.post('http://localhost:8000/games',req,{
            withCredentials:true})

        var properRes = res.data

        console.log(properRes)

        if(properRes.name!==""){
            Array.push(properRes)
        }
    }

    setTemp(Card(Array))

    console.log("done.")
    // if(res.status == 200){
    //     console.log(res.status)
    // }    
}

const Card = (temp)=>{
    
    console.log("called")
    if (Array.isArray(temp)){
        var element = temp[0]
        return(<div>

            <div className={styles.mainHeading}>
                Personalize your video gaming experience
            </div>

            <div className={styles.subHeading}>
                Here is a list of video games, please indicate how much you like or dislike them. 
            </div>

            <div className={styles.title}>
                {element.name}
            </div>
            <div className={styles.imageHolder}>
                <img src={element.url} className={styles.image}/>
            </div>
            <div className={styles.summary}>
                {element.summary}
            </div>
        </div>)
    }

    return(<div>
        Waiting for content
    </div>)
}


export default function VideoGameComponent({gamelist, fetch, setFetch}){
    console.log("called")
    console.log(fetch)
    const [temp, setTemp]= useState(<div> </div>)

    useEffect(()=>{
        if(gamelist.length!==0 && (!fetch)){

            setFetch(true)
            console.log(gamelist)
            const promises = [];
    
            axios.get('http://localhost:8000/',{
                    withCredentials:true
            }).then((response)=>{
                console.log("cookie recieved successfully")
            })
    
            getGameData(gamelist,setTemp)
            setFetch(true)
    }
    
    },[gamelist])

    
    // const [temp, setTemp]= useState(<div> </div>)

    return <div>
        {temp}
    </div>
}