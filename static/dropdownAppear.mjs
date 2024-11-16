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
 * @returns {Promise<void>}
 */
async function showSelection() {
    let modelSelection = document.getElementById("modelSelection");
    // whether the opacity is an empty string or not, it will always become a number between 0 & 1.
    modelSelection.style.opacity = parseInt(`0${modelSelection.style.opacity}`) ? "0" : "1";
}