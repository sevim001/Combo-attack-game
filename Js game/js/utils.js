function rectangulaarCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackbox.position.x + player.attackbox.width >=
      rectangle2.position.x &&
    rectangle1.attackbox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackbox.position.y + rectangle1.attackbox.height >=
      rectangle2.position.y &&
    rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function detectthewinner({ enemy, player, timerid }) {
  clearTimeout(timerid);
  if (player.health === enemy.health) {
    document.querySelector("#call-timer").innerHTML = "tie";
    document.querySelector("#call-timer").style.display = "flex";
  } else if (player.health > enemy.health) {
    document.querySelector("#call-timer").innerHTML = "player 1 wins";
    document.querySelector("#call-timer").style.display = "flex";
  } else if (player.health < enemy.health) {
    document.querySelector("#call-timer").innerHTML = "player 2 wins";
    document.querySelector("#call-timer").style.display = "flex";
  }
}

let timer = 60;
let timerid;
function decreasetimer() {
  if (timer > 0) {
    timerid = setTimeout(decreasetimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    detectthewinner({ enemy, player, timerid });
  }
}
