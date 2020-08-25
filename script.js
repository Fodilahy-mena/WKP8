console.log('Weekend project 8');

let artists = [
    {
    title: 'Careless Whisper',
    name: 'George Michael',
    style: 'Soul',
    length: 5.01,
    urlPic: 'https://www.carillonstudios.com/image/cache/data/SingleStyles/carelesswhisper-350x350.jpg',
    score: 0,
    id: 1598085438685,
},
{
    title: 'Only my own',       
    name: 'Freddie Mercury',
    style: 'Pop',
    length: 3.50,
    urlPic: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Living_on_My_Own_cover_-_Freddie_Mercury.jpg',
    score: 0,
    id: 1598085466523,
},
{
    title: 'We all bleed the same',
    name: 'TobyMac',
    style: 'Hip hop',
    length: 4.56,
    urlPic: 'https://static.billygraham.org/sites/billygraham.org/uploads/pro/2013/10/29152243/toby-new.jpg',
    id: 1598085505418,
    score: 0,
},
];

const form = document.querySelector('.add_form');

const tableBody = document.querySelector('tbody');

const showArtists = () => {

    const html = artists.map(artist => {
        return `
        <tr>
            <td>
                <img class="picture" src="${artist.urlPic}" alt="Artist picture" width=200>
            </td>
            <td class="grid td">
                <span>Song's name</span>
                <span class="title">${artist.title}</span>
            </td>
            <td class="grid">
                <span>Artist name</span>
                <span>${artist.name}</span>
            </td>
            <td>
                Score: ${artist.score}
            </td>
            <td>
                <button class="btn_score">
                    +1
                </button>
            </td>
            <td>
                <button 
                    value="${artist.id}"
                    class="delete_btn">
                    <img src="./assets/trash.svg" alt="delet all info about the artist from the list">
                </button>
            </td>
        </tr>
        `;
    }).join('');
    tableBody.innerHTML = html;
};
showArtists();

const addArtist = e => {
    e.preventDefault();
    console.log(e);
    const formEl = e.currentTarget;
    const newArtist = {
        title: formEl.title.value,
        name: formEl.singer.value,
        style: formEl.style.value,
        length: formEl.length.value,
        urlPic: formEl.url.value,
        id: Date.now(),
        score: 0,
    };
    
    console.log(newArtist);
    artists.push(newArtist);
    tableBody.dispatchEvent(new CustomEvent('updateArtistList'));
    formEl.reset();
};
 
const handleClick = e => {
    console.log(e.target);
    // delete an artist from the list

    const deleteBtn = e.target.closest('button.delete_btn');
    if(deleteBtn) {
        const id = Number(deleteBtn.value);
        console.log(id);
        deleteArtist(id);
    } 

    const scoreBtn = e.target.closest('button.btn_score');
    if(scoreBtn) {
        const score = Number(scoreBtn.value);
        updatedScore(score);
    }

};

const deleteArtist = id => {
    artists = artists.filter(artist => artist.id !== id);
    tableBody.dispatchEvent(new CustomEvent('updateArtistList'));
}

const updatedScore = score => {
    artists = artists.filter(artist => artist.score = artist.score + 1);
    tableBody.dispatchEvent(new CustomEvent('updateArtistList'));
}

// filter the list of song, by searching on the search input form

function searchingSongTitle() {
var songTitle, textValue, searchInput, fillter, tr, tb, td;

searchInput = document.querySelector('.search');
fillter = searchInput.value.toUpperCase();
tr = document.querySelector('tr');
tb = document.querySelector('tbody');
td = document.querySelector('.td');
// const songTitle = document.querySelector('.title');

for (let i = 0; i < tr.length; i++) {
    songTitle = tr[i].td.querySelector('.title')[0];
    textValue = songTitle.textContent || songTitle.innerText;

    if(textValue.toUpperCase().indexOf(fillter) > -1) {
        tr[i].style.display = "";
    } else {
        tr[i].style.display = "none";
    }
}
}


// save to local storage

const SaveToLocalStorage = () => {
    const artistsList = JSON.parse(localStorage.getItem('artists'));
    if(artistsList) {
        artists = artistsList;
    }
    tableBody.dispatchEvent(new CustomEvent('updateArtistList'));
};

const updateToLocalStorage = () => {
    localStorage.setItem('artists', JSON.stringify(artists));
}

form.addEventListener('submit', addArtist);
tableBody.addEventListener('updateArtistList', showArtists);
window.addEventListener('DOMContentLoaded', showArtists);
tableBody.addEventListener('click', handleClick);
tableBody.addEventListener('updateArtistList', updateToLocalStorage);
SaveToLocalStorage();

