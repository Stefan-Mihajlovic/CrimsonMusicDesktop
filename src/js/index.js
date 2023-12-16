setHomeScreen();

let brojPesama = 50;
let brojArtista = 25;
let brojPlejlista = 6;
let brojKategorija = 14;

let isPerformanceModeOn = false;

/* ----- GET THE TIME ----- */

window.onload = getTime();
function getTime(){
    var d = new Date();
    var time = d.getHours();

    todEl = document.getElementsByName('timeOfDay');

    if (time < 12) {
        todEl.forEach((todel) => {
            todel.innerHTML = 'Good Morning';
        });
    }
    if (time >= 12 && time < 18) {
        todEl.forEach((todel) => {
            todel.innerHTML = 'Good Afternoon';
        });
    }
    if (time >= 18) {
        todEl.forEach((todel) => {
            todel.innerHTML = 'Good Evening';
    });
    }
}

/* ----- SET APP MODE ----- */

function setAppPMode(){
    // if (/windows phone/i.test(navigator.userAgent) || /android/i.test(navigator.userAgent)) {
    //     turnPerformanceModeOn();
    // }else{
    //     turnPerformanceModeOff();
    // }
    turnPerformanceModeOn();
}

/* ----- SET SCREEN ----- */

let currentScreen = "homeScreen";
let isLoaderOff = false;
let startTSDValue = 0;

function setScreen(screenToSet, clickedBtn, activeScreen){

    if(!isLoaderOff && (activeScreen == "searchScreen" || activeScreen == "yoursScreen")){
        document.querySelector('.loaderWrapper').classList.add('loaderOff');
    }

    if(currentScreen == activeScreen && currentScreen == "searchScreen"){
        document.getElementById('searchInput').focus();

        return;
    }

    if(!UserSignedIn() && activeScreen == "yoursScreen"){
        openLoginPopup();
        return;
    }

    closePlaylistPage();
    closeArtistPage();
    closeCategoryPage();
    closeLoginScreen();

    if(activeScreen == "yoursScreen"){
        resetSearchScreenToNormal();
    }

    if (activeScreen !== currentScreen) {
        let buttons = document.querySelectorAll("nav > button");
        buttons.forEach((button) => {
            button.classList.remove("activeScreen");
        });
        clickedBtn.classList.add("activeScreen");

        let buttons2 = document.querySelectorAll("nav > div > button");
        buttons2.forEach((button) => {
            button.classList.remove("activeScreen");
        });
        clickedBtn.classList.add("activeScreen");

        let mains = document.querySelectorAll("main");
        mains.forEach((main) => {
            main.classList.remove("activeMain");
        });

        currentScreen = activeScreen;
    }

    let activeMain = document.getElementsByClassName(activeScreen)[0];
    activeMain.classList.add("activeMain");

    if(activeScreen == "searchScreen"){
        let searchList = document.getElementsByClassName("searchList")[0];
        let searchInput = document.getElementById("searchInput");

        searchList.classList.remove("searchListOpen");
        searchList.innerHTML = "";
        searchInput.value = "";
    }
}

function setHomeScreen(){
    document.getElementsByClassName("homeScreen")[0].classList.add("activeMain");
}

/* ----- Button clicks ----- */

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener('click', () => {
        buttonClickAnim(button);
    });
});

function buttonClickAnim(button){
    button.classList.add("buttonClicked");
    setTimeout(() => {
        button.classList.remove("buttonClicked");
    }, 150);
}

function clickEffect(button){
    if(button !== undefined){
        button.classList.add("buttonClicked");
        setTimeout(() => {
            button.classList.remove("buttonClicked");
        }, 150);
    }
}

const monopToggle = document.getElementById('monopToggle');
let lastPlayerColor;
monopToggle.addEventListener('click', () => {
    if(monopToggle.checked){
        document.getElementsByClassName('songBackdrop')[0].style.display = 'none';
        lastPlayerColor = getComputedStyle(document.documentElement).getPropertyValue('--currentSongColorBig');
        document.documentElement.style.setProperty("--currentSongColorBig", 'rgb(28, 22, 37)');
    }else{
        document.getElementsByClassName('songBackdrop')[0].style.display = 'block';
        document.documentElement.style.setProperty("--currentSongColorBig", lastPlayerColor);
    }
})

let reduceAnimations = false;
let popupScreen = document.querySelector('.popupScreen');

