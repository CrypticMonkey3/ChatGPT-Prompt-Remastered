
function optionClick() {
    // change the parent innerHTML to be equivalent to the chosen models name.

    // Close the selection.
}


/**
 * Create the element containing the option for a particular option.
 * @param {string} option_name The name of the option.
 * @param {string} option_description The description of the option.
 * @param {HTMLElement} parent_element The element to add the document fragment onto.
 */
function createOption(option_name, option_description, parent_element) {
    let doc_frag = document.createDocumentFragment();

    let button_element = document.createElement("button");
    button_element.innerHTML = option_name + "<br  />" + option_description;
    button_element.type = "button";
    button_element.onclick =

    doc_frag.appendChild(button_element);
    parent_element.appendChild(doc_frag);
}


/**
 * Creates a set of options to the user for a particular element dropdown.
 * @param {string} options A string of options separated by spaces.
 * @param {string} element_id The element ID of the dropdowns selection element.
 */
function createModelOptions(options, element_id) {
    let selection = document.getElementById(element_id);
    let model_arr = options.split(",");

    for (let i = 0; i < model_arr.length; i++) {
        let option = model_arr[i].split('|');

        createOption(option[0], option[1], selection);
    }
}


/**
 * Fetches options on a given id, and adds them into their appropriate div with the given id.
 * @param {string} element_id The id of the selection div.
 * @returns null
 */
async function fetchModelOptions(element_id) {
    await bodiedFetch(
        "/get-available-models",
        {},
        createModelOptions, element_id
    )
}


/**
 * Changes the opacity of the tag with the 'modelSelection' ID, to make the different models available visible.
 * @param {string} element_id The id of the element that's selection needs to be shown.
 * @returns {Promise<void>}
 */
async function showSelection(element_id) {
    let selection = document.getElementById(element_id);

    // whether the opacity is an empty string or not, it will always become a number between 0 & 1.
    if (selection.style.visibility === "visible") {
        selection.setAttribute("style", "opacity: 0; visibility: collapse;")
        return;
    }

    selection.setAttribute("style", "opacity: 1; visibility: visible;")
}