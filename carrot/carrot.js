"use strict";

const $field = document.querySelector(".field");
const $timer = document.querySelector(".timer");
const $start = document.querySelector(".play_pause");
const $count = document.querySelector(".count");
const $icon = document.querySelector(".play_pause i");
const $gameOver = document.querySelector(".gameover");
const $span = document.querySelector(".gameover span");
const bgm = new Audio("sound/bg.mp3");

// bgm 재생여부
let bgmPlay = false;
// 시간 카운트 setInterval Id 저장함수
let timer = null;
// 시간 카운트 : 20초부터 --
let count = 20;
let carrots = -1;

const random = () => {
  // transform x y 좌표 랜덤 생성
  const left = Math.floor(Math.random() * 800 + 1); // width 랜덤좌표
  const top = Math.floor(Math.random() * 250 + 1); // top 랜덤좌표

  const data = [left, top];
  return data;
};

const startGame = () => {
  $span.textContent = "GAME OVER";

  // bug 20개, carrot 15개 생성
  for (let i = 0; i < 20; i++) {
    const $cloneBug = document.createElement("img");
    $cloneBug.setAttribute("src", "img/bug.png");
    $cloneBug.setAttribute("class", "bug");
    let coordinate = random();
    $cloneBug.style.transform = `translate(${coordinate[0]}px, ${coordinate[1]}px)`;
    $field.appendChild($cloneBug);
  }

  for (let i = 0; i < 15; i++) {
    const $cloneCarrot = document.createElement("img");
    $cloneCarrot.setAttribute("src", "img/carrot.png");
    $cloneCarrot.setAttribute("class", "carrot");
    let coordinate = random();
    $cloneCarrot.style.transform = `translate(${coordinate[0]}px, ${coordinate[1]}px)`;
    $field.appendChild($cloneCarrot);
  }

  // carrot length 변수 할당
  const $carrots = document.getElementsByClassName("carrot");
  carrots = $carrots.length;
  document.querySelector(".count").textContent = carrots;

  $timer.textContent = `${count}`;
  count--;
  timer = setInterval(() => {
    $timer.textContent = `${count}`;
    count--;

    if (count <= 4) {
      $timer.style.color = "red";
    }

    if (count === -1) {
      new Audio("sound/alert.wav").play();
      $gameOver.style.visibility = "visible";
      initialize();
    }
  }, 1000);
};

const initialize = () => {
  $icon.setAttribute("class", "fas fa-play-circle");
  clearInterval(timer);
  $timer.textContent = 0;
  $count.textContent = 0;
  $field.querySelectorAll("img").forEach((value) => value.remove());
  $timer.style.color = "black";
  count = 20;
};

$start.addEventListener("click", () => {
  if ($icon.className === "fas fa-stop-circle") {
    initialize();
    return;
  }

  $icon.setAttribute("class", "fas fa-stop-circle");
  $gameOver.style.visibility = "hidden";
  if (!bgmPlay) {
    bgmPlay = true;
    bgm.play();
    bgm.addEventListener("ended", () => {
      bgm.currentTime = 0;
      bgm.play();
    });
  }

  startGame();
});

$field.addEventListener("click", (event) => {
  if (event.target.className === "carrot") {
    new Audio("sound/carrot_pull.mp3").play();
    event.target.remove();
    carrots--;
    $count.textContent = carrots;
  }

  if (carrots === 0) {
    carrots--;
    new Audio("sound/game_win.mp3").play();
    $span.textContent = "YOU WIN!";
    $gameOver.style.visibility = "visible";
    initialize();
  }

  if (event.target.className === "bug") {
    new Audio("sound/bug_pull.mp3").play();
    $gameOver.style.visibility = "visible";
    initialize();
  }

  if (event.target.tagName === "BUTTON") {
    $gameOver.style.visibility = "hidden";
    $icon.setAttribute("class", "fas fa-stop-circle");
    startGame();
  }
});

// 웹 브라우저 정책으로 인하여 로드될 시 자동재생이 비권장됨
// addEventListener("load", () => {
//   const bgm = new Audio("sound/bg.mp3");
//   bgm.addEventListener("ended", () => {
//     bgm.currentTime = 0;
//     bgm.play();
//   });
//   bgm.play();
// });
