define(function() {
	var START_LIFE_COUNT = 3;
	var lives = START_LIFE_COUNT;
	var score = 0;
	var speed = 1;
	var sprite = undefined;
	var playerPos = undefined;
	var game = undefined;
	var scales = {
		x : 1,
		y : 1
	};
	var reset = function() {
	    lives = START_LIFE_COUNT;
	    score = 0;
	};
	return {
		create : function(_game, _playerPos, _scales) {
			reset();
			game = _game;
			playerPos = _playerPos;
			scales = _scales;
			var spriteX = playerPos.x * 10 * scales.x;
			var spriteY = playerPos.y * 10 * scales.y;
			sprite = game.add.sprite(spriteX, spriteY, "player-normal");
			sprite.name = 'Player';
			sprite.scale.setTo(scales.x * 0.90, scales.y * 0.90);
	        sprite.body.collideWorldBounds = true;
		},
		update : function() {

			//player.animations.play('spawn');
			// Player controls
	        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	        {
        		//sprite.body.velocity.y = -200;
	            sprite.body.x -= speed * scales.x;
	        }
	        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	        {
	            sprite.body.x += speed * scales.x;
	        }

	        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
	        {
	            sprite.body.y -= speed * scales.y;
	        }
	        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
	        {
				sprite.body.y += speed * scales.y;
	        }
		},
		getGameObject : function() {
			return sprite;
		},
		bulletHit : function() {
	    	// TODO: blink player, reduce life, check game over etc etc
	        sprite.body.velocity.x = 0;
	        sprite.body.velocity.y = 0;
	        lives--;
	        if(lives < 1) {

				var text = "- Game over man, GAME OVER! -";
				var style = { font: "65px Arial", fill: "#ff0000", align: "center" };

				var t = game.add.text(game.world.centerX, game.world.centerY, text, style);
				t.anchor.setTo(0.5, 0.5);
				console.log(t);
				game.stage.visibilityChange({type: 'pagehide'});
				setTimeout(function() {
					game.stage.visibilityChange({type: 'pageshow'});
					// maybe cleanup t
					t.destroy();
					game.state.start('title', true, true);
				}, 5000);
	        }
		}
	};
});