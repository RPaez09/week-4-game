var game = {
    initialize: function(){
        logger.newMessage("Welcome to star wars RPG");
        this.characterSelection();
    },

    playerCharacter : {},

    enemyCharacter : {},

    setPlayer: function( arg ){
        this.playerCharacter = arg;
        logger.newMessage("You are now " + this.playerCharacter.name + "!");
    },

    setEnemy: function( arg ){
        this.enemyCharacter = arg;
        logger.newMessage(this.enemyCharacter.name + "has accepted your challenge. Fight!");
    },

    characterSelection: function(){
        var screen = $('.character-selection');
        logger.newMessage("Please choose a character");

        screen.css( "display", "block");

    }
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