const redanimToggle = document.getElementById('redanimToggle');
redanimToggle.addEventListener('click', () => {
    if(redanimToggle.checked){
        const pageBars = document.getElementsByClassName('pageBar');
        for (let i = 0; i < pageBars.length; i++) {
            pageBars[i].classList.add('noAnimTransitions');
        }
        const mains = document.querySelectorAll('main');
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.add('noAnimTransitions');
        }
        document.querySelector('header').classList.add('noAnimTransitions');
        document.getElementById('mobileNav').classList.add('noAnimTransitions');

        document.getElementById('popupWrapper').classList.add('noAnimTransitions');
        document.getElementsByClassName('popupScreen')[0].classList.add('noAnimTransitions');

        document.getElementsByClassName('player')[0].classList.add('noAnimTransitions');
        document.getElementsByClassName('miniPlayer')[0].classList.add('noAnimTransitions');
        document.getElementsByClassName('bigSongInfo')[0].classList.add('noAnimTransitions');
        document.getElementsByClassName('bigControls')[0].classList.add('noAnimTransitions');

        document.querySelector('.categoryScreen').classList.add('noAnimTransitions');
        document.querySelector('.artistScreen').classList.add('noAnimTransitions');
        document.querySelector('.playlistScreen').classList.add('noAnimTransitions');
        document.querySelector('.makePlaylistScreen').classList.add('noAnimTransitions');
        document.querySelector('.loginScreen').classList.add('noAnimTransitions');
        document.getElementsByClassName('loggedInScreen')[0].classList.add('noAnimTransitions');
        
        const h2s = document.querySelectorAll('h2');
        for (let i = 0; i < h2s.length; i++) {
            h2s[i].classList.add('noAnimTransitions');
        }

        const songItems = document.querySelectorAll('.songItem');
        for (let i = 0; i < songItems.length; i++) {
            songItems[i].classList.add('noAnimTransitions');
        }
        const artistItems = document.querySelectorAll('.artistItem');
        for (let i = 0; i < artistItems.length; i++) {
            artistItems[i].classList.add('noAnimTransitions');
        }
        const playlistItems = document.querySelectorAll('.playlistItem');
        for (let i = 0; i < playlistItems.length; i++) {
            playlistItems[i].classList.add('noAnimTransitions');
        }

        document.getElementById('searchBarYours').classList.add('noAnimTransitions');
        
        reduceAnimations = true;
    }else{
        const pageBars = document.getElementsByClassName('pageBar');
        for (let i = 0; i < pageBars.length; i++) {
            pageBars[i].classList.remove('noAnimTransitions');
        }
        const mains = document.querySelectorAll('main');
        for (let i = 0; i < mains.length; i++) {
            mains[i].classList.remove('noAnimTransitions');
        }
        document.querySelector('header').classList.remove('noAnimTransitions');
        document.getElementById('mobileNav').classList.remove('noAnimTransitions');

        document.getElementById('popupWrapper').classList.remove('noAnimTransitions');
        document.getElementsByClassName('popupScreen')[0].classList.remove('noAnimTransitions');

        document.getElementsByClassName('player')[0].classList.remove('noAnimTransitions');
        document.getElementsByClassName('miniPlayer')[0].classList.remove('noAnimTransitions');
        document.getElementsByClassName('bigSongInfo')[0].classList.remove('noAnimTransitions');
        document.getElementsByClassName('bigControls')[0].classList.remove('noAnimTransitions');

        document.querySelector('.categoryScreen').classList.remove('noAnimTransitions');
        document.querySelector('.artistScreen').classList.remove('noAnimTransitions');
        document.querySelector('.playlistScreen').classList.remove('noAnimTransitions');
        document.querySelector('.makePlaylistScreen').classList.remove('noAnimTransitions');
        document.querySelector('.loginScreen').classList.remove('noAnimTransitions');
        document.getElementsByClassName('loggedInScreen')[0].classList.remove('noAnimTransitions');
        
        const h2s = document.querySelectorAll('h2');
        for (let i = 0; i < h2s.length; i++) {
            h2s[i].classList.remove('noAnimTransitions');
        }

        const songItems = document.querySelectorAll('.songItem');
        for (let i = 0; i < songItems.length; i++) {
            songItems[i].classList.remove('noAnimTransitions');
        }
        const artistItems = document.querySelectorAll('.artistItem');
        for (let i = 0; i < artistItems.length; i++) {
            artistItems[i].classList.remove('noAnimTransitions');
        }
        const playlistItems = document.querySelectorAll('.playlistItem');
        for (let i = 0; i < playlistItems.length; i++) {
            playlistItems[i].classList.remove('noAnimTransitions');
        }

        document.getElementById('searchBarYours').classList.remove('noAnimTransitions');

        reduceAnimations = false;
    }
})

const pmToggle = document.getElementById('pmToggle');
pmToggle.addEventListener('click', () => {
    if(pmToggle.checked){
        turnPerformanceModeOn();
    }else{
        turnPerformanceModeOff();
    }
})

function turnPerformanceModeOn(){
    document.documentElement.style.setProperty("--gmBackdrop", "none");
    document.documentElement.style.setProperty("--gmBackdropPlayer", "none");
    //document.querySelector('.songBackdrop').style.display = 'none';
    pmToggle.checked = true;
    isPerformanceModeOn = true;
    redrawAppTheme();
}

function turnPerformanceModeOff(){
    document.documentElement.style.setProperty("--gmBackdrop", "blur(20px) brightness(1.2)");
    document.documentElement.style.setProperty("--gmBackdropPlayer", "brightness(0.5) blur(50px) saturate(2.5)");
    //document.querySelector('.songBackdrop').style.display = 'block';
    pmToggle.checked = false;
    isPerformanceModeOn = false;
    redrawAppTheme();
}

const appThemeSelect = document.querySelector('#appThemeSelect');
function redrawAppTheme(){

    let themePreferencee = window.matchMedia("(prefers-color-scheme: dark)");

    if(appThemeSelect.value == "light"){
        setLightTheme();
    }
    if(appThemeSelect.value == "dark"){
        setDarkTheme();
    }
    if(appThemeSelect.value == "auto"){
        setAutoTheme(themePreferencee);
    }

}

// const mpbToggle = document.getElementById('mpbToggle');
// mpbToggle.addEventListener('click', () => {
//     if(mpbToggle.checked){
//         document.querySelector('.miniPlayer').classList.add('colorfulMiniPlayer');
//     }else{
//         document.querySelector('.miniPlayer').classList.remove('colorfulMiniPlayer');
//     }
// })

let nextSongBtn = 0,prevSongBtn = 0,currentSongBtn = 0;
let isAutoPlayOn = true;
// const autoplayBtn = document.querySelector('#autoplayBtn');
// autoplayBtn.addEventListener('click', () => {
//     if (isAutoPlayOn) {
//         autoplayBtn.classList.add('activeBtn');
//         autoplayBtn.innerHTML = `AUTOPLAY OFF<i class="bi bi-collection-play-fill"></i>`;
//         isAutoPlayOn = false;
//     }else{
//         autoplayBtn.classList.remove('activeBtn');
//         autoplayBtn.innerHTML = `AUTOPLAY ON<i class="bi bi-collection-play-fill"></i>`;
//         isAutoPlayOn = true;
//     }
// })

const backwardBtn = document.querySelector('#backward');
backwardBtn.addEventListener('click', () => {
    if(prevSongBtn != 0){
        prevSongBtn.children[1].click();
    }
})

const forwardBtn = document.querySelector('#forward');
forwardBtn.addEventListener('click', () => {
    if(nextSongBtn != 0){
        nextSongBtn.children[1].click();
    }
})

// const addToPlBtn = document.querySelector('#addToPlBtn');
// addToPlBtn.addEventListener('click', addToPlFunc);

function addToPlFunc(){
    if(UserSignedIn()){
        popupScreen.classList.add("popupPl");
        LoadUserPlaylistsPopup(addToPlBtn.getAttribute('name'));
        this.removeEventListener('click', addToPlFunc);
        addToPlBtn.onclick = () => {};
    }else{
        openLoginPopup();
    }
}

let isShuffleOn = false;
// const shuffleBtn = document.getElementById('shuffleBtn');
// shuffleBtn.addEventListener('click', () => {
//     isShuffleOn = !isShuffleOn;
//     shuffleBtn.classList.toggle("buttonTurnedOn");
//     if(isRepeatOn){
//         isRepeatOn = false;
//         repeatBtn.classList.toggle('buttonTurnedOn');
//     }
// })

