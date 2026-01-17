# Feature Specification: AI Chatbot Integration (Cohere Powered)

**Feature Branch**: `003-ai-chatbot-integration`
**Created**: 2026-01-09
**Status**: Draft
**Input**: User description: "Phase III - AI Chatbot Integration Specification (Cohere Powered) Project: Todo (Full-Stack Multi-User Todo Application) Phase: III - Basic Level (Natural Language Chatbot) Target model: Qwen (Qwen2.5-Coder or similar recommended) Goal: Integrate a smart AI chatbot into the existing Phase II full-stack Todo app that allows users to manage tasks via natural language conversations using Cohere API. The chatbot must feel seamless, beautiful, and powerful — with full tool access to CRUD tasks, list them, and answer user queries (including user email/account info). Core Requirements & Integration Points 1. Backend Chat Endpoint - Extend FastAPI: POST /api/{user_id}/chat - Input: { message: str, conversation_id: int (optional) } - Output: { response: str, conversation_id: int, tool_calls: array (optional) } - Stateless: Fetch/store conversation history from DB (Conversation + Message tables) 2. AI Logic (Cohere API – No OpenAI/Gemini) - Use Cohere SDK (cohere>=5.0) - API Key: COHERE_API_KEY=AOEX7Kpeys8EFBwFpVyL8al6J75TVy8yME0P1zNw - Model: command-r-plus (supports native tool calling/function calling) - Adapt the provided OpenAI Agents SDK example pattern: - Instead of AsyncOpenAI + Gemini → use Cohere client + chat() with tools - Define @function_tool style decorators → convert to Cohere tool schema - Use Cohere's tool calling loop (agent calls tool → execute → feed result back) - Instructions: "You are a helpful Todo assistant. Use tools to manage tasks. Always confirm actions. Be friendly." 3. MCP-Style Tools (Cohere Tool Schema) - add_task(user_id: str, title: str, description: str optional) - list_tasks(user_id: str, status: str optional ["all", "pending", "completed"]) - update_task(user_id: str, task_id: int, title: str optional, description: str optional) - complete_task(user_id: str, task_id: int) - delete_task(user_id: str, task_id: int) - get_user_info(user_id: str) → returns {email, name, created_at} All tools: - Stateless - Use SQLModel + Neon DB - Enforce user_id filter (isolation) - Return JSON-compatible results for Cohere loop 4. Frontend Chatbot UI (Beautiful & Unique) - Floating chatbot icon (bottom-right, neon circle with chat bubble, pulse on hover) - Click → opens modal/full-screen chat window (glassmorphism, neon glow, matches Phase II UI theme) - Chat layout: Message bubbles (user right, assistant left), typing indicator - Input: Text field + send button (gradient) - History persists via conversation_id (stored in localStorage or session) - Integration: Send messages to /api/{user_id}/chat with JWT from Better Auth 5. Database Extensions (from Phase II) - Conversation: user_id (str), id (int PK), created_at, updated_at - Message: id (int PK), conversation_id (FK), user_id, role ("user"/"assistant"), content (text), created_at Constraints & Must-Haves - Cohere API only – no OpenAI/Gemini endpoints - Reuse Phase II env vars: - BETTER_AUTH_SECRET=0ptqlUaq8uCH7lQPVd0Bl5ryd6VtLdOX - DATABASE_URL=postgresql://neondb_owner:npg_hJvC09KfQFab@ep-dry-smoke-a4zvp08s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require - Add: COHERE_API_KEY=AOEX7Kpeys8EFBwFpVyL8al6J75TVy8yME0P1zNw - JWT on every chat request (from Better Auth session) - Stateless server: DB holds all state - Frontend: Next.js App Router, Tailwind + Framer Motion for animations - Beautiful UI: Glassmorphism, neon accents, floating icon, smooth chat transitions Success Criteria - User types "Add task buy milk" → chatbot adds task → confirms - "Show pending" → lists tasks - "Mark task 2 done" → completes it - "What is my email?" → responds with user's email - Chat icon floats beautifully → opens modal → full conversation works - Conversation resumes after refresh/restart (DB persistence) - No crashes: Invalid task ID, wrong auth, API errors handled Deliverables from Qwen - Updated backend structure: routers/chat.py, agents/chatbot_agent.py, tools/mcp_tools.py - Cohere client + adapted agent loop (from provided OpenAI example) - Tool definitions in Cohere format (JSON schema for function calling) - Frontend: ChatIcon.tsx, ChatModal.tsx, chat logic with API calls - DB models: Conversation & Message - .env.example with all keys - Example chat flows in README Make the chatbot feel like a premium, intelligent personal assistant — fully integrated, secure, and powered by Cohere!"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Natural Language Task Management (Priority: P1)

