from flask_interface import create_app
import openAI_client


if __name__ == "__main__":
    fitness_app = create_app()
    fitness_app.run("localhost", 8080, True)

