#!/bin/bash
cd /home/kavia/workspace/code-generation/jobtrack-ai-226-a5059a15/jobtrack_ai_backend_workspace/jobtrack_ai_backend
source venv/bin/activate
flake8 .
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

