// A Rock is just an Actor with a certain sprite
Crafty.c('Rock', {
    init: function() {
        this.requires('Actor, Solid, spr_rock');
    },
});
