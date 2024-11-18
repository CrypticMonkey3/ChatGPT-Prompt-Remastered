window.onload = async function() {
    // When the page loads with this javaScript function, add an event listener to the prompt.
    document.getElementById("prompt_input").addEventListener("keyup", submitPrompt);
    document.getElementById("submit_prompt_input").addEventListener("mousedown", submitPrompt);

    // When the window loads up, fetch and create elements of available models to choose from.
    await fetchAvailableModels();
    // Fetch and create hyperparameter elements

}