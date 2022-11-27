import axios from "axios"
import { useState } from "react"

export default function VideoGameComponent({gamelist}){

    const [temp, setTemp]= useState(<div> </div>)

    if(gamelist.length!==0){
        var first_item = gamelist[0]

        console.log(first_item)
        var request = {
            'game_name': first_item
        }
        axios.get('http://localhost:8000/',{
            withCredentials:true
        }).then((response)=>{
            console.log('successfuly created cookie')
        })

        axios.post('http://localhost:8000/games',request,{
            withCredentials:true
        }).then((response)=>
        {
            var temp_component = <div>
                <div> 
                {response.data.name}
                </div> 
                <div> 
                    {response.data.summary}
                </div>

                <div> 
                    <img src={response.data.url} alt="image not found"/>
                </div>
            </div>

            setTemp(temp_component)
            console.log(response)
        })   
    }

    return temp
}