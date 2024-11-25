# ChatGPT-Prompt-Remastered
A remastered interface of ChatGPT that feels more friendly to the user, in a way that you would not want to go back to using the original ChatGPT interface. Additionally, it features parameter tuning for models which is missed out in ChatGPTs interface to cater for the less tech-savvy audience.

## How to start?
Easy-peasy, replace the contents of API_Key.txt with your own API key, then run `main.py`.

- It automatically installs the required python packages:
  - `flask`
  - `openai`
  - `markdown2`
<br  /><br  />
- Creates a locally hosted page at: http://localhost:8080

## Future implements
### Storing Multiple Conversations
The sidebar that can be opened and closed was designed specifically for this. However, due to the time constraints of the project, this could not be implemented in time.

### Stream Feature
Similar to how ChatGPT outputs chunks of a response at a time, this was meant to be added in the Tuning Dropdown section.

### Profile
A profile section that allows you to actively change API Keys, profile picture, and add your own theme to the platform.

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