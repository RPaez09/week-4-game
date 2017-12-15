var game = {

}



//Character
function Character ( { "name" : name , "health" : health , "attack" : attack , "counterAttack" : counterAttack , "element" : htmlElement } ){
    this.name = name;
    this.health = health;
    this.attack = attack,
    this.counterAttack = counterAttack;

    this.element = $(htmlElement);
}