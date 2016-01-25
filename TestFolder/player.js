var Player = new (function () {
	function Player(x, y) {
		this.position = new Vector2(x, y);
		this.velocity = 2;
		this.width = 32;
		this.height = 33;
		this.row = 0;
		this.col = 0;
		this.numberOfFrames = 5;
		this.movement = {left: false, right: false};
		this.isSetLeftAnimation = false;
		this.isSetRightAnimation = false;
		this.animation = new Animation(this.width, this.height, this.row, this.col, this.numberOfFrames, 'sprites.png', 10, 23, 1);
		this.boundingBox = new Rectangle(x, y, this.width, this.height);
	}

	Player.prototype.update = function () {
		if (this.movement.left) {
			this.position.x -= this.velocity;
		} else if (this.movement.right) {
			this.position.x += this.velocity;
		}

		this.animation.position.set(this.position.x, this.position.y);
		//this.boundingBox.position.x = this.position.x;
		//this.boundingBox.position.y = this.position.y;

		this.animation.update();
	};

	Player.prototype.render = function (ctx) {
		this.animation.draw(ctx);
	};

	Player.prototype.updateAnimationSettings = function () {
		if (this.movement.left && !this.isSetLeftAnimation) {
			this.isSetLeftAnimation = true;
			this.isSetRightAnimation = false;
			this.animation.setColumn(11);
			this.animation.setLimit(5);
		} else if (this.movement.right && !this.isSetRightAnimation) {
			this.isSetRightAnimation = true;
			this.isSetLeftAnimation = false;
			this.animation.setColumn(0);
			this.animation.setLimit(5);
		} else if (!this.movement.right && !this.movement.left) {
			this.isSetLeftAnimation = false;
			this.isSetRightAnimation = false;
			this.animation.setColumn(5);
			this.animation.setLimit(0);
		}

		this.update();
	};

	return Player;
});