---
id: 3
title: Create-Implementation-Plan-AI-Chatbot
stage: plan
date: 2026-01-09
surface: agent
model: Qwen
feature: ai-chatbot-integration
branch: 003-ai-chatbot-integration
user: todo-hackathon-user
command: /sp.plan
labels: ["plan", "ai", "chatbot", "cohere", "todo"]
links:
  spec: ../003-ai-chatbot-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-ai-chatbot-integration/plan.md
  - specs/003-ai-chatbot-integration/research.md
  - specs/003-ai-chatbot-integration/data-model.md
  - specs/003-ai-chatbot-integration/contracts/chat-api-contract.md
  - specs/003-ai-chatbot-integration/quickstart.md
tests: []
outcome: "Created comprehensive implementation plan for AI chatbot integration with Cohere API"
evaluation: "Success - Complete plan with research, data model, contracts, and quickstart guide"
---

# Prompt History Record

## Prompt
```
Phase III - AI Chatbot Integration Implementation Plan (Cohere Powered)

Project: Todo
Phase: III - Basic Level (Natural Language Chatbot)
Builds on: Phase II full-stack (FastAPI backend + Next.js frontend)
Estimated effort: 12–20 hours (due to Cohere integration, tool loop & chat UI)

Goal: Integrate a smart, conversational AI chatbot using Cohere API, with floating icon in frontend, full task management capabilities, and seamless backend connection.

Implementation Order (recommended sequence):

1. Environment & Dependencies Setup (1–1.5h)
   - Add to .env (backend):
     - COHERE_API_KEY=AOEX7Kpeys8EFBwFpVyL8al6J75TVy8yME0P1zNw
     - Reuse existing: BETTER_AUTH_SECRET, DATABASE_URL
   - Backend deps (uv add): cohere>=5.0, httpx (if needed)
   - Frontend deps (npm install): framer-motion (for animations), react-hot-toast

2. Database Extensions (1.5–2h)
   - Extend models.py (SQLModel):
     - Conversation: user_id (str), id (int PK), created_at, updated_at
     - Message: id (int PK), conversation_id (FK), user_id, role ("user"/"assistant"), content (text), created_at
   - Auto-create tables on startup (metadata.create_all)
   - Add queries/helpers: get_conversation_history, save_message

3. Cohere-Powered Chat Agent Logic (3–5h)
   - Create backend/agents/chatbot_agent.py
   - Adapt provided OpenAI Agents SDK example:
     - Use Cohere client instead of AsyncOpenAI
     - Model: "command-r-plus" (supports native tool calling)
     - Define tools in Cohere schema format (JSON objects)
     - Implement agent loop:
       1. Fetch history from DB
       2. Build messages array (history + new user message)
       3. Call cohere.chat() with tools
       4. If tool calls → execute tools → feed results back
       5. Get final response
       6. Save assistant message to DB
   - Handle multi-turn tool calls (Cohere supports up to 5–10 in one response)

4. MCP-Style Tools (3–4h)
   - Create backend/tools/mcp_tools.py
   - Implement 6 tools as callable functions (with SQLModel DB ops):
     - add_task(user_id, title, description?)
     - list_tasks(user_id, status?)
     - update_task(user_id, task_id, title?, description?)
     - complete_task(user_id, task_id)
     - delete_task(user_id, task_id)
     - get_user_info(user_id) → return {email, name}
   - Each tool: Filter by user_id, return JSON-serializable result
   - Register tools in Cohere format (name, description, parameters schema)

5. Chat API Endpoint (1.5–2h)
   - Create routers/chat.py
   - POST /api/{user_id}/chat
     - Depends: get_current_user (JWT), get_db
     - Logic: Run chatbot_agent with user message
     - Return: {response, conversation_id, tool_calls?}
   - Auth: Must have valid JWT (user_id matches)

6. Frontend Chatbot UI (3–5h)
   - Add floating icon (bottom-right): Neon circle with chat bubble, pulse hover
   - On click → open modal (glassmorphism, neon border, matches Phase II theme)
   - ChatModal.tsx: Message list (bubbles: user right, assistant left), typing indicator
   - Input + send button (gradient)
   - Use /lib/api.ts to call /api/{user_id}/chat with JWT
   - Persist conversation_id in localStorage/session
   - Animations: Fade-in messages, smooth scroll to bottom (Framer Motion)

7. Testing & Polish (2–3h)
   - Test flows:
     - "Add task buy milk" → adds & confirms
     - "Show pending" → lists tasks
     - "Mark task 2 done" → completes
     - "What is my email?" → responds with user info
   - Verify: Conversation persists after refresh/restart
   - Error handling: Tool errors → friendly message
   - Update README: Chatbot usage, Cohere key note, screenshots

Constraints & Notes
- Cohere native tool calling only – no OpenAI SDK
- Stateless server: All state in DB
- Reuse Phase II auth/DB fully
- Frontend: Simple, beautiful chat modal (no external chat kits)
- Keep responses fast (<3–5s)

Success Checklist
☐ Chatbot icon floats beautifully → opens modal
☐ Natural language commands work for all 5 task ops + user info
☐ Cohere API integrated (tool calling loop)
☐ Full integration: Frontend ↔ Backend ↔ Cohere ↔ DB
☐ Conversation persists across sessions
☐ User isolation & security intact
☐ No crashes on invalid inputs/tool errors

Next step: Qwen code generation using this plan + previous /sp.specify
Primary model: Qwen
```

## Response
```
I have successfully completed the implementation planning for the AI chatbot integration. Here's what was accomplished:

1. Created the implementation plan at specs/003-ai-chatbot-integration/plan.md with:
   - Technical context including languages, frameworks, and constraints
   - Constitution compliance check
   - Detailed project structure
   - Complexity tracking

2. Generated Phase 0 research artifacts:
   - research.md: Comprehensive research document resolving all technical unknowns

3. Generated Phase 1 design artifacts:
   - data-model.md: Detailed data model for new Conversation and Message entities
   - contracts/chat-api-contract.md: API contract for the chat endpoint
   - quickstart.md: Quickstart guide for implementing and using the feature

4. Updated the agent context with new technologies from this feature

5. Created this PHR documenting the planning work

The implementation plan comprehensively covers the AI chatbot integration feature, with all necessary design artifacts generated and organized according to the project constitution. The plan is now ready for the task breakdown phase (/sp.tasks).
```