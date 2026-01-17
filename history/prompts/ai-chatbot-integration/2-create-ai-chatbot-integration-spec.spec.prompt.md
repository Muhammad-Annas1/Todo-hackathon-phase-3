---
id: 2
title: Create-AI-Chatbot-Integration-Spec
stage: spec
date: 2026-01-09
surface: agent
model: Qwen
feature: ai-chatbot-integration
branch: 003-ai-chatbot-integration
user: todo-hackathon-user
command: /sp.specify
labels: ["spec", "ai", "chatbot", "cohere", "todo"]
links:
  spec: ../../specs/003-ai-chatbot-integration/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-ai-chatbot-integration/spec.md
  - specs/003-ai-chatbot-integration/checklists/requirements.md
tests: []
outcome: "Created comprehensive specification for AI chatbot integration with Cohere API"
evaluation: "Success - Complete spec with user stories, requirements, and success criteria"
---

# Prompt History Record

## Prompt
```
Phase III - AI Chatbot Integration Specification (Cohere Powered) Project: Todo (Full-Stack Multi-User Todo Application) Phase: III - Basic Level (Natural Language Chatbot) Target model: Qwen (Qwen2.5-Coder or similar recommended) Goal: Integrate a smart AI chatbot into the existing Phase II full-stack Todo app that allows users to manage tasks via natural language conversations using Cohere API. The chatbot must feel seamless, beautiful, and powerful — with full tool access to CRUD tasks, list them, and answer user queries (including user email/account info). Core Requirements & Integration Points 1. Backend Chat Endpoint - Extend FastAPI: POST /api/{user_id}/chat - Input: { message: str, conversation_id: int (optional) } - Output: { response: str, conversation_id: int, tool_calls: array (optional) } - Stateless: Fetch/store conversation history from DB (Conversation + Message tables) 2. AI Logic (Cohere API – No OpenAI/Gemini) - Use Cohere SDK (cohere>=5.0) - API Key: COHERE_API_KEY=AOEX7Kpeys8EFBwFpVyL8al6J75TVy8yME0P1zNw - Model: command-r-plus (supports native tool calling/function calling) - Adapt the provided OpenAI Agents SDK example pattern: - Instead of AsyncOpenAI + Gemini → use Cohere client + chat() with tools - Define @function_tool style decorators → convert to Cohere tool schema - Use Cohere's tool calling loop (agent calls tool → execute → feed result back) - Instructions: "You are a helpful Todo assistant. Use tools to manage tasks. Always confirm actions. Be friendly." 3. MCP-Style Tools (Cohere Tool Schema) - add_task(user_id: str, title: str, description: str optional) - list_tasks(user_id: str, status: str optional ["all", "pending", "completed"]) - update_task(user_id: str, task_id: int, title: str optional, description: str optional) - complete_task(user_id: str, task_id: int) - delete_task(user_id: str, task_id: int) - get_user_info(user_id: str) → returns {email, name, created_at} All tools: - Stateless - Use SQLModel + Neon DB - Enforce user_id filter (isolation) - Return JSON-compatible results for Cohere loop 4. Frontend Chatbot UI (Beautiful & Unique) - Floating chatbot icon (bottom-right, neon circle with chat bubble, pulse on hover) - Click → opens modal/full-screen chat window (glassmorphism, neon glow, matches Phase II UI theme) - Chat layout: Message bubbles (user right, assistant left), typing indicator - Input: Text field + send button (gradient) - History persists via conversation_id (stored in localStorage or session) - Integration: Send messages to /api/{user_id}/chat with JWT from Better Auth 5. Database Extensions (from Phase II) - Conversation: user_id (str), id (int PK), created_at, updated_at - Message: id (int PK), conversation_id (FK), user_id, role ("user"/"assistant"), content (text), created_at Constraints & Must-Haves - Cohere API only – no OpenAI/Gemini endpoints - Reuse Phase II env vars: - BETTER_AUTH_SECRET=0ptqlUaq8uCH7lQPVd0Bl5ryd6VtLdOX - DATABASE_URL=postgresql://neondb_owner:npg_hJvC09KfQFab@ep-dry-smoke-a4zvp08s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require - Add: COHERE_API_KEY=AOEX7Kpeys8EFBwFpVyL8al6J75TVy8yME0P1zNw - JWT on every chat request (from Better Auth session) - Stateless server: DB holds all state - Frontend: Next.js App Router, Tailwind + Framer Motion for animations - Beautiful UI: Glassmorphism, neon accents, floating icon, smooth chat transitions Success Criteria - User types "Add task buy milk" → chatbot adds task → confirms - "Show pending" → lists tasks - "Mark task 2 done" → completes it - "What is my email?" → responds with user's email - Chat icon floats beautifully → opens modal → full conversation works - Conversation resumes after refresh/restart (DB persistence) - No crashes: Invalid task ID, wrong auth, API errors handled Deliverables from Qwen - Updated backend structure: routers/chat.py, agents/chatbot_agent.py, tools/mcp_tools.py - Cohere client + adapted agent loop (from provided OpenAI example) - Tool definitions in Cohere format (JSON schema for function calling) - Frontend: ChatIcon.tsx, ChatModal.tsx, chat logic with API calls - DB models: Conversation & Message - .env.example with all keys - Example chat flows in README Make the chatbot feel like a premium, intelligent personal assistant — fully integrated, secure, and powered by Cohere!
```

## Response
```
I have successfully created a comprehensive feature specification for the AI chatbot integration. Here's what was accomplished:

1. Created the feature branch: 003-ai-chatbot-integration
2. Created the spec file at specs/003-ai-chatbot-integration/spec.md with:
   - Three prioritized user stories covering core functionality
   - Functional requirements detailing system behavior
   - Key entities involved in the feature
   - Measurable success criteria
   - Edge cases to consider

3. Created a quality checklist at specs/003-ai-chatbot-integration/checklists/requirements.md to validate the specification

The specification covers all the requirements from the original feature description, translating technical implementation details into user-focused requirements and success criteria. It defines how users will interact with the AI chatbot, what functionality it will provide, and how success will be measured.

The specification is now ready for the next phase: technical planning (/sp.plan).
```