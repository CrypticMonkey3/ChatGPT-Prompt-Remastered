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

        /*
        // Code for get Style property: https://stackoverflow.com/questions/6338217/get-a-css-value-with-javascript
        let element = document.getElementById("prompt_container"),
            element_style = window.getComputedStyle(element);
            top_val = element_style.getPropertyValue("top");
        // -----------------------------------------------------------

        // if the prompt is in the middle of the screen,
        if (Number(top_val.substring(0, top_val.length - 2)) < window.screen.height / 2) {

            element.setAttribute("style", "top:93%;");
        }
        // if the prompt is halfway up the screen (top:50%;) transition it to top: 93%;
        */

        once(addElementStyle, "prompt_container", "top:93%");  // Doesn't actually call the function once yet.

    }).catch(function (error) {
        console.log("Custom Error Message: Failed to POST. Error description is as follows:\n", error);
    })
}


function once(func, ...args) {
    var wasCalled = false;
    console.log("hi2");
    console.log(func);
    console.log(...args);

    return function(func, ...args) {
        console.log("h3");
        console.log(func);
        if (!wasCalled) {
            wasCalled = !wasCalled;
            func(...args);
        }
    }(func, ...args);
}


function addElementStyle(elementID, newStyle){
    console.log("Hi");
    document.getElementById(elementID).setAttribute("style", newStyle);
}


/**
* Code received found from https://stackoverflow.com/questions/6338217/get-a-css-value-with-javascript
* @param {String} elementID The ID of an element we're extracting from.
* @param {String} attr      The attribute of the style we want to get.
*/
function getStyleAttr(elementID, attr) {
    let element = document.getElementById(elementID);
    let style = window.getComputedStyle(element);
    return style.getPropertyValue(attr);
}
