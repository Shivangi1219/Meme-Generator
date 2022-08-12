import React from "react";

export default function Meme(){

   // const [memeImage, setMemeImage] = React.useState("https://i.imgflip.com/30b1gx.jpg");
   const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "",
        randomImage : "https://i.imgflip.com/30b1gx.jpg"

   })

   const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        setMeme(prevState => ({
            ...prevState,
            randomImage : allMemes[randomNumber].url 
        }))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevState => ({
            ...prevState,
            [name] : value
        }))
    }
    
    return (
       <main>
            <div className="form">
                <input 
                    type="text"
                    className="form--input" 
                    placeholder="top text"
                    name = "topText"
                    value = {meme.topText}
                    onChange = {handleChange}
                />
                <input 
                    type="text" 
                    className="form--input"
                    placeholder="bottom text"
                    name = "bottomText"
                    value = {meme.bottomText}
                    onChange = {handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image
                </button>
            </div>
            <div className="meme">
                <img className="meme--image" src = {meme.randomImage}  />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
       </main>
    );
}