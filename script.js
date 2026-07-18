const COLORS = [
  { name: "Red", hex: "#e5383b" },
  { name: "Blue", hex: "#1d7bd6" },
  { name: "Yellow", hex: "#f5c518" },
  { name: "Green", hex: "#2ba84a" },
];

const LIMBS = ["Left hand", "Right hand", "Left foot", "Right foot"];

const callColor = document.getElementById("callColor");
const callLimb = document.getElementById("callLimb");
const colorDot = document.getElementById("colorDot");
const ringProgress = document.getElementById("ringProgress");
const ringTime = document.getElementById("ringTime");
const historyList = document.getElementById("historyList");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const intervalRange = document.getElementById("intervalRange");
const intervalValue = document.getElementById("intervalValue");
const voiceToggle = document.getElementById("voiceToggle");
const noRepeatToggle = document.getElementById("noRepeatToggle");

const RING_CIRCUMFERENCE = 339.3;

let intervalSeconds = Number(intervalRange.value);
let secondsLeft = intervalSeconds;
let timerId = null;
let running = false;
let lastCall = null;

function pickCall() {
  let color, limb;
  do {
    color = COLORS[Math.floor(Math.random() * COLORS.length)];
    limb = LIMBS[Math.floor(Math.random() * LIMBS.length)];
  } while (
    noRepeatToggle.checked &&
    lastCall &&
    color.name === lastCall.color.name &&
    limb === lastCall.limb
  );
  return { color, limb };
}

function speak(text) {
  if (!voiceToggle.checked || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function announce() {
  const call = pickCall();
  lastCall = call;

  callLimb.textContent = call.limb;
  callColor.textContent = call.color.name;
  colorDot.style.backgroundColor = call.color.hex;
  ringProgress.style.stroke = call.color.hex;

  const li = document.createElement("li");
  li.textContent = `${call.limb} - ${call.color.name}`;
  historyList.appendChild(li);
  historyList.scrollTop = historyList.scrollHeight;

  speak(`${call.limb}, ${call.color.name}`);

  secondsLeft = intervalSeconds;
  updateRing();
}

function updateRing() {
  ringTime.textContent = secondsLeft;
  const fraction = secondsLeft / intervalSeconds;
  ringProgress.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - fraction);
}

function tick() {
  secondsLeft -= 1;
  if (secondsLeft <= 0) {
    announce();
  } else {
    updateRing();
  }
}

function start() {
  if (running) return;
  running = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  pauseBtn.textContent = "Pause";
  announce();
  timerId = setInterval(tick, 1000);
}

function pause() {
  if (!running) return;
  running = false;
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  window.speechSynthesis.cancel();
}

function reset() {
  pause();
  lastCall = null;
  secondsLeft = intervalSeconds;
  callLimb.textContent = "Ready?";
  callColor.textContent = "Press Start";
  colorDot.style.backgroundColor = "#d1d5db";
  ringProgress.style.stroke = "#2ba84a";
  updateRing();
  historyList.innerHTML = "";
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);

nextBtn.addEventListener("click", () => {
  announce();
  if (running) {
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
  }
});

intervalRange.addEventListener("input", () => {
  intervalSeconds = Number(intervalRange.value);
  intervalValue.textContent = `${intervalSeconds}s`;
  if (!running) {
    secondsLeft = intervalSeconds;
    updateRing();
  }
});

updateRing();
