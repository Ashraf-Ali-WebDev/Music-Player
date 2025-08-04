let audioSource = document.querySelector('#audioSrc');
let songNm = document.querySelector('h1');
let movie = document.querySelector('h2');
let artistNm = document.querySelector('h3');
let playbtn = document.querySelector('#play');
let prevbtn = document.querySelector('#prev');
let nextbtn = document.querySelector('#next');
let songImg = document.querySelector('#songImg');
let progressContainer = document.querySelector('.progress-container');
let progressBar = document.querySelector('#progress-bar');
let currentTimeEl = document.getElementById('current-time');
let durationEl = document.getElementById('duration');

let currentIndex = 0;
let mode = 'play'; // play or pause

function loadSong(index) {
    const song = songs[index];
    songNm.innerHTML = `Song: ${song.songName}`;
    movie.innerHTML = `Movie: ${song.movieName}`;
    artistNm.innerHTML = `Artist: ${song.artist}`;
    songImg.src = song.songImage || '';
    audioSource.src = song.songSource;

    audioSource.pause();
    audioSource.load();
    playbtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    mode = 'play';


    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audioSource.addEventListener('timeupdate', () => {
    if (audioSource.duration) {
        const percent = (audioSource.currentTime / audioSource.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audioSource.currentTime);
        durationEl.textContent = formatTime(audioSource.duration);
    }
});

progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;

    if (audioSource.duration) {
        audioSource.currentTime = clickPercent * audioSource.duration;
    }
});

// Load initial song
loadSong(currentIndex);

// Previous
prevbtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadSong(currentIndex);
    }
});

// Next
nextbtn.addEventListener('click', () => {
    if (currentIndex < songs.length - 1) {
        currentIndex++;
        loadSong(currentIndex);
    }
});

// Play / Pause
playbtn.addEventListener('click', () => {
    if (mode === 'play') {
        audioSource.play();
        playbtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        mode = 'pause';
    } else {
        audioSource.pause();
        playbtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        mode = 'play';
    }
});
