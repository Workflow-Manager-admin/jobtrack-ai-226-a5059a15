from flask import Blueprint, request, jsonify
from jobtrack_ai_backend.app.services.cohere_client import CohereClient

match_resume_bp = Blueprint("match_resume", __name__)


# PUBLIC_INTERFACE
@match_resume_bp.route("/match-resume", methods=["POST"])
def match_resume():
    """
    Resume Matching Endpoint
    -----------------------
    Accepts a resume file and a pasted job description, invokes
    (mock) Kavai AI processing, and returns tailored improvement suggestions.

    Expects:
      - resume: file (PDF/DOC/DOCX)
      - job_description: string (text)

    Returns:
      - JSON: { "suggestions": [str, str, ...] }
    """
    # Check presence of parts
    if "resume" not in request.files:
        return jsonify({"detail": "Resume file is required."}), 400
    if "job_description" not in request.form:
        return jsonify({"detail": "Job description is required."}), 400

    resume_file = request.files["resume"]
    job_description = request.form["job_description"]

    # Optionally read file content for AI analysis
    resume_contents_raw = resume_file.read(4096)
    try:
        resume_text = resume_contents_raw.decode("utf-8", errors="ignore")
    except Exception:
        resume_text = ""
    # Call Cohere to get real suggestions!
    try:
        cohere = CohereClient()
        result = cohere.analyze_resume(resume_text, job_description)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"detail": f"AI analysis failed: {str(e)}"}), 500
