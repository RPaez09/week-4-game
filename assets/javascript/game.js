var game = {

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
    }
}

logger.newMessage("Welcome to star wars RPG");