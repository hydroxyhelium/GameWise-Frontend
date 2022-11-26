import axios from "axios"

export default function VideoGameComponent({gamelist}){

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
            console.log(response.data)
        })   
    }

    return(
        <div>
        Hi
        </div> 
    )
}