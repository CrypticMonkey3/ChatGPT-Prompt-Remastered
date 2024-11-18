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

    doc_frag.appendChild(button_element);
    parent_element.appendChild(doc_frag);
}


/**
 * Creates a set of options to the user for a particular element dropdown.
 * @param {string} options A string of options separated by spaces.
 * @param {string} element_id The element ID of the dropdowns selection element.
 */
function createOptions(options, element_id) {
    let selection = document.getElementById(element_id);
    let model_arr = options.split(",");

    for (let i = 0; i < model_arr.length; i++) {
        let option = model_arr[i].split(' ');

        createOption(option[0], option[1], selection);
    }
}


/**
 * A simple fetch call to a particular destination.
 * @param target_dest Internal page.
 * @returns {Promise<string>}  The type of string to be returned with the Promise object.
 */
async function SimpleFetch(target_dest) {
    return await fetch(
        target_dest,
        {method: "POST"}  // no payload, this is simply a fetch.

    ).then(function(response) {
        return response.text();

    }).catch(function(error) {  // in case something went wrong.
        console.log(error);
        return "";

    })
}


/**
 * Fetches options on a given id, and adds them into their appropriate div with the given id.
 * @param {string} element_id The id of the selection div.
 * @returns null
 */
function fetchOptions(element_id) {
    let fetch_dest = ""  // an internal link to which function to call to get the appropriate data.

    switch(element_id) {
        case "modelSelection":
            fetch_dest = "/get-available-models";
            break;

        case "modelTuningSelection":
            fetch_dest = "/get-tuning-parameters";
            break;
    }

    if (fetch_dest !== "") {
        let options = SimpleFetch(fetch_dest);  // Returns a Promise<string>

        options.then(function(response) {
            if (response !== "") {
                createOptions(response, element_id);
            }
        })

        return null;
    }

    console.log(`Unidentified element ID: ${element_id}`);
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