/* ----- LOGIN SCREEN ----- */

function openLoginScreen(){
    let loginScreen = document.getElementsByClassName("loginScreen")[0];
    document.getElementsByClassName(currentScreen)[0].classList.add("mainToSide");

    loginScreen.classList.add("loginScreenOpen");
}

function closeLoginScreen(){
    let loginScreen = document.getElementsByClassName("loginScreen")[0];
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");

    loginScreen.classList.remove("loginScreenOpen");
    setTimeout(() => {
        loginScreen.style.left = 'auto';
    }, 350);
}

// Switch from register to login screen
function RegToLog(){
    const titles = document.getElementsByName("regLogTitle");
    const emailInput = document.getElementById("email");
    const alreadyAcc = document.getElementById("alreadtAcc");
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const emailLabel = document.querySelector('.emailLabel');

    titles.forEach((title) => {
        title.innerHTML = "Login";
    });
    email.style.display = "none";
    alreadyAcc.innerHTML = `Don't have an account? <span class="highlightSpan" onclick="LogToReg()">Register here!</span>`;
    registerBtn.style.display = "none";
    emailLabel.style.display = "none";
    loginBtn.style.display = "block";
}

function LogToReg(){
    let titles = document.getElementsByName("regLogTitle");
    let emailInput = document.getElementById("email");
    let alreadyAcc = document.getElementById("alreadtAcc");
    let registerGoogleBtn = document.getElementById("regGoogleBtn");
    const emailLabel = document.querySelector('.emailLabel');

    titles.forEach((title) => {
        title.innerHTML = "Register";
    });
    email.style.display = "block";
    alreadyAcc.innerHTML = `Already have an account? <span class="highlightSpan" onclick="RegToLog()">Log in!</span>`;
    registerBtn.style.display = "block";
    emailLabel.style.display = "block";
    loginBtn.style.display = "none";
}

/* ----- Set logged in screen ----- */

function setLoggedInScreen(){
    document.getElementsByClassName("loginForm")[0].style.display = "none";
    document.getElementsByClassName("loggedInScreen")[0].style.display = "flex";
    document.getElementsByName("regLogTitle")[0].innerHTML = "Settings";

}

function setLoggedOutScreen(){
    document.getElementsByClassName("loginForm")[0].style.display = "flex";
    document.getElementsByClassName("loggedInScreen")[0].style.display = "none";
    document.getElementsByName("regLogTitle")[0].innerHTML = "Register";
}

/* ----- PLAYER ----- */

let isPlayerOpen = false;
let isSongPaused = true;

function closeBigPlayer(){
    let player = document.getElementsByClassName("player")[0];
    player.classList.remove("playerOpenTop");
    player.classList.remove("playerOpen");
    player.style.top = 'auto';
    document.getElementsByTagName("nav")[0].classList.remove("navClosed");
    // Setting the opacity to 1 on main and header
    document.getElementsByClassName(currentScreen)[0].style.opacity = '1';
    document.querySelector('header').style.opacity = '1';
    document.getElementsByClassName('darkenPlayer')[0].style.opacity = '0';
    isPlayerOpen = false;
}

const currentSongAudio = document.getElementById("currentSong");
let playingFrom = document.getElementById("playingFromSpan");

// PLAY THE SELECTED SONG

let isTheVaultOn = false;
let LastPlayedFromBtn;

function playerSelectedSong(songURL,songTitle,songCreator,imageURL,songColor,playedFrom,playedFromBtn,id){

    //document.documentElement.style.setProperty("--currentSongColor", songColor);
    //document.documentElement.style.setProperty("--currentSongColorBig", songColor);

    const songVolumeInput = document.getElementById('songVolumeInput');
    currentSongAudio.volume = songVolumeInput.value/100;

    if(LastPlayedFromBtn != undefined && LastPlayedFromBtn != null && LastPlayedFromBtn != 0){
        LastPlayedFromBtn.classList.remove("songPlayingLi");
    }

    currentSongAudio.autoplay = true;
    currentSongAudio.src = songURL;
    var playPromise = currentSongAudio.play();

    if (playPromise !== undefined) {
    playPromise.then(_ => {
        // Automatic playback started!
    })
    .catch(error => {
        // Auto-play was prevented
    });
    }

    let songBanners = document.getElementsByName("songBanner");
    let songTitles = document.getElementsByName("songTitle");
    let songArtists = document.getElementsByName("songArtist");

    let songPlayBtns = document.getElementsByName("songPlayButton");
    songPlayBtns.forEach((button) => {
        button.children[0].classList.remove("fa-circle-play");
        button.children[0].classList.add("fa-circle-pause");
    });
    isSongPaused = false;

    songBanners.forEach((banner) => {
        banner.src = imageURL;
    });
    songTitles.forEach((title) => {
        title.innerHTML = songTitle;
    });
    songArtists.forEach((artist) => {
        artist.innerHTML = songCreator;
    });

    LastPlayedFromBtn = playedFromBtn;

    if(playedFromBtn != 0){
        let songList = playedFromBtn.parentElement;
        for (let i = 0; i < songList.children.length; i++) {
            songList.children[i].classList.remove("songPlayingLi");
            if(songList.children[i] == playedFromBtn){
                currentSongBtn = playedFromBtn;
                currentSongBtn.classList.add("songPlayingLi");
                nextSongBtn = songList.children[i+1] || 0;
                prevSongBtn = songList.children[i-1] || 0;
                if(prevSongBtn != 0){
                    prevSongBtn.classList.remove("songPlayingLi");
                }
            }
        }
    }

    seeIfSongIsLiked(id);
    const checkLyrics = document.getElementById('checkLyrics');
    //checkLyrics.setAttribute('onclick', `doesSongHaveLyrics(${id},'${playedFrom}')`);
    //checkLyrics.click();

    const playerLyricsBtn = document.getElementById("playerLyricsBtn");
    //playerLyricsBtn.setAttribute('onclick', `turnLyrics(`+ id +`)`);

    // const playerLikeBtn = document.getElementById("playerLikeBtn");
    // playerLikeBtn.onclick = () => {
    //     addSongToLiked(id,playerLikeBtn);
    // }

    // const openArtistPageBigBtn = document.getElementById('openArtistPageBigBtn');
    // openArtistPageBigBtn.onclick = () => {
    //     openArtistPageByName(songCreator);
    // }

    const miniPlayerLikeBtn = document.getElementById("miniPlayerLikeBtn");
    miniPlayerLikeBtn.onclick = () => {
        addSongToLiked(id,miniPlayerLikeBtn);
    }
}

