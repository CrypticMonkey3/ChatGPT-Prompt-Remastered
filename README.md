# ChatGPT-Prompt-Remastered
A remastered interface of ChatGPT that feels more friendly to the user, such that you wouldn't want to go back to using ChatGPT's interface. Additionally, it features parameter tuning of models which is missed out in ChatGPTs interface to cater for the less tech-savvy audience.

## How to start?
Easy-peasy, replace the contents of API_Key.txt with your own API key, then run `main.py`.

- It automatically installs the required python packages:
  - `flask`
  - `openai`
  - `markdown2`
<br  /><br  />
- Creates a locally hosted page at: http://localhost:8080

## Features
### Input
This interface only takes in text input. Future implementations may include file reading, image generation.

### Output
The output uses markdown2's markdown function to convert the captured markdown from the model, and converts it into html.

However, it is only calibrated to the basics including, `p`, `h{x}`, `table` tags.

### Model Dropdown
A dropdown of all the models the given API_Key can offer.
Note, that some models are not best fitted to the current implementation, so you may not get a result you were looking for.

### Tuning options
Some parameters that you can use on any particular model to change the way they output a given prompt.

### Chat Sidebar
A thought to be useful feature which allows users to jump back to a previous prompt they asked, to quickly review or revise the model's response.

### Conversation Sidebar
A way to have conversations regarding different topics with any chosen model.