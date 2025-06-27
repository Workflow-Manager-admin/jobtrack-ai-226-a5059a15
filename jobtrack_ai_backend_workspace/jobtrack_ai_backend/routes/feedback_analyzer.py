# PUBLIC_INTERFACE
from flask import Blueprint, request, jsonify

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

    # Mock AI logic
    summary = (
        "The feedback indicates strong communication skills, but suggests you work on technical depth during interviews."
        if "technical" in feedback.lower()
        else "The feedback provides general comments. No major strengths/weaknesses were highlighted."
    )
    suggestions = [
        "Review common technical interview questions.",
        "Practice discussing your project experience in more detail.",
        "Schedule a mock interview session to boost confidence."
    ] if "technical" in feedback.lower() else [
        "Keep requesting feedback for further improvement.",
        "Highlight your unique strengths during application."
    ]

    return jsonify({
        "summary": summary,
        "suggestions": suggestions,
    })
