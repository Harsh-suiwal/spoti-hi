console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let masterCurrentTime = document.getElementById('masterCurrentTime');
let masterMaxDuration = document.getElementById('masterMaxDuration');

let songs = [
    {songName: "Mortals Warrio", filePath: "songs/1.mp3", coverPath: "covers/3.jpg"},
    {songName: "Faded", filePath: "songs/2.mp3", coverPath: "covers/1.jpg"},
    {songName: "DEAF Key", filePath: "songs/3.mp3", coverPath: "covers/2.jpg"},
    {songName: "Different heaven and E!HIDE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Kaitan Kitan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"}
]
// audioElement.play();

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;

    let tempAudio = new Audio(songs[i].filePath);
    tempAudio.addEventListener('loadedmetadata', () => {
        let mins = Math.floor(tempAudio.duration / 60);
        let secs = Math.floor(tempAudio.duration % 60).toString().padStart(2, '0');
        element.getElementsByClassName("timeStamp")[0].childNodes[0].nodeValue = `${mins}:${secs} `;
    })
})
// Handle play/pause click
masterPlay.addEventListener('click', () => {
    let iconPlay = masterPlay.querySelector('.iconPlay');
    let iconPause = masterPlay.querySelector('.iconPause');

    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'inline-block';
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        iconPlay.style.display = 'inline-block';
        iconPause.style.display = 'none';
        gif.style.opacity = 0;
    }
})
// Listen to events
audioElement.addEventListener('timeupdate', () => {
    if(isNaN(audioElement.duration)){
        myProgressBar.value = 0;
        progressFill.style.width = '0%';
    } else {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
        progressFill.style.width = `${progress}%`;

        // format and show current time
        let curMins = Math.floor(audioElement.currentTime / 60);
        let curSecs = Math.floor(audioElement.currentTime % 60).toString().padStart(2, '0');
        masterCurrentTime.innerHTML = `${curMins}:${curSecs}`;

        // format and show total duration
        let durMins = Math.floor(audioElement.duration / 60);
        let durSecs = Math.floor(audioElement.duration % 60).toString().padStart(2, '0');
        masterMaxDuration.innerHTML = `${durMins}:${durSecs}`;
    }
    
})
/* old buggy player */
/*
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})
*/

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let wrapper = e.target.closest('.songItemPlay');
        songIndex = parseInt(wrapper.id);
        audioElement.src = songs[songIndex - 1].filePath;
        audioElement.currentTime = 0;
        masterSongName.innerHTML = songs[songIndex - 1].songName;
        audioElement.play()
            .then(() => {
                masterPlay.querySelector('.iconPlay').style.display = 'none';
                masterPlay.querySelector('.iconPause').style.display = 'inline-block';
                gif.style.opacity = 1;
            })
            .catch((err) => console.log('play failed:', err));
    })
})

document.getElementById('forward').addEventListener('click', ()=>{
    if(songIndex >= 6 ){
    // songIndex = 0;
    } 
    else{
        songIndex += 1;
        audioElement.src = songs[songIndex - 1].filePath;
        audioElement.currentTime = 0;
        masterSongName.innerHTML = songs[songIndex - 1].songName;
        audioElement.play()
            .then(() => {
                masterPlay.querySelector('.iconPlay').style.display = 'none';
                masterPlay.querySelector('.iconPause').style.display = 'inline-block';
                gif.style.opacity = 1;
            })
            .catch((err) => console.log('play failed:', err));
    }
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0 ){
    songIndex = 0;
    } 
    else{
        songIndex -= 1;
        audioElement.src = songs[songIndex - 1].filePath;
        audioElement.currentTime = 0;
        masterSongName.innerHTML = songs[songIndex - 1].songName;
        audioElement.play()
            .then(() => {
                masterPlay.querySelector('.iconPlay').style.display = 'none';
                masterPlay.querySelector('.iconPause').style.display = 'inline-block';
                gif.style.opacity = 1;
            })
            .catch((err) => console.log('play failed:', err));
    }

})