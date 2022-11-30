import axios from "axios"
import { useState } from "react"

const getGameData = async (gamelist, setTemp) =>{

    var divArray = []

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
            divArray.push(<div key={i}>
                <div> 
                    {properRes.name}
                </div>

                <div>
                    <img src={properRes.url} alt="image not found"/>
                </div>
                <div>
                {properRes.summary}
                </div>
            </div>)

        }
    }

    setTemp(divArray)

    console.log("done.")
    // if(res.status == 200){
    //     console.log(res.status)
    // }    
}

export default function VideoGameComponent({gamelist, fetch, setFetch}){

    // const [temp, setTemp]= useState(<div> </div>)
    const [temp, setTemp]= useState([])

    console.log(fetch)

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

    console.log("hi")

    return <div>
        {temp}
    </div>
}