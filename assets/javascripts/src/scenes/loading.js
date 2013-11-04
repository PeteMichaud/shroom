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