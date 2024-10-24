var prompt_moved = false;


/**
* When the page loads with this javaScript function, add an event listener to the prompt.
* @return {null}    nothing
*/
window.onload = function() {
    document.getElementById("prompt_input").addEventListener("keyup", submitPrompt);
    document.getElementById("submit_prompt_input").addEventListener("mousedown", submitPrompt);
}


/**
* Function for when anyone presses ENTER in the prompt, or clicks the submit button.
* @param {event} event Key event to capture
*/
function submitPrompt(event) {
    const prompt_value = document.getElementById("prompt_input").value;

    /* Checking several things before posting the prompt:
    *       - If the event was a key press and that key press was ENTER
    *       - OR if the event was a click on the submit button
    *       - ALL THE WHILE checking that the prompt is not empty
    */
    if (((event.type == "keyup" && event.key == "Enter") || event.type == "mousedown") && prompt_value != "") {
        postPrompt();
    }
}


async function postPrompt() {
    await fetch(  // await until the POST has been sent, and received, in pages.py
        "/prompt-response",
        {
            method: "POST",
            headers: {  // details that the payload is in a JSON format
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({  // JSON payload
                "prompt": document.getElementById("prompt_input").value
            })
        }
    ).then(function (response) {  // When a response is made
        console.log(response.text());

        document.getElementById("prompt_input").value = "";

        if (!prompt_moved) {  // if the prompt hasn't moved from the starting position
            prompt_moved = !prompt_moved;
            document.getElementById("prompt_container").setAttribute("style", "top: 93%");  // move the container down.
        }

    }).catch(function (error) {
        console.log("Custom Error Message: Failed to POST. Error description is as follows:\n", error);
    })
}
