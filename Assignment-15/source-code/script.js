let time = 0;
let timer;

// show time
function show() {
  let h = Math.floor(time / 3600);
  let m = Math.floor(time / 60) % 60;
  let s = time % 60;

  document.getElementById("time").innerText =
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");
}

// start
function start() {
  if (timer) return; // already running

 timer = setInterval(() => {
    time += 1;
    show();
  }, 1000);
}

// stop
function stop() {
  clearInterval(timer);
  timer = null;
}

// reset
function reset() {
  stop();
  time = 0;
  show();
}

// first display
show();
