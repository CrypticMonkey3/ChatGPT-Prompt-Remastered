/**
 * Updates the temperature option's background.
 * @param updated_value
 */
function gaugeDrag(updated_value) {
    let tuning_option = document.getElementById("temperatureOption");
    let snowflakes = document.getElementById("SnowflakesBackground");
    let sunburst = document.getElementById("SunBurstBackground");

    let transparency_len = (0.5 - updated_value) * 200;

    tuning_option.setAttribute("style",
        `background-image: linear-gradient(to right, rgba(51, 49, 49, 0.5), rgba(51, 49, 49, 0.5)),
            linear-gradient(to right, blue 0%, transparent ${transparency_len}%),
            linear-gradient(to left, red 0%, transparent ${-transparency_len}%);`
    )

    snowflakes.setAttribute("style", `opacity: ${transparency_len / 100}`);
    sunburst.setAttribute("style", `opacity: ${-transparency_len / 100}`);
}


/**
 * Sets the position of the handle on the temperature gauge scale.
 * @param {string} temp The temperature to set the handle to.
 */
function setGaugeHandle(temp) {
    let tuning_option = document.getElementById("temperatureScale");
    tuning_option.setAttribute("value", temp);
}


/**
 * Records the change made in the gauge and sends it back to the openAI client for future use.
 * @param {string} new_temp The new temperature value.
 */
async function gaugeRelease(new_temp) {
    await bodiedFetch(
        "/update-tuning-parameters",
        {
            "parameter": "temperature",
            "value": parseFloat(new_temp)
        }
    )
}