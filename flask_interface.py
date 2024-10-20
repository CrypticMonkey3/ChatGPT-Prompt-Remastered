from flask import Flask
import pages


def create_app():
    """
    Works as an application factory, which initialises the app and returns it.
    :return:
    """
    app = Flask(__name__)  # tells Flask where to look for resources such as templates and static files

    app.register_blueprint(pages.bp)
    return app

