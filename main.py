from flask_interface import create_app
from setup import auto_install
import openAI_client


if __name__ == "__main__":
    auto_install()
    fitness_app = create_app()
    fitness_app.run("localhost", 8080, True)

