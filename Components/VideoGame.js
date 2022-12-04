import axios from "axios"
import { useState, useEffect } from "react"
import styles from "./VideoGame.module.css"

var games_liked = []
var games_disliked = []
var global_array=[]


const getGameData = async (gamelist, setTemp, index, setIndex) =>{

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

    global_array=[...Array]

    setTemp(Card(Array, index, setIndex))

    console.log("done.")
}


const getRecommendation = async (setTemp)=>{
    var request = {
        "likes":games_liked,
        "dislikes":games_disliked
    }

    var res = await axios.post("http://localhost:8000/recommend",request)
    var string = res.data.trim()
    console.log(string)
    var req = {
        'game_name':string
    }

    var res = await axios.post('http://localhost:8000/games',req,{
        withCredentials:true})

    var object = res.data

    if(object.name !== ""){
        setTemp(<div>
            <div className={styles.mainHeading}>
                Here is the recommendation using AI
            </div>
            <u>
            <div className={styles.title}>
                {object.name}
            </div>
            </u>
            <div className={styles.imageHolder}>
                <img src={object.url} alt="Image not found"/>
            </div>
            <div className={styles.summary}>
                {object.summary}
            </div>
        </div>)
    }
    else{
        <div>
            Sorry a good recommendation could not be found
        </div>
    }
}

const Card = (temp, index, setIndex)=>{
    
    console.log("called")
    console.log(index)
    console.log(Array.isArray(temp))
    if (Array.isArray(temp)){
        var element = temp[index]
        return(<div>
            <div className={styles.mainHeading}>
                Personalize your video gaming experience
            </div>

            <div className={styles.subHeading}>
                Here is a list of video games, please indicate how much you like or dislike them. 
            </div>

            <div className={styles.title}>
                <u>{element.name}</u>
            </div>
            
            <div className={styles.button_1}>
            <div className={styles.button_plus} onClick={()=>{
                games_disliked.push(element.name)
                setIndex(index+1)
            }}></div>
            </div>
                

            <div className={styles.imageHolder}>
            <img src={element.url} className={styles.image}/>
            </div>
                
            <div className={styles.button_2}> 
            <div className={styles.button_plus_2} onClick={()=>{
                games_liked.push(element.name)
                setIndex(index+1)
                console.log(index)  
            }}></div>
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
    const [index, setIndex]= useState(0)

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
    
            getGameData(gamelist,setTemp,index,setIndex)
            setFetch(true)
    }
    
    },[gamelist])

    useEffect(()=>{
        console.log("inisde the useEffect")
        console.log(Array.isArray(gamelist))

        if(fetch && Array.isArray(gamelist) && (index < global_array.length) ){
            console.log("index is")
            console.log(index)
            setTemp(Card(global_array, index, setIndex))
        }

        if(fetch && index == global_array.length){
            console.log(games_liked)
            console.log(games_disliked)
            getRecommendation(setTemp)
        }
        
    },[index])

    
    // const [temp, setTemp]= useState(<div> </div>)

    return <div>
        {temp}
    </div>
}