Crafty.scene('House', function() {

    Crafty.e('House');

    // Play a ringing sound to indicate the start of the journey
    Crafty.audio.play('ring');

    $('#build-kitchen').click(function(){
        Crafty.e('Kitchen');
    });

    $('#build-workshop').click(function(){
        Crafty.e('Workshop');
    });

    $('#build-lab').click(function(){
        Crafty.e('Lab');
    });


});