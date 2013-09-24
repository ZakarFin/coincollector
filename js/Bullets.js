define(['util'], function(util) {
	var timer = 0;
	var interval = 2000;
	var game = undefined;
	var bullets = undefined;
	var scales = {
		x : 1,
		y: 1
	};
	var levelSize  = {
		x : 0,
		y : 0
	};
    function resetBullet(bullet) {
    		//  Called if the bullet goes out of the screen
        	bullet.kill();
    }
	return {
		create : function(_game, _levelSize, _scales) {
			game = _game;
			scales = _scales;
			levelSize = _levelSize;
	        bullets = game.add.group();
	        for (var i = 0; i < 10; i++)
	        {
				var bullet = bullets.create(-20, 200, 'bullet');
		        bullet.exists = false;
		        bullet.visible = false;
		        bullet.events.onOutOfBounds.add(resetBullet, this);
				bullet.scale.setTo(scales.x * 0.90, scales.y * 0.90);
	       	}
		},
    	update : function(player) {
        	game.physics.collide(player.getGameObject(), bullets, function(playerObj, bullet) {
		        bullet.kill();
		        player.bulletHit();
        	});

	        if (game.time.now > timer)
	        {
	        	// crashes if there are no bullets free == all on screen when calling this
	            var bullet = bullets.getFirstExists(false);

	            if (bullet)
	            {
					var spriteX = -20; //randomFromInterval(0,level[0].length) * 10 * scaleX;
					var spriteY = util.randomFromInterval(0,levelSize.y) * 10 * scales.y;
	                bullet.reset(spriteX, spriteY);
	                bullet.velocity.x = 50 * scales.x;
					//game.add.tween(bullet).to({ x: game.width }, 3000, Phaser.Easing.Linear.None, true);
	                timer = game.time.now + interval;
	            }
	        }
    	}
	};
});