// store memes in arr and data
let link ="https://api.imgflip.com/get_memes"
let container=document.getElementById("meme-container")

let memes_arr = [];
let likedMemes = new Set();

const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');
const themeToggle = document.getElementById('theme-toggle');

const applyFiltersAndSort = () => {
    let query = searchInput.value.toLowerCase();
    let filterVal = filterSelect.value;
    let sortVal = sortSelect.value;

    // Searching using filter()
    let processedMemes = memes_arr.filter(meme => meme.name.toLowerCase().includes(query));

    // Filtering using filter()
    processedMemes = processedMemes.filter(meme => {
        if (filterVal === 'all') return true;
        if (filterVal === '2') return meme.box_count === 2;
        if (filterVal === '3') return meme.box_count === 3;
        if (filterVal === 'more') return meme.box_count > 3;
        return true;
    });

    // Sorting using sort()
    if (sortVal === 'asc') {
        processedMemes.sort((a, b) => {
            let nameA = (a.name || "").toLowerCase();
            let nameB = (b.name || "").toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (sortVal === 'desc') {
        processedMemes.sort((a, b) => {
            let nameA = (a.name || "").toLowerCase();
            let nameB = (b.name || "").toLowerCase();
            return nameB.localeCompare(nameA);
        });
    }

    renderMemes(processedMemes);
};

if (searchInput) searchInput.addEventListener('input', applyFiltersAndSort);
if (filterSelect) filterSelect.addEventListener('change', applyFiltersAndSort);
if (sortSelect) sortSelect.addEventListener('change', applyFiltersAndSort);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

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
                <div class="actions">
                    <button class="select-btn">USE TEMPLATE</button>
                    <button class="like-btn ${likedMemes.has(meme.id) ? 'liked' : ''}" data-id="${meme.id}">
                        ${likedMemes.has(meme.id) ? '❤️ LIKED' : '🤍 LIKE'}
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        const memeId = e.target.getAttribute('data-id');
        if (likedMemes.has(memeId)) {
            likedMemes.delete(memeId);
            e.target.classList.remove('liked');
            e.target.textContent = '🤍 LIKE';
        } else {
            likedMemes.add(memeId);
            e.target.classList.add('liked');
            e.target.textContent = '❤️ LIKED';
        }
    }
});

fetchMemes()