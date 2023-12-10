

const TextStart = "Du bist wie immer alleine im Schloss und wanderst durch die menschenleeren Gänge. Im Kinderzimmer des Baron brennt eine einzige Fackel. Du überprüfst die Lage und findest einen dir unbekannten Spiegel im Zimmer. Jedoch zeigt er keinerlei Reflektionen. Willst du ihn berühren? (ja oder nein?)";
const TextBerühren = "Als dein Zeigefinger den Spiegel berührt, wellt sich das ganze Glas und es fühlt sich so an, als konntest du in den Spiegel eintauchen wenn du denn wolltest. Tauchst du komplett in den Spiegel ein? (ja oder nein?)";
const TextEnde1 = "Du entscheidest dich, den Spiegel lieber ruhen zu lassen und strollst weiter durch die Räume. Der Spiegel war nie mehr gesehen und manchmal denkst du daran zurück und fragst dich ob der Spiegel überhaupt echt war.";
const TextEinstieg = "Der Spiegel lässt deinen gesamten Körper hindurch. Nur wo bist du jetzt genau? Ist die Umgebung in der du dich jetzt befindest gespiegelt? Nein, das trifft es nicht richtig. Du siehst andere Dinge oder die Dinge vielleicht aus einer anderen Perspektive? Trifft es das eher, fragst du dich. Du schaust dich weiter um, doch jede Bewegung ist anstrengend und bringt dich zum ermüden. Ohne neue Informationen über diesen Ort kehrst du zum Spiegel zurück. Willst du schon gehen? (ja oder nein?)"
const TextSpiegelgefangen = "Du versuchst auf die gleiche Weise wieder den Spiegel zu verlassen, doch eine Kraft oder eine Macht hält dich hier. Du bist wohl oder übel gefangen.";
const TextSpiegellauf = "Du drehst dem Spiegel deinen Rücken zu und untersuchst diese Welt genauer. Alles ist so interessant. Was siehst du, wenn du alles anders betrachtest..?"

let myArray = [TextStart, TextBerühren, TextEnde1, TextEinstieg, TextSpiegelgefangen, TextSpiegellauf];
let AntwortBereich = (0);

function Bereich1() {
    let Antwort1 = prompt(myArray[0]);
    if (Antwort1 == "ja") { 
       Antwortbereich =  1;
}
else if (Antwort1 == "nein") {
    prompt(myArray[2]);
}
}

function Bereich2() {
    let AntwortB1 = prompt(myArray[1]); 
    if(AntwortB1 == "ja") {
        AntwortBereich = 2;
    }
    else if (AntwortB1 == "nein") {
        prompt(myArray[2]);
    }
}

function Bereich3() {
    let AntwortC1 = prompt(myArray[3]);
    if(AntwortC1 == "ja") {
        prompt(myArray[4]);
     }
     else if (AntwortC1 == "nein") {
       prompt(myArray[5]);
         }
}

Bereich1();
if (Antwortbereich = 1) {
Bereich2();   
if (AntwortBereich = 2) {
Bereich3();
}
}