A user wants to manage their tasks using natural language instead of clicking through UI elements. They can type commands like "Add task to buy milk tomorrow" or "Show me my pending tasks" and the AI chatbot will interpret and execute these commands.

**Why this priority**: This is the core value proposition of the feature - allowing users to interact with their tasks naturally using AI.

**Independent Test**: The chatbot successfully interprets natural language commands and performs the corresponding task operations (add, list, update, complete, delete) with appropriate confirmations.

**Acceptance Scenarios**:

1. **Given** a user is on the dashboard, **When** they type "Add task buy milk tomorrow" in the chat, **Then** a new task titled "buy milk" with appropriate due date is created and the chatbot confirms the action
2. **Given** a user has multiple tasks, **When** they type "Show me pending tasks", **Then** the chatbot lists all pending tasks in a readable format
3. **Given** a user has tasks, **When** they type "Mark task 2 as completed", **Then** task 2 is marked as completed and the chatbot confirms the action

---

### User Story 2 - User Information Queries (Priority: P2)

A user wants to query their account information through the chatbot, such as their email address or other profile details, without navigating away from the current page.

**Why this priority**: Enhances the chatbot's utility by allowing users to get account information without leaving their current workflow.

**Independent Test**: The chatbot can retrieve and display user-specific information when prompted.

**Acceptance Scenarios**:

1. **Given** a user is chatting with the bot, **When** they type "What is my email?", **Then** the chatbot responds with the user's email address
2. **Given** a user is chatting with the bot, **When** they type "Tell me about my account", **Then** the chatbot responds with relevant account information (name, email, account creation date)

---

### User Story 3 - Persistent Conversation Experience (Priority: P3)

A user wants to resume their conversation with the chatbot after closing the browser or refreshing the page, maintaining context and history.

**Why this priority**: Ensures a seamless user experience by preserving conversation state across sessions.

**Independent Test**: Conversation history persists in the database and can be resumed after page refresh or returning later.

**Acceptance Scenarios**:

1. **Given** a user has an ongoing conversation, **When** they refresh the page, **Then** they can resume the conversation with preserved history
2. **Given** a user had a conversation yesterday, **When** they return today, **Then** they can continue the conversation or start a new one

---

### Edge Cases

- What happens when the user provides an invalid task ID? (e.g., "Mark task 999 as done" when only 5 tasks exist?)
- How does the system handle API errors from Cohere service?
- What happens when the user is not authenticated but tries to access the chatbot?
- How does the system handle malformed natural language that the AI can't interpret?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a chat interface accessible from any page in the application
- **FR-002**: System MUST accept natural language input and translate it to appropriate task operations
- **FR-003**: Users MUST be able to add, list, update, complete, and delete tasks via chat commands
- **FR-004**: System MUST store conversation history in the database for persistence
- **FR-005**: System MUST enforce user isolation - users can only access their own tasks and conversations
- **FR-006**: System MUST authenticate all chat requests using JWT tokens from Better Auth
- **FR-007**: Users MUST be able to query their account information through the chatbot
- **FR-008**: System MUST handle invalid inputs gracefully with helpful error messages
- **FR-009**: System MUST integrate with Cohere API for natural language processing and tool calling
- **FR-010**: System MUST maintain conversation state between requests using database storage

### Key Entities

- **Conversation**: Represents a chat session for a user, containing metadata like creation/update times
- **Message**: Represents individual messages within a conversation, including sender (user/assistant), content, and timestamp
- **Task**: Existing entity that represents user tasks, with title, description, completion status, and user association
- **User**: Existing entity representing authenticated users with email, name, and account details

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully add, list, update, complete, and delete tasks using natural language commands in 95% of attempts
- **SC-002**: Chatbot responds to user queries within 3 seconds for 90% of requests
- **SC-003**: 90% of users who try the chatbot feature use it again within the next week
- **SC-004**: Less than 5% of user inputs result in unhandled errors or unclear responses
- **SC-005**: Conversation history persists correctly across browser sessions for 95% of users
- **SC-006**: User task management tasks take 20% less time on average when using the chatbot versus traditional UI