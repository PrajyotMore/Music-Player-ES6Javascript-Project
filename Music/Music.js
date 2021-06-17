const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
let progress = document.getElementById("progress");
let endtime = document.getElementById("endtime");
let currenttime = document.getElementById("currenttime");
const progress_div = document.getElementById("progress_div");
 



let isPlaying = false;

//Music Data 
const songs = [
    {
        name:"Brown Munde(PaglaSongs)",
        title: "Brown Munde",
        artist: "AP Dhillon",
        image: "nature",
    },
    {
        name:"Dil ko Karaar Aaya - Neha Kakkar",
        title: "Dil ko Karaar",
        artist: "Neha Kakkar-Yasser Desai",
        image:"dil-ko-karaar",
    },
    {
        name:"Mann Mast Magan Remix",
        title: "Mann Mast Magan",
        artist: "Arjit singh",
        image:"2-states",
    },
]

// for play functionality
const playMusic = ()=> {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
};

// for pause functionality
const pauseMusic = ()=> {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");
};

play.addEventListener("click", ()=> {
    // if(isPlaying) {
    //     pauseMusic();
    // } else {
    //     playMusic();
    // }

    isPlaying ? pauseMusic() : playMusic();
})

// Changing the music Data

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "../Songs/" +songs.name+ ".mp3";
    img.src = "../Images/" +songs.image+ ".jpg";
}

let songIndex = 0;
// loadSong(songs[0]);
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// progress Bar js work
// timeupdate event 
music.addEventListener("timeupdate", (event) => {
    // console.log(event);
    const {currentTime,duration} = event.srcElement; // object destruction
    // console.log(currentTime);
    // console.log(duration);

    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;


    // music duration update
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        endtime.textContent = `${tot_duration}`;
    }

    //currenttime updation
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    currenttime.textContent = `${tot_currentTime}`;

});

//clicking on middle of the bar 
progress_div.addEventListener("click", (event)=> {
    const {duration} = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    // console.log(move_progress);
    music.currentTime = move_progress;
})


// music end next song should played
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);


