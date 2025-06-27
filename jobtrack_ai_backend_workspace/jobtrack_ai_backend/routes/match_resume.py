from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

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

    # Optionally save the file or parse it (mocked here)
    filename = secure_filename(resume_file.filename)
    # You can save it if needed: e.g.,
    # resume_path = os.path.join("/tmp", filename)
    # resume_file.save(resume_path)
    # TODO: For now, just read the bytes for demonstration
    resume_contents = resume_file.read()

    # ---- MOCK Kavai AI INTEGRATION ----
    # Instead of calling the actual AI, provide stub suggestions.
    # In real deployment: replace with actual AI function call.
    suggestions = [
        "Tailor your summary section to mention skills cited in the job description.",
        "Use more relevant keywords found in the job responsibilities.",
        "Highlight measurable achievements that align with the job requirements.",
        "Adjust your work experience to emphasize related roles.",
        "Refine your skills section for a better match to the job ad."
    ]
    # You could use job_description and/or parsed resume_contents as input to AI.

    # Provide a mocked but realistic API structure
    return jsonify({"suggestions": suggestions}), 200
