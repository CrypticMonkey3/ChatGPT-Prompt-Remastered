/**
 * Create the element containing the option for a particular model.
 * @param {string} model_name The name of the model.
 * @param {HTMLElement} parent_element The element to add the document fragment onto.
 */
function createModelOption(model_name, parent_element) {
    let doc_frag = document.createDocumentFragment();

    let button_element = document.createElement("button");
    button_element.innerHTML = model_name + "<br  />" + "Description";
    button_element.type = "button";

    doc_frag.appendChild(button_element);
    parent_element.appendChild(doc_frag);
}


/**
 * Creates a set of options to the user for a particular element dropdown.
 * @param {string[]} options An array of options.
 * @param {string} element_id The element ID of the dropdowns selection element.
 */
function createOptions(options, element_id) {
    let modelSelection = document.getElementById("modelSelection");
    let model_arr = models.split(" ");

    for (let i = 0; i < model_arr.length; i++) {
        createModelOption(model_arr[i], modelSelection);
    }
}


/**
 * Fetches available models to the user's API KEY, and creates selectable button elements for them.
 * @returns {Promise<void>}
 */
async function fetchAvailableModels() {
    await fetch(  // fetch all available models that can be chosen on the given API KEY
    "/get-available-models",
    {method: "POST"}  // no payload, this is simply a fetch.

    ).then(function(response) {
        return response.text();

    }).then(function(models) {
        let modelSelection = document.getElementById("modelSelection");
        let model_arr = models.split(" ");

        for (let i = 0; i < model_arr.length; i++) {
            createModelOption(model_arr[i], modelSelection);
        }

    }).catch(function(error) {
        // bring up an error message instead.
    })
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