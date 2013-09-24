define(['Level', 'Player', 'Bullets'], function(level, player, bullets) {

	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    width = (w.innerWidth || e.clientWidth || g.clientWidth) - 20,
	    height = (w.innerHeight|| e.clientHeight|| g.clientHeight) - 20;

	var game = new Phaser.Game(width, height, Phaser.AUTO, 'gamearea');

    var mainMenu = {
		create : function() {
				var text = "Control with arrow keys, press space to continue";
				var style = { font: "32px Arial", fill: "#ff0000", align: "center" };

				var t = game.add.text(game.world.centerX, game.world.centerY, text, style);
				t.anchor.setTo(0.5, 0.5);
		},
		update : function() {
	        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	        {
            	game.state.start('play', true, true);
	        }
		}
    };

	var gamePlay = {
		preload : function() {
			game.load.image('wall', 'pics/wall.gif');
			game.load.image('coin', 'pics/coin.gif');
			game.load.image('exit_closed', 'pics/exit1.gif');
			game.load.image('exit_open', 'pics/exit2.gif');
			game.load.image('bullet', 'pics/bullet_white.gif');
			//player
			game.load.image('player-born', 'pics/born_anim.gif');
			game.load.image('player-normal', 'pics/player_white.gif');
			game.load.image('player-die', 'pics/del_anim.gif');
		},
		create : function() {
			level.create(game);
			var playerPos = level.getPlayerStartPosition();
			var scales = level.getScaleFactors();
			var size = level.getSize();
			player.create(game, playerPos, scales);
			bullets.create(game, size, scales);
		},
		update : function() {
			player.update();
			level.update(player);
			bullets.update(player);
		}
	};

	// add states
    game.state.add('title', mainMenu, true);
    game.state.add('play', gamePlay);
});
