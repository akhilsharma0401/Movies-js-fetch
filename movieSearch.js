const from= document.querySelector("form")
const movieName= document.querySelector("input")
    from.onsubmit= (e)=>{
    e.preventDefault()
    fetch("https://api.themoviedb.org/3/search/movie?api_key=95221561f840ef9c1e48a21783879987&language=en-US&query="+movieName.value+"&include_adult=fals")
        .then((Response)=>{return Response.json()})
        .then((output)=>{console.log(output)
            names(output.results)
        })}

    function names(data){
       if(data.length===0){
        const error=("Not Found")
        document.querySelector("#results h2").append(error)
       }
       else{

        const blank=document.querySelector("#results")
        blank.innerHTML=""

        for(let i=0; i<data.length;i++){

         const row = document.createElement("div")
         row.setAttribute("class","col-md-4")   
        const tital=document.createElement("h1");
        // tital.setAttribute("class","text-truncate")
        tital.innerHTML=text(data[i].title);

        const image=document.createElement("img");
        image.src=data[i].poster_path ?"https://image.tmdb.org/t/p/original" + data[i].poster_path:"https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg";
        

        fetch("https://api.themoviedb.org/3/movie/"+data[i].id+"/videos?api_key=3a0c4dd223a8f1dfe67839464bdde91a&language=en-US")
        .then((resonse)=>{return resonse.json()})
        .then((result)=>{console.log(result)
             if(result.results.length > 0){
                 const trailerKey = trailer(result.results);
                 if (trailerKey) row.append(videoplaybtn(trailerKey));

             }
        })


        document.querySelector("#results").append(row);
        document.querySelector("#results").lastElementChild.append(image);
        document.querySelector("#results").lastElementChild.append(tital);
        }
        
    }}

    function text(params){
        if(params.length>20){
            return params.slice(0,10)+"..."
        }
        else{return params}
    }

    function trailer(data1){
        const videodata = data1.find(
            (obj) => obj.site === "YouTube" && obj.type === "Trailer"
        );
        if(videodata === "undefined") return false;
        else return videodata.key;
    }
    
    function videoplaybtn (key){
        const btn = document.createElement("a");
        btn.href = "https://youtube.com/embed/"+ key;
        btn.targe = "_blank";
        btn.innerHTML = "play trailer"
        return btn
    
    }