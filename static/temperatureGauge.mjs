/**
 * Updates the temperature option's background.
 * @param updated_value
 */
function gaugeDrag(updated_value) {
    let tuning_option = document.getElementById("temperatureOption");
    let transparency_len = (0.5 - updated_value) * 200;

    tuning_option.setAttribute("style",
        `background-image: linear-gradient(to right, rgba(51, 49, 49, 0.5), rgba(51, 49, 49, 0.5)),
            linear-gradient(to right, blue 0%, transparent ${transparency_len}%),
            linear-gradient(to left, red 0%, transparent ${-transparency_len}%);`
    )

    console.log(updated_value);
}


/**
 * Records the change made in the gauge and sends it back to the openAI client for future use.
 * @param val
 */
function gaugeRelease(val) {
    console.log(val);
}