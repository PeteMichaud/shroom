// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    // Locate this entity at the given position on the grid
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
        } else {
            this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
            return this;
        }
    }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    },
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
    init: function() {
        this.requires('Actor, Solid, spr_tree');
    },
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
    init: function() {
        this.requires('Actor, Solid, spr_bush');
    },
});

// A Rock is just an Actor with a certain sprite
Crafty.c('Rock', {
    init: function() {
        this.requires('Actor, Solid, spr_rock');
    },
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
            .fourway(2)
            .stopOnSolids()
            .onHit('Village', this.visitVillage)
            // These next lines define our four animations
            //  each call to .animate specifies:
            //  - the name of the animation
            //  - the x and y coordinates within the sprite
            //     map at which the animation set begins
            //  - the number of animation frames *in addition to* the first one
            .animate('PlayerMovingUp',    0, 0, 2)
            .animate('PlayerMovingRight', 0, 1, 2)
            .animate('PlayerMovingDown',  0, 2, 2)
            .animate('PlayerMovingLeft',  0, 3, 2);

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 4;
        this.bind('NewDirection', function(data) {
            if (data.x > 0) {
                this.animate('PlayerMovingRight', animation_speed, -1);
            } else if (data.x < 0) {
                this.animate('PlayerMovingLeft', animation_speed, -1);
            } else if (data.y > 0) {
                this.animate('PlayerMovingDown', animation_speed, -1);
            } else if (data.y < 0) {
                this.animate('PlayerMovingUp', animation_speed, -1);
            } else {
                this.stop();
            }
        });
    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    // Stops the movement
    stopMovement: function() {
        if (this._movement) {
            this.x -= this._movement.x;
            if (this.hit('Solid') != false) {
                this.x += this._movement.x;
                this.y -= this._movement.y;
                if (this.hit('Solid') != false) {
                    this.x -= this._movement.x;
                }
            }
        } else {
            this._speed = 0;
        }
    },

    // Respond to this player visiting a village
    visitVillage: function(data) {
        villlage = data[0].obj;
        villlage.visit();
    }
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
    init: function() {
        this.requires('Actor, Collision, spr_village');
    },

    // Process a visitation with this village
    visit: function() {
        this.destroy();
        Crafty.audio.play('knock');
        Crafty.trigger('VillageVisited', this);
    }
});

//House Scene Components

Crafty.c('House', {
    init: function() {
        this.requires('Mouse, 2D, Canvas, spr_house')
        .attr({x:0, y:0})
        //todo: place house graphics on one sprite sheet for efficient swapping
        .bind('MouseOver', function(e){
            this.removeComponent('spr_house')
                .addComponent('spr_house_over');
        })
        .bind('MouseOut', function(e){
            this.removeComponent('spr_house_over')
                .addComponent('spr_house');
        })
        ;
    },
});

Crafty.c('Workshop', {
    init: function() {
        this.requires('Mouse, 2D, Canvas, Color')
            .attr({x:50,y:50, w:100, h:100})
            .color('rgb(20, 185, 40)')
            .bind('MouseOver', function(e){
                this.color('rgb(40, 205, 60)');
            })
            .bind('MouseOut', function(e){
                this.color('rgb(20, 185, 40)');
            })
            .bind('Click', function(e){
                Crafty.scene('Game');
            })
        ;
    },
});

Crafty.c('Kitchen', {
    init: function() {
        this.requires('Mouse, 2D, Canvas, Color')
            .attr({x:50,y:200, w:100, h:100})
            .color('rgb(185, 20, 40)')
            .bind('MouseOver', function(e){
                this.color('rgb(205, 40, 60)');
            })
            .bind('MouseOut', function(e){
                this.color('rgb(185, 20, 40)');
            })
        ;
    },
});

Crafty.c('Lab', {
    init: function() {
        this.requires('Mouse, 2D, Canvas, Color')
            .attr({x:50,y:350, w:100, h:100})
            .color('rgb(20, 40, 185)')
            .bind('MouseOver', function(e){
                this.color('rgb(40, 60, 205)');
            })
            .bind('MouseOut', function(e){
                this.color('rgb(20, 40, 185)');
            })
        ;
    },
});
