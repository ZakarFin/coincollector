define(function() {

	var scaleFactors = {
			x : 1,
			y: 1
		};
	var groups = {};
	var coinCount = 0;
	var startTime = 0;
	var game = undefined;
	var playerPosition = {
		x : 0,
		y : 0
	};
	var level = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,2,0,1,0,1,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,2,0,1,0,1,0,0,0,0,1,2,1,1,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,1,1,0,2,1,1,0,0,1,0,0,0,0,0,0,0,0],
			[0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,1,0,0,2,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,2,0,0,1,0,0,0,0,0,1,2,0,0,9,9,0,0,0,2,0,0,1,1,1,1,0,0,0],
			[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,2,1,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,0,0,0,0,2,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,8,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

    var reset = function() {    	
		for (var key in groups) {
			// do we need any additional cleanup?
			delete groups[key];
		}
		coinCount = 0;
    };

	var initLevel = function(game) {
		reset();
		var width = game.width;
		var height = game.height;

		game.stage.backgroundColor = '#FFFFFF';
		var curLevel = level;
		scaleFactors.x = (width/curLevel[0].length)/10;
		scaleFactors.y = (height/curLevel.length)/10;

		for(var y=0; y < curLevel.length; ++y) {
			var row = curLevel[y];	
			for(var x=0; x < curLevel[y].length; ++x) {
				var cell = row[x];	
				var item = undefined;
				if(cell === 1) {
					item = 'wall';
				}
				else if(cell === 2) {
					item = 'coin';
					coinCount++;
				}
				else if(cell === 9) {
					item = 'exit_closed';
				}
				else if(cell === 8) {
					playerPosition.x = x;
					playerPosition.y = y;
				}
				if(item === 'exit_closed') {
					addIile(x, y, 'exit_open');
				}
				addIile(x, y, item);
			}
		}
	}
	function addIile(x, y, item){
		if(item) {
			if(!groups[item]) {
				groups[item] = game.add.group();
			}
			var spriteX = x * 10 * scaleFactors.x;
			var spriteY = y * 10 * scaleFactors.y;
			var sprite = groups[item].create(spriteX, spriteY, item);
			sprite.scale.setTo(scaleFactors.x, scaleFactors.y);
    		sprite.body.immovable = true;
			sprite.name = item;
		}
	}

    function exitHandler (player, exit) {
	    //player.velocity.x = 0;
	    //player.velocity.y = 0;
        if(coinCount < 1) {
        	coinCount = -1;
			alert('Level completed in ' +  (game.time.now - startTime)/1000 + 's');
        }
    }
	var collisionHandler = function(player, levelObject) {
        if (levelObject.name === 'coin')
        {
            levelObject.kill();
            coinCount--;
			// if all coins collected
            if(coinCount < 1) {
            	// replace?'exit_open'
	            groups['exit_closed'].forEach(function(item){
			        var emitter = game.add.emitter(item.x + (5 * scaleFactors.x), item.y + (5 * scaleFactors.y), 200);
			        emitter.makeParticles('exit_closed');
			        emitter.gravity = 10;
	        		emitter.start(true, 2000, null, 5);
	        		//item.replace()
	        		item.kill();
	            });
            }
        }

    }

	return {
		getPlayerStartPosition : function() {
			return playerPosition;
		},
		getGroups : function() {
			return groups;
		},
		getScaleFactors : function() {
			return scaleFactors;
		},
		create : function(_game) {
			game = _game;
			initLevel(_game);
			startTime = game.time.now;
		},
		getSize : function() {
			return {
				x : level[0].length,
				y : level.length
			};
		},
		update : function(player) {
	        game.physics.collide(player.getGameObject(), groups['wall'], collisionHandler, null, this);
	        game.physics.collide(player.getGameObject(), groups['exit_closed'], exitHandler, null, this);
	        if(coinCount != -1) {
	        	// if statement added to prevent alert loop
	        	game.physics.collide(player.getGameObject(), groups['exit_open'], exitHandler, null, this);
	        }
	        game.physics.collide(player.getGameObject(), groups['coin'], collisionHandler, null, this);

		}
	};
});