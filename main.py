from setup import install_packages


if __name__ == "__main__":
    install_packages(["flask", "openai", "markdown2"])

    from flask_interface import create_app

    gpt_remastered = create_app()
    gpt_remastered.run("localhost", 8080, True)
