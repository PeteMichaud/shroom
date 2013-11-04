Game = {
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width:  24,
        height: 16,
        tile: {
            width:  32,
            height: 32
        }
    },

    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(0, 0, 0)');

        Crafty.scene('Loading');
    }
};

Crafty.transition = function(scene, args){

    var default_opts = {
        duration: 50,
        color: '#000000',
        t_in: true,
        t_out: false};

    var opts = $.extend({}, default_opts, args);

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

$text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }

window.addEventListener('load', Game.start);