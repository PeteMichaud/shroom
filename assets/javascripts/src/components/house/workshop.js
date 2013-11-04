Crafty.c('Workshop', {
    init: function() {
        this.requires('Building, Color')
            .attr({x:50,y:50, w:100, h:100})
            .color('rgb(20, 185, 40)')
            .bind('MouseOver', function(e){
                this.color('rgb(40, 205, 60)');
            })
            .bind('MouseOut', function(e){
                this.color('rgb(20, 185, 40)');
            })
            .bind('Click', function(e){
                Crafty.scene('Dungeon');
            })
        ;
    },
});