window.onload = function() {
    /*
    When the page
    */
    const prompt_input = document.getElementById("prompt_input");

    prompt_input.addEventListener("keyup", function detectEnter(event) {
        if (event.key == "Enter"){
            console.log("Enter pressed");
        }

        console.log(event.key + " was pressed");
    });
}
// Change to something like this instead:
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onload_addeventlistener