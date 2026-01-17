# Implementation Plan: AI Chatbot Integration (Cohere Powered)

**Branch**: `003-ai-chatbot-integration` | **Date**: 2026-01-09 | **Spec**: [link](../003-ai-chatbot-integration/spec.md)
**Input**: Feature specification from `/specs/003-ai-chatbot-integration/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Integrate a smart, conversational AI chatbot using Cohere API into the existing Todo application. The implementation includes backend components for AI processing and tool calling, database extensions for conversation persistence, and a frontend chat interface with a floating icon. The chatbot will allow users to manage tasks via natural language commands while maintaining security and user isolation.

## Technical Context

**Language/Version**: Python 3.13 (backend), TypeScript 5.3+ (frontend), Next.js 16+ (App Router)
**Primary Dependencies**: FastAPI, SQLModel, Cohere SDK (cohere>=5.0), Neon PostgreSQL, Better Auth, Tailwind CSS, Framer Motion
**Storage**: Neon PostgreSQL (serverless) via SQLModel ORM with connection pooling
**Testing**: pytest (backend), Jest/React Testing Library (frontend) - optional for Phase III
**Target Platform**: Web application (frontend) with REST API backend, responsive design
**Project Type**: Web application (full-stack with separate frontend/backend)
**Performance Goals**: <5s response time for AI interactions, <2s for DB operations, 60fps animations
**Constraints**: Cohere API only (no OpenAI/Gemini), JWT authentication, user isolation, stateless server architecture
**Scale/Scope**: Individual user conversations, multi-tenant data isolation, persistent chat history

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Compliance Verification:
- ✅ Code Quality & AI Integration: Using Cohere API exclusively with proper SDK implementation
- ✅ User Experience: Natural language interactions through chatbot will feel conversational
- ✅ Security-First: JWT verification on chat endpoint, user isolation enforced
- ✅ Persistence & Reliability: Conversation and message state persist in DB between requests
- ✅ Multi-User Isolation: Conversations isolated by user_id, enforcing user data separation
- ✅ AI Integration & Tool Calling: Cohere API used for natural language processing and tool calling

### Potential Violations:
- None identified - all implementation plans comply with constitution principles

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Web application (full-stack with separate frontend/backend)
backend/
├── main.py              # Entry point & CORS
├── dependencies.py      # Auth & DB dependencies
├── migrate_db.py        # DB migration script
├── test_db_connection.py # DB connection test
├── requirements.txt     # Python dependencies
├── Dockerfile           # Backend containerization
├── .env.example         # Example environment variables
├── vercel.json          # Vercel deployment config
├── models/
│   └── database.py      # SQLModel database schemas (extended)
├── api/
│   ├── auth.py          # Auth endpoints
│   └── tasks.py         # Task endpoints
├── agents/              # AI agent implementations
│   └── chatbot_agent.py # Cohere-powered agent
├── tools/               # MCP-compatible tools for AI
│   └── mcp_tools.py     # Cohere tool definitions
├── routers/             # Additional API routes
│   └── chat.py          # Chat endpoint
├── schemas/             # Pydantic schemas
├── core/                # Core utilities
├── utils/               # Utility functions
└── tests/               # Backend tests

frontend/
├── package.json         # Node.js dependencies
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── .env.local.example   # Example environment variables
├── app/                 # App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── dashboard/       # Dashboard page
│   └── api/             # API routes
├── components/          # Reusable UI components
│   ├── TaskForm.tsx     # Task creation form
│   ├── TaskItem.tsx     # Individual task component
│   ├── TaskList.tsx     # Task list component
│   └── Chat/            # Chat components
│       ├── ChatIcon.tsx # Floating chat icon
│       ├── ChatModal.tsx # Chat modal component
│       └── MessageBubble.tsx # Message display component
├── lib/
│   ├── api.ts           # API client with JWT handling
│   └── chat.ts          # Chat API client
├── styles/              # Global styles
└── public/              # Static assets

docker-compose.yml        # Local development with Docker
README.md                # Project documentation
```

**Structure Decision**: Web application with separate frontend/backend to maintain clear separation of concerns. Backend extends existing structure with new agents, tools, and chat router. Frontend adds Chat components for the AI chatbot interface.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (None) | (N/A) | (N/A) |

## Summary of Generated Artifacts

The following design artifacts have been generated during the planning phase:

1. **research.md**: Comprehensive research document resolving all technical unknowns
2. **data-model.md**: Detailed data model for new Conversation and Message entities
3. **contracts/chat-api-contract.md**: API contract for the chat endpoint
4. **quickstart.md**: Quickstart guide for implementing and using the feature
5. **Agent Context**: Updated Qwen agent context with new technologies from this feature

All artifacts are compliant with the project constitution and ready for the task breakdown phase.
