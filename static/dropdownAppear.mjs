/**
 * Changes the modelDropdown element, closes the selection, and records the change of model.
 * @returns {Promise<void>}
 */
async function optionClick() {
    // change the parent innerHTML to be equivalent to the chosen models name.
    let chosen_model = this.innerText.split("\n")[0];
    this.parentNode.parentNode.children[0].innerHTML = chosen_model;

    // Close the selection.
    toggleSelection(this.parentNode.id);

    // Send the selected model back to the api client.
    await bodiedFetch(
        "/update-model-used",
        {"model": chosen_model}
    )

    // remove any pop-ups that might've been created.
    document.getElementById("prompt_pop_up").classList.remove("show");
}


/**
 * Create the element containing the option for a particular option.
 * @param {string} option_name The name of the option.
 * @param {string} option_description The description of the option.
 * @param {HTMLElement} parent_element The element to add the document fragment onto.
 */
function createOption(option_name, option_description, parent_element) {
    let doc_frag = document.createDocumentFragment();

    let button_element = document.createElement("div");
    button_element.onclick = optionClick;

    let optionTitle = document.createElement("p");
    optionTitle.innerText = option_name;
    optionTitle.className = "optionTitle";

    let optionDescription = document.createElement("p");
    optionDescription.innerText = option_description;
    optionDescription.className = "optionDescription";

    button_element.appendChild(optionTitle);
    button_element.appendChild(optionDescription);

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
    let model_arr = options.split("\n");

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
 * @returns null
 */
async function toggleSelection(element_id) {
    let selection = document.getElementById(element_id);

    // whether the opacity is an empty string or not, it will always become a number between 0 & 1.
    if (selection.style.visibility === "visible") {
        selection.setAttribute("style", "opacity: 0; visibility: collapse;")
        return null;
    }

    selection.setAttribute("style", "opacity: 1; visibility: visible;")
}