/**
 * Checks the response style, and detects whether it has been changed or not. (as well as adjusting the textarea size)
 * @param {string} set_style Whether or not a new response style should be set or not.
 */
function checkResponseStyleArea(set_style = "") {
    let response_style_confirmer = document.getElementById("responseStyleConfirmation");
    let response_style_textarea = document.getElementById("responseStyleInput");

    if (set_style !== "") {
        response_style_textarea.value = set_style;
    }

    // Adjusts the height of the textarea if necessary.
    response_style_textarea.style.height = "";
    response_style_textarea.style.height = `${Math.min(response_style_textarea.scrollHeight + 3, 97)}px`;

    // Check whether to show the 'Cancel' or 'Apply' button.
    response_style_confirmer.classList.add("hide");
    if (response_style_textarea.value !== current_response_style) {
        response_style_confirmer.classList.remove("hide");
    }
}


async function applyResponseStyle() {
    await bodiedFetch(
        "/update-tuning-parameters",
        {
            "parameter": "response style",
            "value": document.getElementById("responseStyleInput").value
        }
    )
    document.getElementById("responseStyleConfirmation").classList.add("hide");
}