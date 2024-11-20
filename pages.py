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
    """
    Method to be called from the frontend to get a response regarding the given prompt.
    :return: Tuple[str, int]
    """
    prompt = request.get_json()
    response = OPENAI_CLIENT.generate_text(prompt["prompt"])  # Get a response from the LLM based on the input.
    response_content = response.choices[0].message.content

    # print(response)
    # print("*"*100)
    # print(response.choices)
    # print("*" * 100)
    # print(response.choices[0].message)
    # print("*" * 100)
    # print(response.choices[0].message.content)
    # Record conversation into basic txt file.

    with open(OPENAI_CLIENT.conversation, "r+") as file:
        file.write(f"Prompt: {prompt['prompt']}\n")  # write prompt to chat history
        file.write(f"Response: {response_content}\n")  # write response to chat history
        lines = file.readlines()

    print(lines)

    # Note, using len(lines) // 2, may not be a full proof id method as model responses can be over multiple lines.
    return f"{len(lines) // 2} {response_content}", 200  # the response should be returned here


@bp.route("/get-available-models", methods=["POST"])
def get_available_models() -> Tuple[str, int]:
    """
    Function to call in order to get all available models in the API key.
    :return: Tuple[str, int]
    """
    return OPENAI_CLIENT.model_list, 200


@bp.route("/get-parameter-value", methods=["POST"])
def get_parameter_value() -> Tuple[str, int]:
    """
    Function to call in order to get the parameters available to change in the given model.
    :return: Tuple[str, int]
    """
    return str(OPENAI_CLIENT.tuning_parameters[request.get_json()["parameter"]]), 200


@bp.route("/update-tuning-parameters", methods=["POST"])
def update_tuning_parameters() -> Tuple[str, int]:
    """
    Function to call to update the openAI client's tuning parameters.
    :return: Tuple[str, int]
    """
    param_details = request.get_json()

    if OPENAI_CLIENT.update_tuning_parameter(param_details["parameter"], param_details["value"]):
        return "", 200

    return "PASSED ARGUMENT WAS WRONG!", 200


@bp.route("/get-model-used", methods=["POST"])
def get_model_used() -> Tuple[str, int]:
    return OPENAI_CLIENT.model, 200


@bp.route("/update-model-used", methods=["POST"])
def update_model_used() -> Tuple[str, int]:
    """
    Function to call to update the model the user wants to use.
    :return: Tuple[str, int]
    """
    OPENAI_CLIENT.model = request.get_json()["model"]
    return "", 200