// MINI PLAYER VOLUME

const songVolumeInput = document.getElementById('songVolumeInput');
const volumeMenu = document.querySelector('.miniVolumeWrapper');
let isMouseOverVolumeMenu = false;
let lastVolumeBeforeMute = songVolumeInput.value;

songVolumeInput.addEventListener('change', () => {
    currentSongAudio.volume = songVolumeInput.value/100;
})

function muteAudio(volumeBtn){
    if(currentSongAudio.volume != 0){
        lastVolumeBeforeMute = songVolumeInput.value;
        currentSongAudio.volume = 0;
        songVolumeInput.value = 0;
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }else{
        songVolumeInput.value = lastVolumeBeforeMute;
        currentSongAudio.volume = songVolumeInput.value/100;
        console.log(lastVolumeBeforeMute);
        volumeBtn.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
    }
}

function openVolumeMenu(){
    volumeMenu.classList.add("volumeMenuOn");
}

// volumeMenu.addEventListener('mouseover', () => {
//     isMouseOverVolumeMenu = true;
// });

// volumeMenu.addEventListener('mouseleave', () => {
//     isMouseOverVolumeMenu = false;
// });

function closeVolumeMenu(){
    setTimeout(() => {
        volumeMenu.classList.remove("volumeMenuOn");
    }, 300);
}

// PLAY PLAYLIST FROM PLAY BUTTON

function playPlaylist(){
    
    pausePlayCurrentSong("Playlist");

}

// Open MINI PLAYER
function openMiniPlayer(){
    if(!isPlayerOpen){
        let player = document.getElementsByClassName("player")[0];
        player.style.opacity = "1";
        player.style.pointerEvents = "all";
        player.style.transform = "translateY(0%)";
        isPlayerOpen = true;
    }
}

// PAUSE / PLAY THE CURRENT SONG

