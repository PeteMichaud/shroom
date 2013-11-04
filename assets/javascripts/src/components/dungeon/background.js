Crafty.c('Background', {
    init: function() {
        this.requires('2D, Canvas, Color')
            .attr({x:0,y:0, w:Game.width(), h:Game.height()});
    },
});