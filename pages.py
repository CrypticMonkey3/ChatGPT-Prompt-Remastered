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
    if request.method == "POST":
        prompt = request.get_json()

        print(prompt)

        # response = OPENAI_CLIENT.generate_text("")  # Get a response from the LLM based on the input.

        with open(OPENAI_CLIENT.conversation, "a") as file:
            file.write(f"Prompt: {prompt.get('prompt', 'ERROR!')}\n")  # write prompt to chat history
            # write response to chat history

        return "", 200  # the response should be returned here

    raise NotImplementedError("GET for /prompt-response has not been implemented.")
