from flask import Blueprint, render_template, request
import openAI_client
from typing import *

OPENAI_CLIENT = openAI_client.OpenAIClient()

# blueprints are modules that help organise the structure of applications into subdirectories.
bp = Blueprint("pages", __name__)


@bp.route("/")
def home() -> str:
    """
    Landing page route
    :return: str
    """
    return render_template("pages/home.html")  # render_template expects parameter to be in a templates/ folder already.


@bp.route("/prompt-response", methods=["POST"])
def prompt_response() -> Tuple[str, int]:

    prompt = request.get_json()

    response = OPENAI_CLIENT.generate_text(prompt["prompt"])  # Get a response from the LLM based on the input.
    print(response)
    print("*"*100)
    print(response.choices)
    print("*" * 100)
    print(response.choices[0].message)
    print("*" * 100)
    print(response.choices[0].message.content)
    # with open(OPENAI_CLIENT.conversation, "a") as file:
    #     file.write(f"Prompt: {prompt['prompt']}\n")  # write prompt to chat history
    #     file.write(f"Response: {response.content}\n")# write response to chat history

    return prompt["prompt"], 200  # the response should be returned here
