#!/bin/bash
cd /home/kavia/workspace/code-generation/jobtrack-ai-226-a5059a15/jobtrack_ai_frontend_workspace/jobtrack_ai_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

