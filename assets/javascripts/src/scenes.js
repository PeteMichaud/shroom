
Crafty.transition = function(scene, t_in, t_out, duration, color){
    var opts = {duration: duration || 50, color: color || '#000000', t_in: true, t_out: false};

    Crafty.e("2D, Canvas, Tween, Color")
        .attr({alpha:0.0, x:0, y:0, w:Game.width(), h:Game.height()})
        .color(opts.color)
        .tween({alpha: 1.0}, (opts.t_out ? opts.duration : 1))
        .bind("TweenEnd", function() {
            Crafty.scene(scene);
            if (opts.t_in)
            {
                Crafty.e("2D, Canvas, Tween, Color")
                    .attr({alpha:1.0, x:0, y:0, w:Game.width(), h:Game.height()})
                    .color(opts.color)
                    .tween({alpha: 0.0}, opts.duration);
            }
        });
};

Crafty.scene('House', function() {

    Crafty.e('House');

    // Play a ringing sound to indicate the start of the journey
    Crafty.audio.play('ring');

    $('#build-kitchen').click(function(){
        Crafty.e('Kitchen');
    });

    $('#build-workshop').click(function(){
        Crafty.e('Workshop');
    });

    $('#build-lab').click(function(){
        Crafty.e('Lab');
    });


});

Crafty.scene('Game', function() {

    // Player character, placed at 5, 5 on our grid
    this.player = Crafty.e('PlayerCharacter').at(5, 5);

    // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 ||
                          y == 0 || y == Game.map_grid.height - 1;

            if (at_edge) {
                // Place a tree entity at the current tile
                Crafty.e('Tree').at(x, y);
            } else if (Math.random() < 0.06) {
                // Place a bush entity at the current tile
                var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock';
                var e = Crafty.e(bush_or_rock).at(x, y);
                if (this.player.hit('Solid')) e.destroy();
            }
        }
    }

    // Generate up to five villages on the map in random locations
    var max_villages = 5;
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            if (Math.random() < 0.02) {
                if (Crafty('Village').length < max_villages) {
                    var v = Crafty.e('Village').at(x, y);
                    if (v.hit('Solid')) v.destroy();
                }
            }
        }
    }

    // Play a ringing sound to indicate the start of the journey
    Crafty.audio.play('ring');

    this.show_victory = this.bind('VillageVisited', function() {
        if (!Crafty('Village').length) {
            Crafty.scene('Victory');
        }
    });
}, function() {
    this.unbind('VillageVisited', this.show_victory);
});

Crafty.scene('Victory', function() {
    Crafty.e('2D, DOM, Text')
        .text('All villages visited!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);

    // Give'em a round of applause!
    Crafty.audio.play('applause');

// After a short delay, watch for the player to press a key, then restart
    // the game when a key is pressed
    var delay = true;
    setTimeout(function() { delay = false; }, 5000);
    this.restart_game = function() {
        if (!delay) {
            Crafty.transition('House');
        }
    };

    this.bind('KeyDown', this.restart_game);

}, function() {
    this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);

    // Load our image and audio assets
    Crafty.load([
        'assets/16x16_forest_2.gif',
        'assets/hunter.png',
        'assets/house.jpg',
        'assets/house-over.jpg',
        'assets/door_knock_3x.mp3',
        'assets/door_knock_3x.ogg',
        'assets/door_knock_3x.aac',
        'assets/board_room_applause.mp3',
        'assets/board_room_applause.ogg',
        'assets/board_room_applause.aac',
        'assets/candy_dish_lid.mp3',
        'assets/candy_dish_lid.ogg',
        'assets/candy_dish_lid.aac'
        ], function(){    // Once the image is loaded...

        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
        Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
            spr_tree:    [0, 0],
            spr_bush:    [1, 0],
            spr_village: [0, 1],
            spr_rock:    [1, 1]
        });

        // Define the PC's sprite to be the first sprite in the third row of the
        //  animation sprite map
        Crafty.sprite(16, 'assets/hunter.png', {
            spr_player:  [0, 2],
        }, 0, 2);

        Crafty.sprite(768, 512, 'assets/house.jpg', {
            spr_house:  [0, 0],
        });

        Crafty.sprite(768, 512, 'assets/house-over.jpg', {
            spr_house_over:  [0, 0],
        });

        // Define our sounds for later use
        Crafty.audio.add({
            knock:     ['assets/door_knock_3x.mp3',
                'assets/door_knock_3x.ogg',
                'assets/door_knock_3x.aac'],
            applause:  ['assets/board_room_applause.mp3',
                'assets/board_room_applause.ogg',
                'assets/board_room_applause.aac'],
            ring:      ['assets/candy_dish_lid.mp3',
                'assets/candy_dish_lid.ogg',
                'assets/candy_dish_lid.aac']
        });

        // Now that our sprites are ready to draw, start the game
        Crafty.transition('House');
    });
});