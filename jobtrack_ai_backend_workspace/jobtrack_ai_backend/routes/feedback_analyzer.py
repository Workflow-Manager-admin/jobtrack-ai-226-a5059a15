# PUBLIC_INTERFACE
from flask import Blueprint, request, jsonify
from jobtrack_ai_backend.app.services.cohere_client import CohereClient


feedback_analyzer_bp = Blueprint("feedback_analyzer", __name__)


@feedback_analyzer_bp.route("/analyze-feedback", methods=["POST"])
def analyze_feedback():
    """
    Analyze Recruiter Feedback

    Accepts recruiter feedback text and returns a mock AI analysis,
    including a summary and actionable suggestions.

    Request (JSON):
        - feedback (str): Recruiter feedback text.

    Response (JSON):
        - summary (str): Short summary.
        - suggestions (list): List of improvement/action suggestions.
    """
    data = request.get_json()
    feedback = data.get("feedback", "")

    if not feedback.strip():
        return jsonify({"detail": "No feedback submitted."}), 400

    # Use Cohere for feedback analysis!
    try:
        cohere = CohereClient()
        result = cohere.analyze_feedback(feedback)
        return jsonify(result)
    except Exception as e:
        return jsonify({"detail": f"Feedback analysis failed: {str(e)}"}), 500
