import os
import requests


# PUBLIC_INTERFACE
class CohereClient:
    """
    CohereClient - Service for interacting with Cohere's LLM endpoints.

    Loads the Cohere API key from COHERE_API_KEY environment variable.

    Environment:
        COHERE_API_KEY - Your Cohere API key (required).
    """

    API_BASE = "https://api.cohere.ai/v1"

    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get("COHERE_API_KEY")
        if not self.api_key:
            raise ValueError("COHERE_API_KEY is not set in environment or initializer.")

        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    # PUBLIC_INTERFACE
    def generate_text(self, prompt: str, max_tokens: int = 300, temperature: float = 0.5):
        """
        Generates text completion with Cohere's API.

        Args:
            prompt (str): The text prompt.
            max_tokens (int): Maximum number of tokens to generate.
            temperature (float): Generation temperature.

        Returns:
            The text response.
        """
        url = f"{self.API_BASE}/generate"
        payload = {
            "model": "command",
            "prompt": prompt,
            "max_tokens": max_tokens,
            "temperature": temperature,
        }
        response = requests.post(url, headers=self.headers, json=payload, timeout=20)
        response.raise_for_status()
        result = response.json()
        return result.get("generations", [{}])[0].get("text", "")

    # PUBLIC_INTERFACE
    def analyze_resume(self, resume_text: str, job_description: str):
        """
        Analyze resume using Cohere by generating suggestions for improvement.

        Args:
            resume_text (str): The resume contents.
            job_description (str): The job description.

        Returns:
            dict: Suggestions for resume improvement.
        """
        prompt = (
            "You are an expert career coach and resume writer. "
            "Given the following resume and job description, "
            "list 5 personalized suggestions to improve the resume for this role "
            "(be specific, use bullet points):\n\n"
            f"Job Description:\n{job_description}\n\nResume:\n{resume_text}\n\n"
            "Suggestions:\n-"
        )
        output = self.generate_text(prompt, max_tokens=150, temperature=0.3)
        suggestions = [s.strip(" .") for s in output.strip().split("\n-") if s.strip()]
        return {"suggestions": suggestions}

    # PUBLIC_INTERFACE
    def generate_cover_letter(self, job_role: str, job_description: str, resume_text: str, tone: str = "professional"):
        """
        Use Cohere to generate a cover letter.

        Args:
            job_role (str): Target job role.
            job_description (str): The job text.
            resume_text (str): User's resume.
            tone (str): Cover letter tone.

        Returns:
            dict: { "cover_letter": ... }
        """
        prompt = (
            f"Write a {tone} cover letter for the job role '{job_role}'. "
            f"Base it on this job description:\n{job_description}\n\n"
            f"And this resume:\n{resume_text}\n\n"
            "The cover letter should clearly highlight relevant experience and "
            "be concise but persuasive."
        )
        output = self.generate_text(prompt, max_tokens=350, temperature=0.65)
        return {"cover_letter": output.strip()}

    # PUBLIC_INTERFACE
    def analyze_feedback(self, feedback_text: str):
        """
        Use Cohere to analyze recruiter feedback and provide a summary and actionable suggestions.

        Args:
            feedback_text (str): Recruiter or interviewer feedback.

        Returns:
            dict: { "summary": ..., "suggestions": [...] }
        """
        prompt = (
            "You are a job coach. Summarize the following recruiter feedback in 1-2 sentences. "
            "Then, bullet-list 2-3 actionable suggestions to help the candidate improve:\n\n"
            f"Feedback:\n{feedback_text}\n\nSummary:"
        )
        output = self.generate_text(prompt, max_tokens=120, temperature=0.4)
        summary, *suggestions = output.split("Suggestions:")
        summary = summary.strip()
        suggestions_raw = suggestions[0] if suggestions else ""
        suggestion_lines = [
            s.strip(" .") for s in suggestions_raw.strip().split("\n-") if s.strip()
        ]
        if not suggestion_lines and "\n" in suggestions_raw:
            suggestion_lines = [
                s.strip(" .") for s in suggestions_raw.strip().split("\n") if s.strip()
            ]
        return {"summary": summary, "suggestions": suggestion_lines}