function pausePlayCurrentSong(from){

    let songPlayBtns = document.getElementsByName("songPlayButton");
    let playPlaylistBtn = document.getElementById("playPlaylistBtn");
    let playlistQueue = document.getElementsByClassName("playlistSongsList")[0].children;

    if(from === "Playlist"){
        playlistQueue[0].classList.add("songPlayingLi");
    }

    if(isSongPaused){
        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-play");
            button.children[0].classList.add("fa-circle-pause");
        });

        if(from === "Playlist"){
            playPlaylistBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause`;
            if(currentSongAudio.currentTime === 0){
                playlistQueue[0].children[1].click();
            }else{
                currentSongAudio.play();
                if(LastPlayedFromBtn != undefined && LastPlayedFromBtn != null && LastPlayedFromBtn != 0){
                    LastPlayedFromBtn.classList.add("songPlayingLi");
                }
            }
        }else{
            currentSongAudio.play();
            if(LastPlayedFromBtn != undefined && LastPlayedFromBtn != null && LastPlayedFromBtn != 0){
                LastPlayedFromBtn.classList.add("songPlayingLi");
            }
        }

        isSongPaused = false;
    }else{
        currentSongAudio.pause();

        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-pause");
            button.children[0].classList.add("fa-circle-play");
        });

        if(from === "Playlist"){
            playPlaylistBtn.innerHTML = `<i class="fa-solid fa-play"></i> Play`;
        }

        if(LastPlayedFromBtn != undefined && LastPlayedFromBtn != null && LastPlayedFromBtn != 0){
            LastPlayedFromBtn.classList.remove("songPlayingLi");
        }

        isSongPaused = true;
    }
}

let songTime = document.getElementById("currentSongInput");

let isRepeatOn = false;

function setTheVault(){
    isTheVaultOn = true;
}


let randomListShuffle = [];
currentSongAudio.addEventListener('ended', () => {
    if(isRepeatOn){
        currentSongAudio.currentTime = 0;
        currentSongAudio.play();
    }else{
        if(isTheVaultOn){
            playRandomSongForTheVault();
        }
        else if(isAutoPlayOn){
            if(isShuffleOn){
                // console.log("ShuffleOn");
                let currentPlaylistUl,currentPlaylistLength;

                if(nextSongBtn != 0){
                    currentPlaylistUl = nextSongBtn.parentElement.className;
                    currentPlaylistLength = nextSongBtn.parentElement.children.length;
                }else{
                    currentPlaylistUl = prevSongBtn.parentElement.className;
                    currentPlaylistLength = prevSongBtn.parentElement.children.length;
                }

                // console.log("UL: " + currentPlaylistUl);
                // console.log("Length: " + currentPlaylistLength);
                
                if(randomListShuffle.length >= currentPlaylistLength){
                    randomListShuffle = [];
                }
                while(true){
                    let g = Math.floor(Math.random() * currentPlaylistLength);
                    if(!randomListShuffle.includes(g)){
                        // console.log(document.getElementsByClassName(currentPlaylistUl)[0]);
                        document.getElementsByClassName(currentPlaylistUl)[0].children[g].children[1].click();
                        randomListShuffle.push(g);
                        break;
                    }
                }
            }
            else if(nextSongBtn != 0){
                nextSongBtn.children[1].click();
            }
        }
        else{
            let songPlayBtns = document.getElementsByName("songPlayButton");
    
            songPlayBtns.forEach((button) => {
                button.children[0].classList.remove("fa-circle-pause");
                button.children[0].classList.add("fa-circle-play");
            });
            
            currentSongBtn.classList.remove("songPlayingLi");

            isSongPaused = true;
        }
    }
});

let repeatBtn = document.getElementById("repeatBtn");
repeatBtn.addEventListener('click', () => {
    isRepeatOn = !isRepeatOn;
    // if(isShuffleOn){
    //     isShuffleOn = !isShuffleOn;
    //     shuffleBtn.classList.toggle("buttonTurnedOn");
    // }
    repeatBtn.classList.toggle("buttonTurnedOn");
});

// Set the seekbar and times relative to the songs current time
currentSongAudio.addEventListener('timeupdate', () =>{
    let musicCurr = currentSongAudio.currentTime;
    let musicDur = currentSongAudio.duration;

    // End Time
    let min = Math.floor(musicDur / 60);
    let sec = Math.floor(musicDur % 60);

    if(sec<10){
        sec = `0${sec}`;
    }
    
    document.getElementById("currentSongTimeLeft").innerHTML = `${min}:${sec}`;

    //Curr Time
    let min2 = Math.floor(musicCurr / 60);
    let sec2 = Math.floor(musicCurr % 60);

    if(sec2<10){
        sec2 = `0${sec2}`;
    }

    document.getElementById("currentSongTime").innerHTML = `${min2}:${sec2}`;

    let progressBar = parseInt((currentSongAudio.currentTime/currentSongAudio.duration)*100);
    //songTime.value = progressBar;

    let miniSeekBar = document.getElementById("miniSeekBar");
    miniSeekBar.style.width = progressBar + "%";


});

// songTime.addEventListener('change', ()=>{
//     var seekto = currentSongAudio.duration * (songTime.value / 100);
//     currentSongAudio.currentTime = seekto;
// })

// CHECK THE CHIPS ON SEARCH

let allChips = document.getElementsByName("allChip");

function checkTheChip(chipName){

    const searchListUl = document.querySelector('.searchList').children;

    allChips.forEach((chip) => {
        if(chip.checked){
            chip.classList.add("allchipCh");
            if(chipName == 'All'){
                for (let i = 0; i < searchListUl.length; i++) {
                    searchListUl[i].style.display = 'flex';
                }
            }
            else{
                let fullClassChip = chipName + 'ItemSearch';
                for (let i = 0; i < searchListUl.length; i++) {
                    if(searchListUl[i].classList.contains(fullClassChip)){
                        searchListUl[i].style.display = 'flex';
                    }else{
                        searchListUl[i].style.display = 'none';
                    }
                }
            }
        }else{
            chip.classList.remove("allchipCh");
        }
    })
}


// SCROLL ON PAGEBARS

let screenScrollables = document.getElementsByName("screenScrollable");
let sideBanner1 = document.getElementsByName("artistBanner")[0];
let sideBanner2 = document.getElementsByName("playlistBanner")[0];
let sideBanner3 = document.getElementsByName("catBanner")[0];

screenScrollables.forEach((screen) => {
    screen.addEventListener("scroll", ()=>{

        if(!reduceAnimations){
            if(screen.id != "screenScrollableCat"){
                if(screen.scrollTop < 0){
                    screen.children[2].children[0].classList.add('noAnimTransitions');
                    let newHeight = Number(-screen.scrollTop) + (500 + Number(getComputedStyle(document.documentElement).getPropertyValue("--topInsetArea").split('p')[0]));
                    screen.children[2].children[0].style.height = `${newHeight}px`;
                    if(screen.scrollTop > -120){
                        screen.children[2].children[1].style.opacity = 1;
                    }else{
                        screen.children[2].children[1].style.opacity = 0;
                    }
                }else{
                    screen.children[2].children[1].style.opacity = 1;
                    screen.children[2].children[0].classList.remove('noAnimTransitions');
                    screen.children[2].children[0].style.height = `calc(env(safe-area-inset-top) + 500px)`;
                }

                if(screen.scrollTop > 150){
                    let curOp = 1 - (screen.scrollTop/136 - 1);
                    screen.children[2].children[1].children[0].style.opacity = curOp;
                    screen.children[2].children[0].style.opacity = curOp;
                }else{
                    screen.children[2].children[1].children[0].style.opacity = 1;
                    screen.children[2].children[0].style.opacity = 1;
                }
            }else{
                if(screen.scrollTop > 130){
                    let curOp = 1 - (screen.scrollTop/125 - 1);
                    screen.children[3].children[0].style.opacity = curOp;
                }else{
                    screen.children[3].children[0].style.opacity = 1;
                }
            }
    
            if(screen.scrollTop > 268){
                screen.children[0].classList.add("pageBarOn");
                screen.children[1].classList.add("pageBarOn2");
            }else{
                screen.children[0].classList.remove("pageBarOn");
                screen.children[1].classList.remove("pageBarOn2");
            }
    
            if(screen.id != "screenScrollableCat"){
                screen.children[2].children[0].classList.add('noAnimTransitions');
                screen.children[2].children[0].style.transform = "translateY(-"+ screen.scrollTop / 3 +"px)";
            }else{
                screen.children[3].children[0].classList.add('noAnimTransitions');
                screen.children[3].children[0].style.transform = "translateY(-"+ screen.scrollTop / 4 +"px)";
            }
        }else{
            if(screen.scrollTop > 250){
                screen.children[0].classList.add("pageBarOn");
                screen.children[1].classList.add("pageBarOn2");
            }else{
                screen.children[0].classList.remove("pageBarOn");
                screen.children[1].classList.remove("pageBarOn2");
            }
        }

    })
})

// THE VAULT

function pausePlayCurrentSongVault(){

    let songPlayBtns = document.getElementsByName("songPlayButton");

    if(isSongPaused){
        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-play");
            button.children[0].classList.add("fa-circle-pause");
        });
        
        currentSongAudio.play();
        isSongPaused = false;
    }else{
        currentSongAudio.pause();

        songPlayBtns.forEach((button) => {
            button.children[0].classList.remove("fa-circle-pause");
            button.children[0].classList.add("fa-circle-play");
        });

        isSongPaused = true;
    }
}

// Make a Playlist

let makePlScreen = document.getElementsByClassName("makePlaylistScreen")[0];
let isMakePlOpen = false;

function OpenMakePlaylistScreen(){
    makePlScreen.classList.add("makePlaylistScreenOpen");
    document.getElementsByClassName(currentScreen)[0].classList.add("mainToSide");
}

function CloseMakePlaylistScreen(){
    makePlScreen.classList.remove("makePlaylistScreenOpen");
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");
}

function changeMakePlaylistName(text){
    if(text != ""){
        document.getElementsByClassName("currentMakePlaylistName")[0].innerHTML = text;
    }else{
        document.getElementsByClassName("currentMakePlaylistName")[0].innerHTML = "My Playlist";
    }
}

// ----- Close Popup

function openPopup(type,src,art,nam,id,isLikedPage){
    const popupWrapper = document.getElementById("popupWrapper");
    popupWrapper.classList.add("popupOpen");

    popupWrapper.focus();

    getArtistId(art.split(',')[0]);

    const songPopupBody = document.getElementsByClassName("songPopupBody")[0];
    const playlistPopupBody = document.getElementsByClassName("playlistPopupBody")[0];

    const popupImages = document.getElementsByName("popupImage");
    const popupSongTitle = document.getElementsByName("popupSongTitle");
    const popupArtist = document.getElementsByName("popupArtist");

    popupScreen.classList.remove("playerMovable");
    popupScreen.focus();
    popupScreen.style.top = 'auto';

    addToPlBtn.setAttribute('name', id);

    popupImages.forEach((image) => {
        image.src = src;
    })

    popupSongTitle.forEach((title) => {
        title.innerHTML = nam;
    })

    art = art.split(',')[0];
    popupArtist.forEach((artist) => {
        artist.innerHTML = art;
    })

    if(type === 'song'){
        songPopupBody.style.display = "block";
        playlistPopupBody.style.display = "none";
    }else{
        songPopupBody.style.display = "none";
        playlistPopupBody.style.display = "block";
    }

    seeIfSongIsLiked(id);

    let likeSongBtn = document.getElementById("likeSongBtn");
    likeSongBtn.addEventListener('click', () => {
        if(UserSignedIn()){
            addSongToLiked(id);
            likeSongBtn.classList.add("likeBtnAnim2");
            setTimeout(() => {
                likeSongBtn.classList.remove("likeBtnAnim2");
            }, 500);
        }else{
            openLoginPopup();
        }
    })
}

function closePopup(){
    const popupWrapper = document.getElementById("popupWrapper");
    popupWrapper.classList.remove("popupOpen");

    const popupMyPlaylists = document.querySelector('.popupMyPlaylists');
    popupScreen.classList.remove('popupPl');
    popupMyPlaylists.innerHTML = "";
    addToPlBtn.addEventListener('click', addToPlFunc);
}

// ----- SET APP THEME

let themePreference = window.matchMedia("(prefers-color-scheme: dark)");
const setAutoTheme = e => {
    if(e.matches){
        setDarkTheme();
        // console.log("Set to Dark!");
    }else{
        setLightTheme();
        // console.log("Set to Light!");
    }
}

setAppPMode();
setAutoTheme(themePreference);
themePreference.addEventListener('change', () => {
    setAutoTheme(themePreference);
});

function SelectAppTheme(){
    if(appThemeSelect.value == "dark"){
        setAppTheme('Dark');
    }else if(appThemeSelect.value == "light"){
        setAppTheme('Light');
    }else{
        setAppTheme('Auto');
    }
}

function setAppTheme(userTheme){

    if(userTheme === "Dark"){
        setDarkTheme();
    }else if(userTheme === "Light"){
        setLightTheme();
    }else{
        themePreference = window.matchMedia("(prefers-color-scheme: dark)");
        setAutoTheme(themePreference);
    }
}

function setDarkTheme(){

    document.documentElement.style.setProperty('--bodyBg', 'rgb(18, 14, 24)');
    document.documentElement.style.setProperty('--bodyBgMP', 'rgb(18, 14, 24)');
    document.documentElement.style.setProperty('--playerColor', '#211a27');
    document.documentElement.style.setProperty('--offWhite', '#DCD6F7');
    document.documentElement.style.setProperty('--darken', 'rgb(18, 14, 24)');
    document.documentElement.style.setProperty('--allChColor', '#302A40');
    document.documentElement.style.setProperty('--yoursBubbleColor', 'rgba(90, 0, 27, 0.7)');
    document.documentElement.style.setProperty('--offWhiteDark', '#8a85a1');
    document.documentElement.style.setProperty('--sidePageback', 'black');
    document.documentElement.style.setProperty('--mainColor', '#1A1724');
    document.documentElement.style.setProperty('--mainColorLighter', 'rgba(21, 19, 23, 0.6)');
    document.documentElement.style.setProperty('--secondaryColor', 'rgba(19, 19, 19, 0.45)');
    document.documentElement.style.setProperty('--latestReleaseBox', '#100e1c');
    document.documentElement.style.setProperty('--vibeVault', 'rgba(27, 12, 52, 0.5)');
    document.documentElement.style.setProperty('--popupScreenBg', 'linear-gradient(0deg, rgb(14, 11, 19), rgb(21, 17, 27))');
    if(isPerformanceModeOn){
        document.documentElement.style.setProperty('--footerBg', 'rgba(21, 17, 29, 1)');
    }else{
        document.documentElement.style.setProperty('--footerBg', 'rgba(21, 17, 29, 0.7)');
    }
    document.documentElement.style.setProperty('--footerBgHO', 'rgba(21, 17, 29, 1)');

    document.getElementsByName("accountPhoto").forEach((photo) => {
        photo.style.filter = "invert(0) brightness(1)";
    })

    accountTheme = "Dark";
}

function setLightTheme(){
    document.documentElement.style.setProperty('--bodyBg', '#ece8ff');
    document.documentElement.style.setProperty('--bodyBgMP', 'rgba(255, 255, 255, 0.4)');
    document.documentElement.style.setProperty('--playerColor', '#CFB7E3');
    document.documentElement.style.setProperty('--offWhite', '#100e1c');
    document.documentElement.style.setProperty('--offWhiteDark', '#100e1c');
    document.documentElement.style.setProperty('--darken', '#ede7ff');
    document.documentElement.style.setProperty('--allChColor', 'rgba(0, 0, 0, 0.2)');
    document.documentElement.style.setProperty('--yoursBubbleColor', 'rgba(134, 69, 255, 0.5)');
    document.documentElement.style.setProperty('--sidePageback', 'linear-gradient(0deg, #ece8ff, rgba(134, 69, 255, 0.1))');
    document.documentElement.style.setProperty('--mainColor', '#d3cdee');
    document.documentElement.style.setProperty('--mainColorLighter', 'rgba(255, 255, 255, 0.5)');
    document.documentElement.style.setProperty('--latestReleaseBox', 'rgb(0,0,0,0.2)');
    document.documentElement.style.setProperty('--vibeVault', 'rgba(169, 141, 215, 0.25)');
    document.documentElement.style.setProperty('--popupScreenBg', 'var(--darken)');
    document.documentElement.style.setProperty('--secondaryColor', 'rgba(230, 230, 230, 0.45)');
    if(isPerformanceModeOn){
        document.documentElement.style.setProperty('--footerBg', 'rgba(222, 213, 255, 1)');
    }else{
        document.documentElement.style.setProperty('--footerBg', 'rgba(222, 213, 255, 0.6)');
    }
    document.documentElement.style.setProperty('--footerBgHO', 'rgba(192, 179, 219, 1)');

    document.getElementsByName("accountPhoto").forEach((photo) => {
        photo.style.filter = "invert(1) brightness(0)";
    })

    accountTheme = "Light";
}

// ----- PLAYER OPEN / CLOSE

const movablePlayer = document.getElementsByClassName("player")[0];
const playerOpenDiv = document.getElementsByClassName("playerClickDiv")[0];
const playerOpenDiv2 = document.getElementsByClassName("playerClickDiv2")[0];
let offsetY,currentTouchPos = 0;
let playerTouchStarted = false, playerTouchStarted2 = false;
let moveStarted = true;
let playerNormalPos = movablePlayer.offsetTop;
let sidePageNormalPos = document.getElementsByClassName("loginScreen")[0].offsetLeft;

const move = (e) => {
    currentTouchPos = (e.touches[0].clientY - offsetY);
    if(currentTouchPos <= (-50)){
        return;
    }
    moveStarted = true;
    // Update div pos based on new cursor pos
    movablePlayer.style.top = `${e.touches[0].clientY - offsetY}px`;
    let opa = ((e.touches[0].clientY - offsetY) / window.outerWidth - 0.1);

    // Setting the transition to none on main and header
    document.getElementsByClassName(currentScreen)[0].classList.add("playerMovable");
    document.querySelector('header').classList.add("playerMovable");

    // Setting the opacity of main and header
    document.getElementsByClassName(currentScreen)[0].style.opacity = opa;
    document.querySelector('header').style.opacity = opa;
    // console.log("moved " + (e.touches[0].clientY - offsetY));
}

let isLyricsOn = false;
let startPopupOffsetTop = popupScreen.offsetTop;

// ----- CLOSE THE POPUP ADD TO PLAYLIST UL

const closePopupPlBtn = document.querySelector('#closePopupPlBtn');
closePopupPlBtn.addEventListener('click', () => {
    popupScreen.classList.remove("popupPl");
    if(window.innerHeight > window.innerWidth){
        popupScreen.style.top = "calc(" + startPopupOffsetTop + "px + env(safe-area-inset-top)";
    }
    setTimeout(() => {
        addToPlBtn.addEventListener('click', addToPlFunc);
    }, 100);
})

// ----- TEXT SCROLL ON OVERFLOW

const scrollTexts = document.getElementsByClassName("scrollText");

function isOverflown(element) {
    return element.scrollWidth > element.clientWidth;
}

// Create a new instance of 'MutationObserver' named 'observer', 
// Passing it a callback function
observer = new MutationObserver(function(mutationsList, observer) {
    mutationsList[0].target.classList.remove("scrollTextCl");
    if(isOverflown(mutationsList[0].target)){
        mutationsList[0].target.classList.add("scrollTextCl");
    }
});

// Call 'observe' on that MutationObserver instance, 
// Passing it the element to observe, and the options object
for (let i = 0; i < scrollTexts.length; i++) {
    observer.observe(scrollTexts[i].children[0], {characterData: false, childList: true, attributes: false});
}

// ----- Search -> YOURS SCREEN

function showSearchBarYours(searchOnBtn){
    document.getElementById('searchBarYours').classList.toggle('searchBarOn');
    if(searchOnBtn.innerHTML == `<i class="fa-solid fa-xmark" aria-hidden="true"></i>` || searchOnBtn.innerHTML == `<i class="fa-solid fa-xmark"></i>`){
        resetSearchScreenToNormal();
    }else{
        document.getElementById('searchYoursInput').focus();
        searchOnBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        document.querySelector('.favoritesItem').classList.add('displayNone');
        document.querySelector('.yourPlaylistsH1').classList.add('displayNone');
        document.querySelector('.yourPlaylists').classList.add('displayNone');
        document.querySelector('.yourLPlaylistsH1').classList.add('displayNone');
        document.querySelector('.yourLPlaylists').classList.add('displayNone');
        document.querySelector('.yourFArtistsH1').classList.add('displayNone');
        document.querySelector('.yourFArtists').classList.add('displayNone');
    }
}

function resetSearchScreenToNormal(){
    document.getElementById('searchYoursInput').value = "";

    document.getElementById('searchBarYours').classList.remove('searchBarOn');

    searchOnBtn = document.querySelector('.searchOnYoursBtn');
    searchOnBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    document.querySelector('.favoritesItem').classList.remove('displayNone');
    document.querySelector('.yourPlaylistsH1').classList.remove('displayNone');
    document.querySelector('.yourPlaylists').classList.remove('displayNone');
    document.querySelector('.yourLPlaylistsH1').classList.remove('displayNone');
    document.querySelector('.yourLPlaylists').classList.remove('displayNone');
    document.querySelector('.yourFArtistsH1').classList.remove('displayNone');
    document.querySelector('.yourFArtists').classList.remove('displayNone');

    const yourPlaylists = [].slice.call(document.querySelector('.yourPlaylists').children);
    yourPlaylists.forEach((playlist) => {
        playlist.classList.remove('displayNone');
    })

    const yourLPlaylists = [].slice.call(document.querySelector('.yourLPlaylists').children);
    yourLPlaylists.forEach((playlist) => {
        playlist.classList.remove('displayNone');
    })

    const yourFArtists = [].slice.call(document.querySelector('.yourFArtists').children);
    yourFArtists.forEach((artist) => {
        artist.classList.remove('displayNone');
    })

    const searchTypeChips = document.querySelector('.SearchTypeChips');
    searchTypeChips.style.display = 'none';
}

const submitYoursSearchBtn = document.getElementById("submitYoursSearch");
submitYoursSearchBtn.addEventListener('click', () => {
    const searchInput = document.getElementById('searchYoursInput').value;
    const yourPlaylists = [].slice.call(document.querySelector('.yourPlaylists').children);
    const yourLPlaylists = [].slice.call(document.querySelector('.yourLPlaylists').children);
    const yourFArtists = [].slice.call(document.querySelector('.yourFArtists').children);

    let brP = 0, brL = 0, brA = 0;
    if(searchInput != "" && searchInput != undefined){

        yourPlaylists.forEach((playlist) => {
            if(playlist.children[0].children[1].children[0].innerHTML.toLowerCase().includes(searchInput.toLowerCase()) || searchInput.toLowerCase().includes(playlist.children[0].children[1].children[0].innerHTML.toLowerCase())){
                playlist.classList.remove('displayNone');
                brP++;
            }else{
                playlist.classList.add('displayNone');
            }
        })

        yourLPlaylists.forEach((playlist) => {
            if(playlist.children[0].children[1].children[0].innerHTML.toLowerCase().includes(searchInput.toLowerCase()) || searchInput.toLowerCase().includes(playlist.children[0].children[1].children[0].innerHTML.toLowerCase())){
                playlist.classList.remove('displayNone');
                brL++;
            }else{
                playlist.classList.add('displayNone');
            }
        })

        yourFArtists.forEach((artist) => {
            if(artist.children[1].innerHTML.toLowerCase().includes(searchInput.toLowerCase()) || searchInput.toLowerCase().includes(artist.children[1].innerHTML.toLowerCase())){
                artist.classList.remove('displayNone');
                brA++;
            }else{
                artist.classList.add('displayNone');
            }
        })

        if(brP != 0){
            document.querySelector('.yourPlaylistsH1').classList.remove('displayNone');
            document.querySelector('.yourPlaylists').classList.remove('displayNone');
            brP = 0;
        }else{
            document.querySelector('.yourPlaylistsH1').classList.add('displayNone');
            document.querySelector('.yourPlaylists').classList.add('displayNone');
        }

        if(brL != 0){
            document.querySelector('.yourLPlaylistsH1').classList.remove('displayNone');
            document.querySelector('.yourLPlaylists').classList.remove('displayNone');
            brP = 0;
        }else{
            document.querySelector('.yourLPlaylistsH1').classList.add('displayNone');
            document.querySelector('.yourLPlaylists').classList.add('displayNone');
        }

        if(brA != 0){
            document.querySelector('.yourFArtistsH1').classList.remove('displayNone');
            document.querySelector('.yourFArtists').classList.remove('displayNone');
            brA = 0;
        }else{
            document.querySelector('.yourFArtistsH1').classList.add('displayNone');
            document.querySelector('.yourFArtists').classList.add('displayNone');
        }
    }
});

// ------ Login Popup

let isLoginPopupOn = false;

function openLoginPopup(){
    if(!isLoginPopupOn){
        document.getElementsByClassName('loginPopup')[0].classList.add('loginPopupOn');
        setTimeout(() => {
            document.getElementsByClassName('loginPopup')[0].classList.remove('loginPopupOn');
            isLoginPopupOn = false;
        }, 2500);
        isLoginPopupOn = true;
    }
}

// function closeLoginPopup(){
//     document.getElementsByClassName('loginPopup')[0].classList.remove('loginPopupOn');
//     isLoginPopupOn = false;
// }

// ----- Search sticky

const stickyElm = document.querySelector('#searchScreenBar');

const observer2 = new IntersectionObserver( 
  ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
  {threshold: [1]}
);

observer2.observe(stickyElm);

// ----- PC player seek

const miniSeek = document.querySelector('.miniSeek');
miniSeek.addEventListener('click', (e) => {
    var rect = e.target.getBoundingClientRect();
    let procent = (e.clientX - rect.left) / miniSeek.clientWidth;
    procent = Math.round(procent * 100);
    let seekto = currentSongAudio.duration * (procent / 100);
    currentSongAudio.currentTime = seekto;
})

// ----- BUG REPORT SCREEN

let isBugReportScreenOpen = false;
let bugReportScreen = document.getElementsByClassName("bugReportScreen")[0];

function openBugReport(){
    document.getElementsByClassName(currentScreen)[0].classList.add("mainToSide");

    bugReportScreen.classList.add("bugReportScreenOpen");

    isBugReportScreenOpen = true;
}

function closeBugScreen(){
    document.getElementsByClassName(currentScreen)[0].classList.remove("mainToSide");

    bugReportScreen.classList.remove("bugReportScreenOpen");

    isBugReportScreenOpen = false;
}

// SCROLL ARROWS IN OVERFLOW DIVS

function scrollLeftIn(inDivClass){
    let inDiv = document.querySelector(`.${inDivClass}`);
    inDiv.scrollLeft -= 200;
}

function scrollRightIn(inDivClass){
    let inDiv = document.querySelector(`.${inDivClass}`);
    inDiv.scrollLeft += 200;
}

function noStorage(){
    document.querySelector('.noStorageMessage').style.display = 'flex';
}

// Drag NavBar

const navPullPoint = document.querySelector('.navPullPoint');
let isPullingNav = false;
let pullStartPoint;
let navBarMode = 'small';

navPullPoint.addEventListener('mousedown', (e) => {
    // console.log("start: " + e.clientX);
    pullStartPoint = e.clientX;
    isPullingNav = true;
})

document.addEventListener("mousemove", (e) => {
    if(isPullingNav){
        // console.log("end: " + e.clientX);

        let diff = e.clientX - pullStartPoint;
        if(navBarMode == "small"){
            if(diff > 150){
                // console.log("Bar ready");
                navPullPoint.parentElement.classList.add('navBigBig');
                let mainies = document.getElementsByTagName('main');
                for (let i = 0; i < mainies.length; i++) {
                    mainies[i].classList.add('navBigMain');
                }
    
                let asides = document.getElementsByTagName('aside');
                for (let i = 0; i < asides.length; i++) {
                    asides[i].classList.add('sidePageNavBig');
                }
    
                document.querySelector('.player').classList.add('navBigPlayer');

                navBarMode = "big";

                isPullingNav = false;
            }
        }else{
            diff = Math.abs(diff);
            if(diff > 90){
                // console.log("Bar ready");
                navPullPoint.parentElement.classList.remove('navBigBig');
                let mainies = document.getElementsByTagName('main');
                for (let i = 0; i < mainies.length; i++) {
                    mainies[i].classList.remove('navBigMain');
                }
    
                let asides = document.getElementsByTagName('aside');
                for (let i = 0; i < asides.length; i++) {
                    asides[i].classList.remove('sidePageNavBig');
                }
    
                document.querySelector('.player').classList.remove('navBigPlayer');

                navBarMode = "small";

                isPullingNav = false;
            }
        }

        // console.log("diff: " + diff);
    }
})

document.addEventListener("mouseup", (e) => {
    isPullingNav = false;
})