from flask import Flask

def create_app():
    """
    PUBLIC_INTERFACE
    Flask app factory. Registers all blueprints for the JobTrack AI backend.
    """
    app = Flask(__name__)

    # Register the cover_letter route blueprint
    from .routes.cover_letter import cover_letter_bp
    app.register_blueprint(cover_letter_bp)

    # Register additional blueprints (resume matching, feedback, etc.) here as needed.

    return app
