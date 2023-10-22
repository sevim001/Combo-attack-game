class Sprite {
  constructor({
    position,
    imagesrc,
    scale = 1,
    framemax = 1,
    offSet = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imagesrc;
    this.scale = scale;
    this.framemax = framemax;
    this.framecurrent = 0;
    this.framelaps = 0;
    this.framehold = 5;
    this.offSet = offSet;
  }

  draw() {
    c.drawImage(
      this.image,
      this.framecurrent * (this.image.width / this.framemax),
      0,
      this.image.width / this.framemax,
      this.image.height,
      this.position.x - this.offSet.x,
      this.position.y - this.offSet.y,
      (this.image.width / this.framemax) * this.scale,
      this.image.height * this.scale
    );
  }
  animateframe() {
    this.framelaps++;
    if (this.framelaps % this.framehold === 0) {
      if (this.framecurrent < this.framemax - 1) {
        this.framecurrent++;
      } else {
        this.framecurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this, this.animateframe();
  }
}

class fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imagesrc,
    scale = 1,
    framemax = 1,
    offSet = { x: 0, y: 0 },
    sprites,
    attackbox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imagesrc,
      scale,
      framemax,
      offSet,
    });
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackbox.offset,
      width: attackbox.width,
      height: attackbox.height,
    };
    this.color = color;
    this.isattacking;
    this.health = 100;
    this.framecurrent = 0;
    this.framelaps = 0;
    this.framehold = 5;
    this.sprites = sprites;
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imagesrc;
    }
  }

  update() {
    this.draw();
    this.animateframe();
    if(this.dead ) this.animateframe()
    this.attackbox.position.x = this.position.x + this.attackbox.offset.x;
    this.attackbox.position.y = this.position.y + this.attackbox.offset.y;

    // c.fillRect(this.attackbox.position.x , this.attackbox.position.y,this.attackbox.width,this.attackbox.height)
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
      this.position.y = 331;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.switchSprite("attack1");
    this.isattacking = true;
  }
  takehit() {
    this.health -= 20;
    if (this.health <= 0) {
      this.switchSprite("death");
    } else this.switchSprite("takehit");
  }
  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if(this.framecurrent =this.sprites.death.framemax -1)
      this.dead =true
      return};

    if (
      this.image === this.sprites.attack1.image &&
      this.framecurrent < this.sprites.attack1.framemax - 1
    )
      return;

    if (
      this.image === this.sprites.takehit.image &&
      this.framecurrent < this.sprites.takehit.framemax - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framemax = this.sprites.idle.framemax;
          this.framecurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framemax = this.sprites.run.framemax;
          this.framecurrent = 0;
        }
        break;

      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framemax = this.sprites.jump.framemax;
          this.framecurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framemax = this.sprites.fall.framemax;
          this.framecurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framemax = this.sprites.attack1.framemax;
          this.framecurrent = 0;
        }
        break;
      case "takehit":
        if (this.image !== this.sprites.takehit.image) {
          this.image = this.sprites.takehit.image;
          this.framemax = this.sprites.takehit.framemax;
          this.framecurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framemax = this.sprites.death.framemax;
          this.framecurrent = 0;
        }
        break;
    }
  }
}
