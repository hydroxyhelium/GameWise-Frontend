export function convertstring(input){

    var output = []
    var temp = ""
    var isopen = ""

    for(var i=0; i<input.length; ++i){
        if(isopen){
            if(input[i]==="\""){
                console.log("here")
                isopen=false
                output.push(temp)
                temp=""
            }
            else{
                temp+=input[i]
            }
        }
        else{
            if(input[i]=="\""){
                isopen=true
            }
        }
    }

    return output
}

