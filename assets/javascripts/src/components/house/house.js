//House Scene Components

Crafty.c('House', {
    init: function() {
        this.requires('Building, spr_house')
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