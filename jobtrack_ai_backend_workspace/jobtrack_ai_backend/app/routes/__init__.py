"""
Routes Package

Imports all blueprints for easy registration in the Flask app.
"""

from .health import blp as health_blp
from .resume import blp as resume_blp
from .cover_letter import blp as cover_letter_blp
from .feedback import blp as feedback_blp
from .applications import blp as applications_blp

all_blueprints = [
    health_blp,
    resume_blp,
    cover_letter_blp,
    feedback_blp,
    applications_blp,
]