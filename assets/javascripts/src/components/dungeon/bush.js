// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
    init: function() {
        this.requires('Actor, Solid, spr_bush');
    },
});