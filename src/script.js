// store memes in arr and data
let link ="https://api.imgflip.com/get_memes"
let container=document.getElementById("meme-container")

let memes_arr = [];

async function fetchMemes() {
    try {
        let response = await fetch(link);
        let result = await response.json(); 
        
        console.log(result)
        // Imgflip structure is: result.data.memes
        memes_arr = result.data.memes; 
        
        console.log("Success! Memes stored:", memes_arr);
        container.innerHTML='<p>Failed to load memes. Try again later!</p>'
        
        // This is where you would call your 'displayMemes()' function
        renderMemes(memes_arr); 
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

let renderMemes = (memes) => {
    container.innerHTML = memes.map(meme => `
        
        <div class="meme-card">
            <div class="meme-img-wrapper">
                <img src="${meme.url}" alt="${meme.name}" loading="lazy">
            </div>
  

            <div class="meme-info">
                <span class="role-tag">TEMPLATE</span>
                <h3>${meme.name}</h3>
                <button class="select-btn">USE TEMPLATE</button>
            </div>
        </div>
    `).join("");
}

fetchMemes()