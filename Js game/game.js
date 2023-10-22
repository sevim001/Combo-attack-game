const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.5;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imagesrc: "./img/background.png",
});
const shop = new Sprite({
  position: {
    x: -600,
    y: 129,
  },
  imagesrc: "./img/shop.png",
  scale: 2.75,
  framemax: 6,
});
const player = new fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imagesrc: "./img/samuraiMack/Idle.png",
  framemax: 8,
  scale: 2.5,
  offSet: {
    x: 50,
    y: 96,
  },
  sprites: {
    idle: {
      imagesrc: "./img/samuraiMack/Idle.png",
      framemax: 8,
    },
    run: {
      imagesrc: "./img/samuraiMack/Run.png",
      framemax: 8,
    },
    jump: {
      imagesrc: "./img/samuraiMack/Idle.png",
      framemax: 8,
    },
    fall: {
      imagesrc: "./img/samuraiMack/Idle.png",
      framemax: 8,
    },
    attack1: {
      imagesrc: "./img/samuraiMack/Attack1.png",
      framemax: 8,
    },
    takehit: {
      imagesrc: "./img/samuraiMack/Take Hit - white silhouette.png",
      framemax: 4,
    },
    death: {
      imagesrc: "./img/samuraiMack/Death.png",
      framemax: 5,
    },
  },
  attackbox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 160,
    height: 50,
  },
});

const enemy = new fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },

  color: "blue",

  offset: {
    x: -50,
    y: 0,
  },
  imagesrc: "./img/Kenji/Idle.png",
  framemax: 4,
  scale: 2.5,
  offSet: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imagesrc: "./img/Kenji/Idle.png",
      framemax: 4,
    },
    run: {
      imagesrc: "./img/Kenji/Run.png",
      framemax: 8,
    },
    jump: {
      imagesrc: "./img/Kenji/Jump.png",
      framemax: 2,
    },
    fall: {
      imagesrc: "./img/Kenji/Fall.png",
      framemax: 2,
    },
    attack1: {
      imagesrc: "./img/Kenji/Attack1.png",
      framemax: 4,
    },
    takehit: {
      imagesrc: "./img/Kenji/take hit.png",
      framemax: 3,
    },
    death: {
      imagesrc: "./img/Kenji/Death.png",
      framemax: 7,
    },
  },
  attackbox: {
    offset: {
      x: -160,
      y: 50,
    },
    width: 160,
    height: 50,
  },
});

console.log(player);
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

decreasetimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;
  //player movment

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }
  //detect for collision

  if (
    rectangulaarCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isattacking &&
    player.framecurrent === 4
  ) {
    enemy.takehit();
    player.isattacking = false;
    gsap.to("#enemy-health" , {width: enemy.health + "%"})
  }
  if (
    rectangulaarCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isattacking &&
    player.framecurrent === 2
  ) {
    player.takehit();
    enemy.isattacking = false;
    gsap.to("#player-health" , {width: player.health + "%"})
  }
  if (enemy.health <= 0 || player.health <= 0) {
    detectthewinner({ enemy, player, timerid });
  }
}
animate();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    console.log(event.key);
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        keys.a.pressed = true;
        player.velocity.y = -15;
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead){
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      enemy.velocity.y = -15;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }}
  console.log(event.key);
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  console.log(event.key);
});
