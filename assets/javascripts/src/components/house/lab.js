Crafty.c('Lab', {
    init: function() {
        this.requires('Building, Color')
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
