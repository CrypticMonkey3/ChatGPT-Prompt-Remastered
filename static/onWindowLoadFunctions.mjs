window.onload = async function() {
    // When the page loads with this javaScript function, add an event listener to the prompt.
    document.getElementById("prompt_input").addEventListener("keyup", submitPrompt);
    document.getElementById("submit_prompt_input").addEventListener("mousedown", submitPrompt);

    // When the window loads up, fetch and create elements of available options to choose from.
    fetchOptions("modelSelection");

    await bodiedFetch(  // update the
        "/get-parameter-value",
        {"parameter": "temperature"},
        function(x) {gaugeDrag(x); setGaugeHandle(x);}
    )
}