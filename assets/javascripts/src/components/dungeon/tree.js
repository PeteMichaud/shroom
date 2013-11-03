// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
    init: function() {
        this.requires('Actor, Solid, spr_tree');
    },
});