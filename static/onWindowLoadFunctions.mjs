window.onload = async function() {
    // When the page loads with this javaScript function, add an event listener to the prompt.
    document.getElementById("prompt_input").addEventListener("keyup", submitPrompt);
    document.getElementById("submit_prompt_input").addEventListener("mousedown", submitPrompt);

    // When the window loads up, fetch and create elements of available options to choose from.
    fetchModelOptions("modelSelection");

    await bodiedFetch(  // so when the page is refreshed the chosen model will still be kept.
        "/get-model-used",
        {},
        function(model) {
            document.getElementById("modelDropdown").innerHTML = (model === "" ? "Choose a model" : model);
        }
    )

    await bodiedFetch(  // update the temperature background, and position of gauge handle.
        "/get-parameter-value",
        {"parameter": "temperature"},
        function(temp) {gaugeDrag(temp); setGaugeHandle(temp);}
    )
}