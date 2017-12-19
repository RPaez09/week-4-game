var game = {

    initialize: function(){
        this.startScreen.run();
    },

    characters: [ 
        new Character(
            { 
                "name" : "Luke Skywalker",
                "health" : 100,
                "attack" : 5,
                "counterAttack" : 10,
                "img" : "pro-luke.jpg" 
            }
        ),
        new Character(
            { 
                "name" : "Yoda",
                "health" : 100,
                "attack" : 5,
                "counterAttack" : 10,
                "img" : "pro-yoda.jpg" 
            }
        ),
        new Character(
            { 
                "name" : "Mace Windu",
                "health" : 100,
                "attack" : 5,
                "counterAttack" : 10,
                "img" : "pro-mace.jpg" 
            }
        ),
        new Character(
            { 
                "name" : "Obi Wan Kenobi",
                "health" : 100,
                "attack" : 5,
                "counterAttack" : 10,
                "img" : "pro-obi.jpg" 
            }
        ),
        new Character(
            { 
                "name" : "Darth Maul",
                "health" : 100,
                "attack" : 5,
                "counterAttack" : 10,
                "img" : "pro-darth.jpg" 
            }
        )
     ],
    playerCharacter : {},
    enemyCharacter : {},

    startScreen: new Screen( $(".section.start")[0] , function(){
        this.open();
        logger.newMessage("Welcome to Star Wars RPG!");

        $( document ).on("keydown", document , function( ){

            $( document ).off("keydown");
            
            game.startScreen.close();

            game.characterScreen.run();

        });

    } ),

    characterScreen: new Screen( $(".section.character-selection")[0] , function(){ 
        
        var renderChars = function(){ 
            var html = "";
            var boxTimeLine = anime.timeline(); // to animate them in staggered fashion
            
            for( var i = 0; i < game.characters.length; i++ ){
                html += "<div class='character-box' data-character='" + i + "' style='opacity: 0;'>"+
                "<img src='assets/images/"+ game.characters[i].img +"'/>  <p>"+ game.characters[i].name +"</p> </div>";
            }
            
            $(".character-wrapper").html( html );
            
            var boxes = $(".character-box");

            for( var j = 0; j < boxes.length; j++ ){
                boxTimeLine.add({
                    targets : boxes[ j ],
                    opacity: 1,
                    duration: 200,
                    delay: 150,
                    offset: "-=50",
                    easing: "easeOutQuad"
                });
            } 
        }
        
        this.open(); //open the character selection screen

        logger.newMessage("Please select your character");

        renderChars(); //render the characters on screen

        $(".character-box").on("click" , function( e ){

            var selectedCharacter =  $(e.currentTarget).attr("data-character"); 

            game.setPlayer( game.characters[selectedCharacter] );

            $(e.currentTarget).addClass("selectedChar"); // lets animate all but the selected char

            var enemyTargets = anime.timeline();

            var firstLocation = $(".character-box:not(.selectedChar)").position(); // xy coordinates of first character
            var selectedLocation = $(".character-box.selectedChar").position(); // xy coordinates of chosen character

            var finalLocation = { "bottom" : ( selectedLocation.top - firstLocation.top ) , "right" : ( selectedLocation.left - firstLocation.left ) }; // new coordinates based on difference of the first two

            for( var j = 0; j < $(".character-box:not(.selectedChar)").length; j++ ){
                enemyTargets.add({
                    targets : $(".character-box:not(.selectedChar)")[ j ],
                    opacity: 0,
                    translateY: 50,
                    duration: 200,
                    delay: 100, 
                    offset: "-=100",
                    easing: "easeOutQuad"
                });    
            }
            
            $(".character-box.selectedChar").css( "position" , "relative"  ); // change position to relative for animation

            anime({
                targets: $(".character-box.selectedChar")[0],
                delay: 1000,
                bottom: finalLocation.bottom + "px",
                right: finalLocation.right + "px",
                duration: 500,
                easing: "easeInOutQuad",
                complete: function(){ // Scroll window to top when done
                    $('html, body').animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        
            $(".character-box").off("click"); // remove this event

        });

    } ),

    setPlayer: function( arg ){
        this.playerCharacter = arg;
        logger.newMessage("You are now " + this.playerCharacter.name + "!");
    },

    setEnemy: function( arg ){
        this.enemyCharacter = arg;
        logger.newMessage(this.enemyCharacter.name + "has accepted your challenge. Fight!");
    }

}


//Screen
function Screen ( element , run ){
    this.element = element;
    this.run = run;
}

Screen.prototype.open = function(){

    var target = this.element;

    $( target ).css( { "display": "block" } );
    
    anime( {
        targets: target,
        opacity: 1,
        duration: 500,
        delay: 500,
        top: 0,
        easing: 'easeOutQuad',
    } );
}

Screen.prototype.close = function(){
    
    var target = this.element;

    anime( {
        targets: target,
        opacity: 0,
        duration: 500,
        top: 50,
        easing: 'easeOutQuad',
        complete: function(){ $( target ).css( { "display": "none" } ); }
    } );
}

//Character
function Character ( { "name" : name , "health" : health , "attack" : attack , "counterAttack" : counterAttack , "img" : image } ){
    this.name = name;
    this.health = health;
    this.attack = attack,
    this.counterAttack = counterAttack;

    this.img = image;
}

Character.prototype.combat = function( foe ){

    // initial damage phase
    foe.health -= this.attack;
    logger.newMessage( this.name + " attacks " + foe.name + " for " + this.attack + " damage.");
    
    // checking if enemy fainted
    if( foe.health <= 0 ){ foe.health = 0; } // deathblows result in 0 health, no nogatives
    if( foe.health === 0 ){ return } // you won the battle

    // counter damage phase
    this.health -= foe.counterAttack;
    logger.newMessage( foe.name + " retaliates for " + foe.counterAttack + " damage.");

    // checking if you died from that counter
    if( this.health <= 0 ){ this.health = 0; }
    if( this.health === 0 ){ return } // you lost!
}

//Logger
var logger = {
    element : $("#logger"),
    newMessage : function( msg ){
        var setup = $("<div class='message'>" + msg + "</div>");
        this.element.append( setup );
        this.element.scrollTop( 999999999 );
    },
    clear : function(){
        this.element.html("");
    }
}


game.initialize();