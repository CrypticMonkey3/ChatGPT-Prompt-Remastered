let keys_pressed = {};  // Inspired by https://medium.com/@rushikesh1s/detect-single-and-multiple-keypress-events-in-javascript-ad2164dbddb3
let prompt_container_initHeight;


window.onload = async function() {
    // When the page loads with this javaScript function, add an event listener to the prompt.
    document.getElementById("prompt_input").addEventListener("keydown", function(event) {
        keys_pressed[event.key] = true;
    })
    document.getElementById("prompt_input").addEventListener("keyup", function(event) {
        delete keys_pressed[event.key];
    });

    document.getElementById("prompt_input").value = "";
    document.getElementById("submit_prompt_input").addEventListener("mouseup", submitPrompt);

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

    prompt_container_initHeight = Math.round(document.getElementById("prompt_container").getBoundingClientRect()["height"]);
}