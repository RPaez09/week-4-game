var game = {
    initialize: function(){
        //this.startScreen();
        game.startScreen.open();
    },

    playerCharacter : {},
    enemyCharacter : {},
    startScreen: new Screen( $(".section.start")[0] ),

    setPlayer: function( arg ){
        this.playerCharacter = arg;
        logger.newMessage("You are now " + this.playerCharacter.name + "!");
    },

    setEnemy: function( arg ){
        this.enemyCharacter = arg;
        logger.newMessage(this.enemyCharacter.name + "has accepted your challenge. Fight!");
    },

    /*startScreen: function(){
        var open = function(){            
            anime({
                targets: $(".section.start")[0],
                opacity: "1"
            });
        }

        open();
        logger.newMessage("Welcome to star wars RPG");

    },*/

    characterSelection: function(){
        var screen = $('.character-selection');
        logger.newMessage("Please choose a character");

        screen.css( "display", "block");

        $("window").on( "keydown.start" , function(){

        } );

    }
}


//Screen
function Screen ( element ){
    this.element = element;
}

Screen.prototype.open = function(){
    anime( {
        targets: this.element,
        opacity: 1,
        duration: 500,
        delay: 1000,
        top: 0,
        easing: 'easeOutQuad'
    } );
}

//Character
function Character ( { "name" : name , "health" : health , "attack" : attack , "counterAttack" : counterAttack , "element" : htmlElement } ){
    this.name = name;
    this.health = health;
    this.attack = attack,
    this.counterAttack = counterAttack;

    this.element = htmlElement;
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