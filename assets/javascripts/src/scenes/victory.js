Crafty.scene('Victory', function() {
    Crafty.e('2D, DOM, Text')
        .text('All villages visited!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);

    // Give'em a round of applause!
    Crafty.audio.play('applause');

// After a short delay, watch for the player to press a key, then restart
    // the game when a key is pressed
    var delay = true;
    setTimeout(function() { delay = false; }, 5000);
    this.restart_game = function() {
        if (!delay) {
            Crafty.transition('House');
        }
    };

    this.bind('KeyDown', this.restart_game);

}, function() {
    this.unbind('KeyDown', this.restart_game);
});