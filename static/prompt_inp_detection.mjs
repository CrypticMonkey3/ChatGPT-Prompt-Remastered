/**
* Function for when anyone presses 'ENTER' in the prompt, or clicks the submit button.
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
    if (((event["type"] === "keyup" && event["key"] === "Enter") || event["type"] === "mousedown") && prompt_value !== "") {
        // make another check separate to the input which checks if a model has been selected.
        if (document.getElementById("modelDropdown").innerHTML !== "Choose a model") {
            postPrompt();
            return null;
        }

        // create a pop-up to encourage the user to select a model.
        document.getElementById("prompt_pop_up").classList.add("show");
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
    message_content.innerHTML = message;

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

function moveToID(element_id) {
    window.location.href = `#${element_id}`;
}


/**
 * Creates a reference to a particular input, for ease of recall.
 * @param {string} message_id The ID of the div element to jump to.
 * @param {string} message The placeholder value which leads to a particular prompt.
 * @param {HTMLElement} chat_sidebar The sidebar to add these references to.
 */
function displayMessageReference(message_id, message, chat_sidebar) {
    let doc_frag = document.createDocumentFragment();

    let message_ref_block_div = document.createElement("div");
    message_ref_block_div.className = "reference_block";
    message_ref_block_div.onclick = function() {moveToID(message_id)};

    let message_ref_div = document.createElement("div");
    message_ref_div.className = "message_reference";
    message_ref_div.textContent = message;

    let ref_end_div = document.createElement("div");
    ref_end_div.className = "reference_end";

    message_ref_block_div.appendChild(message_ref_div);
    message_ref_block_div.appendChild(ref_end_div);

    doc_frag.appendChild(message_ref_block_div);

    /* Expected layout:
        Doc Frag
         |___ Div, class: reference_block
              |___ Div, class: reference_message
                   |___ Div, class: message_reference
                   |    |___ anchor, href: '#message_id', textContent: 'message'
                   |___ Div, class: reference_end
     */

    chat_sidebar.appendChild(doc_frag);
}


/**
 * The function to call when a response has been received from the prompt.
 * @param response The model's response to a given prompt.
 * @param args Will contain a tuple of args: (chat_area, prompt_value)
 */
function updateChat(response, ...args) {
    console.log(response);
    console.log(args);

    // display response onto the main chat area.
    let response_id = response.split(" ", 1)[0];
    let model_response = response.substring(response_id.length + 1, response.length);

    displayMessage("llm_response", model_response, args[0]);

    // edit the last user prompt and add the id onto it. This is so we can quickly get jump to this element.
    let user_prompts = document.getElementsByClassName("user_prompt");
    user_prompts[user_prompts.length - 1].id = response_id;

    // create reference to prompt into the chat sidebar.
    displayMessageReference(response_id, args[1], document.getElementById("chat_sidebar"));

}


/**
* Executes a POST request to /prompt-response function in pages.py containing whatever value was in the prompt.
* @return {null} nothing
*/
async function postPrompt() {
    const chat_area = document.getElementById("chat_display");
    const prompt_value = document.getElementById("prompt_input").value

    if (!chat_area || !prompt_value) {
        console.log("Custom error! Failed to get Element with ID: 'chat_display' or 'prompt_input'.");
        return null;
    }

    displayMessage("user_prompt", prompt_value, chat_area);

    if (document.getElementById("prompt_container").style.top === "") {  // if the prompt hasn't moved from the starting position
        document.getElementById("prompt_container").setAttribute("style", "top: 91.5%");  // move the container down.
    }

    document.getElementById("prompt_input").value = "";

    await bodiedFetch(
        "/prompt-response",
        {"prompt": prompt_value},
        updateChat, chat_area, prompt_value
    );


    // Ensure that if the vertical scroll is active, that it's at the bottom.
    if (chat_area.scrollHeight > chat_area.clientHeight) {  // clientHeight is the height of the div, scrollHeight is the height of the overflow.
        chat_area.scrollTop = chat_area.scrollHeight;

        if (chat_area.getAttribute("style") === null) {  // Add a bottom border if the response has exceeded the chat display.
            chat_area.setAttribute("style", "border-bottom: 2px solid; border-image: linear-gradient(to right, transparent 10%, black 50%, transparent 90%, transparent) 100% 1;")
        }
    }
}
