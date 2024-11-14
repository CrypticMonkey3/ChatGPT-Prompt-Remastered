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
* @return {null} nothing
*/
function submitPrompt(event) {
    const prompt_value = document.getElementById("prompt_input").value;

    /* Checking several things before posting the prompt:
    *       - If the event was a key press and that key press was ENTER
    *       - OR if the event was a click on the submit button
    *       - ALL THE WHILE checking that the prompt is not empty
    */
    if (((event.type === "keyup" && event.key === "Enter") || event.type === "mousedown") && prompt_value !== "") {
        postPrompt();
    }
}


/**
 * Displays a message onto the chat container, and categorises the message by a particular class_name
 * @param {string} class_name Class name to categorise the message as.
 * @param {string} message The message to display.
 * @param {HTMLElement} chat_area The div element containing the conversation.
 * @return {null} nothing- just adding elements onto the screen.
 */
function displayMessage(class_name, message, chat_area){
    /*
     create document fragment for efficient DOM manipulation - improves performance by building elements in
     memory before adding to DOM.
     */
    let doc_frag = document.createDocumentFragment();

    let chat_div = document.createElement("div");
    chat_div.className = class_name;

    let message_content = document.createElement("span");
    message_content.textContent = message;

    let profile_pic = document.createElement("img");
    profile_pic.alt = `${class_name} profile picture`;
    profile_pic.src = class_name === "llm_response" ? "/static/DALL·E 2024-11-07 15.36.52 - ChatGPT\'s visual description of itself.png" : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.miraheze.org%2Fwindowswallpaperwiki%2Fthumb%2F6%2F67%2FUser_(Windows_10_1507-1909).png%2F200px-User_(Windows_10_1507-1909).png&f=1&nofb=1&ipt=72cdee34bbd2bdd678ccbac1239f3677541ae92826b54bf6cbfc3decf79f3f73&ipo=images";

    chat_div.appendChild(profile_pic);  // Make the img element of the profile picture be part of the div
    chat_div.appendChild(message_content);  // Make the span element the child of the div.
    doc_frag.appendChild(chat_div);  // Add the div element to the document fragment.

    /* Expected layout:
        Doc Frag
         |___ Div, class: class_name
              |___ Span, textContent: message
     */

    chat_area.appendChild(doc_frag);  // Add document fragment to chat.
}


/**
* Executes a POST request to /prompt-response function in pages.py containing whatever value was in the prompt.
* @return {null} nothing
*/
async function postPrompt() {
    const chat_area = document.getElementById("chat_display");

    if (!chat_area) {
        console.log("Custom error! Failed to get Element with ID: 'chat_display'.");
        return null;
    }

    displayMessage("user_prompt", document.getElementById("prompt_input").value, chat_area);

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
    ).then(function (response){
        return response.text();  // done so that the body of the response isn't consumed.

    }).then(function (response) {  // When a response is made
        console.log(response);

        displayMessage("llm_response", response, chat_area);

        if (!prompt_moved) {  // if the prompt hasn't moved from the starting position
            prompt_moved = !prompt_moved;
            document.getElementById("prompt_container").setAttribute("style", "top: 90%");  // move the container down.
        }

    }).catch(function (error) {
        console.log("Custom Error Message: Failed to POST. Error description is as follows:\n", error);
    })

    // Ensure that if the vertical scroll is active, that it's at the bottom.
    if (chat_area.scrollHeight > chat_area.clientHeight) {  // clientHeight is the height of the div, scrollHeight is the height of the overflow.
        chat_area.scrollTop = chat_area.scrollHeight;
    }

    document.getElementById("prompt_input").value = "";
}
