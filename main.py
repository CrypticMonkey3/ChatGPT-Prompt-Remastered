from flask_interface import create_app
from setup import auto_install
import openAI_client


if __name__ == "__main__":
    auto_install()
    gpt_remastered = create_app()
    gpt_remastered.run("localhost", 8080, True)
