let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    name: "bloody mary (dum dum, da-di-da) - lady gaga [edit audio]",
    music:
      "../music/bloody mary (dum dum, da-di-da) - lady gaga [edit audio].mp3",
  },
  {
    name: "brazilian phonk mano - slowboy [edit audio]",
    music: "../music/brazilian phonk mano - slowboy [edit audio].mp3",
  },
  {
    name: "cant hold us (southend revolution remix) - macklemore ryan lewis ft. ray dalton [edit audio] [TubeRipper.com]",
    music:
      "../music/cant hold us (southend revolution remix) - macklemore ryan lewis ft. ray dalton [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "collide - justine skye ft. tyga [edit audio]",
    music: "../music/collide - justine skye ft. tyga [edit audio].mp3",
  },
  {
    name: "demons in my soul - scxr soul x sx1nxwy [edit audio]",
    music: "../music/demons in my soul - scxr soul x sx1nxwy [edit audio].mp3",
  },
  {
    name: "dernière danse x the real slim shady - indila eminem [edit audio] [TubeRipper.com]",
    music:
      "../music/dernière danse x the real slim shady - indila eminem [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "devil eyes - zodvik [edit audio]",
    music: "../music/devil eyes - zodvik [edit audio].mp3",
  },
  {
    name: "Drake - One Dance (audio edit)",
    music: "../music/Drake - One Dance (audio edit).mp3",
  },
  {
    name: "enemy - imagine dragons jid [edit audio] [TubeRipper.com]",
    music:
      "../music/enemy - imagine dragons jid [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "enemy x genius - imagine dragons lsd [edit audio] [TubeRipper.com]",
    music:
      "../music/enemy x genius - imagine dragons lsd [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "fairytale - alexander rybak [edit audio]",
    music: "../music/fairytale - alexander rybak [edit audio].mp3",
  },
  {
    name: "heat waves - glass animals x highcloud cover [edit audio]",
    music:
      "../music/heat waves - glass animals x highcloud cover [edit audio].mp3",
  },
  {
    name: "industry baby x e.t. - lil nas x katy perry [edit audio] [TubeRipper.com]",
    music:
      "../music/industry baby x e.t. - lil nas x katy perry [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "jalebi baby x gta s.a - tesher [edit audio] [TubeRipper.com]",
    music:
      "../music/jalebi baby x gta s.a - tesher [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "kiss me more x bananza (belly dancer) - doja cat ft. sza akon [edit audio] [TubeRipper.com]",
    music:
      "../music/kiss me more x bananza (belly dancer) - doja cat ft. sza akon [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "LIFE IN RIO (BRAZILIAN PHONK) - SLOWBOY [EDIT AUDIO]",
    music: "../music/LIFE IN RIO (BRAZILIAN PHONK) - SLOWBOY [EDIT AUDIO].mp3",
  },
  {
    name: "living life in the night - cheriimoya, sierra kidd [edit audio]",
    music:
      "../music/living life in the night - cheriimoya, sierra kidd [edit audio].mp3",
  },
  {
    name: "metamorphosis - interworld [edit audio] [TubeRipper.com]",
    music:
      "../music/metamorphosis - interworld [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "money trees - kendrick lamar ft. jay rock [edit audio]",
    music:
      "../music/money trees - kendrick lamar ft. jay rock [edit audio].mp3",
  },
  {
    name: "montero (call me by your name) - lil nas x [edit audio]",
    music:
      "../music/montero (call me by your name) - lil nas x [edit audio].mp3",
  },
  {
    name: "murder in my mind - kordhell [edit audio]",
    music: "../music/murder in my mind - kordhell [edit audio].mp3",
  },
  {
    name: "my ordinary life - the living tombstoneedit audio [TubeRipper.com]",
    music:
      "../music/my ordinary life - the living tombstoneedit audio [TubeRipper.com].mp3",
  },
  {
    name: "no lie - sean paul ft. dua lipa [edit audio] [TubeRipper.com]",
    music:
      "../music/no lie - sean paul ft. dua lipa [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "often (kygo remix) - the weeknd [edit audio]",
    music: "../music/often (kygo remix) - the weeknd [edit audio].mp3",
  },
  {
    name: "one kiss x i was never there - dua lipa the weeknd [edit audio] [TubeRipper.com]",
    music:
      "../music/one kiss x i was never there - dua lipa the weeknd [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "one kiss x stereo love - edward maya dua lipa [edit audio] [TubeRipper.com]",
    music:
      "../music/one kiss x stereo love - edward maya dua lipa [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "on my own - darci [edit audio]",
    music: "../music/on my own - darci [edit audio].mp3",
  },
  {
    name: "rockstar (crankdat remix) - post malone ft. 21 savage [edit audio]",
    music:
      "../music/rockstar (crankdat remix) - post malone ft. 21 savage [edit audio].mp3",
  },
  {
    name: "scopin - kordhell [edit audio]",
    music: "../music/scopin - kordhell [edit audio].mp3",
  },
  {
    name: "slow motion (sped up) - amaria bb [edit audio]",
    music: "../music/slow motion (sped up) - amaria bb [edit audio].mp3",
  },
  {
    name: "stereo love - edward maya vika jigulina [edit audio] [TubeRipper.com]",
    music:
      "../music/stereo love - edward maya vika jigulina [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "such a whre - jvla [edit audio] [TubeRipper.com]",
    music: "../music/such a whre - jvla [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "the lost soul down x lost soul [edit audio]",
    music: "../music/the lost soul down x lost soul [edit audio].mp3",
  },
  {
    name: "the real slim shady - eminem [edit audio] [TubeRipper.com]",
    music:
      "../music/the real slim shady - eminem [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "under the influence - chris brown [edit audio]",
    music: "../music/under the influence - chris brown [edit audio].mp3",
  },
  {
    name: "under the influence x i was never there - chris brown the weeknd [edit audio] [TubeRipper.com]",
    music:
      "../music/under the influence x i was never there - chris brown the weeknd [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "under the influence x renegade - chris brown aaryan shah [edit audio] [TubeRipper.com]",
    music:
      "../music/under the influence x renegade - chris brown aaryan shah [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "vur yüreğim x gangsta s paradise - coolio [edit audio]",
    music:
      "../music/vur yüreğim x gangsta s paradise - coolio [edit audio].mp3",
  },
  {
    name: "way down we go (instrumental) - kaleo [edit audio]",
    music: "../music/way down we go (instrumental) - kaleo [edit audio].mp3",
  },
  {
    name: "whoopty - cj [edit audio] [TubeRipper.com]",
    music: "../music/whoopty - cj [edit audio] [TubeRipper.com].mp3",
  },
  {
    name: "worth it (instrumental) - fifth harmony ft. kid ink [edit audio]",
    music:
      "../music/worth it (instrumental) - fifth harmony ft. kid ink [edit audio].mp3",
  },
  {
    name: "ты и я (tiktok remix) - xcho [edit audio]",
    music: "../music/ты и я (tiktok remix) - xcho [edit audio].mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
