
const TextStart = "Du bist wie immer alleine im Schloss und wanderst durch die menschenleeren Gänge. Im Kinderzimmer des Baron brennt eine einzige Fackel. Du überprüfst die Lage und findest einen dir unbekannten Spiegel im Zimmer. Jedoch zeigt er keinerlei Reflektionen. Willst du ihn berühren? (ja oder nein?)";
const TextBerühren = "Als dein Zeigefinger den Spiegel berührt, wellt sich das ganze Glas und es fühlt sich so an, als konntest du in den Spiegel eintauchen wenn du denn wolltest. Tauchst du komplett in den Spiegel ein? (ja oder nein?)";
const TextEnde1 = "Du entscheidest dich, den Spiegel lieber ruhen zu lassen und strollst weiter durch die Räume. Der Spiegel war nie mehr gesehen und manchmal denkst du daran zurück und fragst dich ob der Spiegel überhaupt echt war.";
const TextEinstieg = "Der Spiegel lässt deinen gesamten Körper hindurch. Nur wo bist du jetzt genau? Ist die Umgebung in der du dich jetzt befindest gespiegelt? Nein, das trifft es nicht richtig. Du siehst andere Dinge oder die Dinge vielleicht aus einer anderen Perspektive? Trifft es das eher, fragst du dich. Du schaust dich weiter um, doch jede Bewegung ist anstrengend und bringt dich zum ermüden. Ohne neue Informationen über diesen Ort kehrst du zum Spiegel zurück. Willst du schon gehen? (ja oder nein?)"
const TextSpiegelgefangen = "Du versuchst auf die gleiche Weise wieder den Spiegel zu verlassen, doch eine Kraft oder eine Macht hält dich hier. Du bist wohl oder übel gefangen.";
const TextSpiegellauf = "Du drehst dem Spiegel deinen Rücken zu und untersuchst diese Welt genauer. Alles ist so interessant. Was siehst du, wenn du alles anders betrachtest..?";

let myArray = [TextStart, TextBerühren, TextEnde1, TextEinstieg, TextSpiegelgefangen, TextSpiegellauf];
var AntwortBereich = 0;

const input = document.querySelector(".intputForm_field");
const output = document.getElementById("output");

    input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        if (AntwortBereich == 0) {
        if (input.value == "ja") {
            output.innerHTML = myArray[1];
            AntwortBereich = 1;
        }
        else if (input.value == "nein") {
            output.innerHTML = myArray[2];
            AntwortBereich = 4;
    }
    input.value = "";
    }
}
        if (event.key == "Enter") {
            if (AntwortBereich == 1) {
            if (input.value == "ja") {
                output.innerHTML = myArray[3];
                AntwortBereich = 2;
            }
            else if (input.value == "nein") {
                output.innerHTML = myArray[2];
                AntwortBereich = 4;
            }
            input.value = "";
}
    }

        if (event.key == "Enter") {
            if (AntwortBereich == 2) {
            if (input.value == "ja") {
                output.innerHTML = myArray[4];
                AntwortBereich = 4;
            }
            else if (input.value == "nein") {
                output.innerHTML = myArray[5];
                AntwortBereich = 4;
            }
            input.value = "";
        }
    }
});

// pls kill me
// ich wurde informatikkt. 3 Stunden für diese Aufgabe für einen Bugfix :)

