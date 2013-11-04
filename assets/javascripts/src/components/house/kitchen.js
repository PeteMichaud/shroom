
Crafty.c('Kitchen', {
    init: function() {
        this.requires('Building, Color')
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