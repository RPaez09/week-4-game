var game = {
    initialize: function(){
        //TODO: EVERYTHING
        logger.newMessage("Welcome to star wars RPG");
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