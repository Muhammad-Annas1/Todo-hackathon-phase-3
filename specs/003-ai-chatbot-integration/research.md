# Research: AI Chatbot Integration (Cohere Powered)

## Overview
This document captures research findings for the AI chatbot integration feature, resolving all unknowns and clarifications needed for implementation.

## Technology Decisions

### 1. Cohere API Integration
**Decision**: Use Cohere's `command-r-plus` model with native tool calling capabilities
**Rationale**: The `command-r-plus` model is specifically designed for tool usage and has excellent natural language understanding capabilities. It supports native function calling which is perfect for our task management operations.
**Alternatives considered**: 
- OpenAI GPT models (rejected - constitution mandates Cohere API only)
- Anthropic Claude (rejected - constitution mandates Cohere API only)
- Self-hosted models (rejected - would add complexity and maintenance overhead)

### 2. Backend Architecture
**Decision**: Extend existing FastAPI backend with new chat endpoint and agent architecture
**Rationale**: Reusing existing infrastructure reduces complexity and leverages proven authentication and database patterns. The stateless nature fits well with our existing architecture.
**Alternatives considered**:
- Separate microservice (rejected - adds unnecessary complexity for this feature size)
- Serverless functions (rejected - would complicate database connections and authentication)

### 3. Database Schema Extensions
**Decision**: Add two new tables - Conversation and Message - to extend existing SQLModel schema
**Rationale**: This maintains data consistency with existing models and follows the same patterns. The conversation-based approach allows for contextual interactions.
**Alternatives considered**:
- Storing conversations in a separate NoSQL database (rejected - adds complexity and potential consistency issues)
- Embedding conversation history in existing user records (rejected - would lead to performance issues with large histories)

### 4. Frontend Chat Interface
**Decision**: Implement a floating chat icon that opens a modal with glassmorphism design to match existing UI
**Rationale**: Maintains consistency with existing UI patterns while providing an unobtrusive but accessible chat interface. The modal approach keeps the chat self-contained.
**Alternatives considered**:
- Dedicated chat page (rejected - would require navigation away from current context)
- Embedded chat widget (rejected - might interfere with existing UI elements)

### 5. Authentication & Security
**Decision**: Use existing JWT authentication with user_id parameter in the chat endpoint
**Rationale**: Leverages existing, proven security infrastructure. Maintains user isolation and session management consistency.
**Alternatives considered**:
- Separate authentication for chat (rejected - redundant and inconsistent)
- Session-based authentication (rejected - existing JWT system is sufficient)

## Implementation Patterns

### 1. Agent Loop Pattern
**Pattern**: Implement a Cohere-based agent loop that handles tool calling
**Details**: The agent receives user input, determines if tools need to be called, executes those tools, and generates a final response based on tool results
**Benefits**: Clean separation between AI logic and business logic, supports multi-step interactions

### 2. MCP-Style Tools
**Pattern**: Create stateless, database-backed tools that follow the MCP pattern
**Details**: Each tool is a pure function that takes parameters and performs a specific action against the database
**Benefits**: Easy to test, maintain, and extend; clear separation of concerns

### 3. State Management
**Pattern**: Stateless server with state stored in database
**Details**: All conversation state is stored in the database, with the server fetching and updating state as needed
**Benefits**: Scalability, reliability, and persistence across server restarts

## Key Findings

### 1. Cohere Tool Schema
Cohere uses a JSON schema format for defining tools that is similar to OpenAI's function calling format. Each tool needs to be defined with:
- name: The tool identifier
- description: What the tool does
- parameter_definitions: Schema for the parameters

### 2. Authentication Integration
The existing JWT authentication can be reused by extracting the user_id from the token and passing it to the chat endpoint, ensuring proper user isolation.

### 3. Database Transaction Handling
SQLModel's session management works well with FastAPI dependencies, allowing for proper transaction handling in the tools without complex setup.

### 4. Frontend State Management
Using localStorage for conversation persistence between sessions provides a good balance between functionality and simplicity without requiring additional backend endpoints.

## Risks & Mitigations

### 1. API Costs
**Risk**: Cohere API usage could become expensive with heavy usage
**Mitigation**: Implement rate limiting and monitoring; consider caching for common queries

### 2. AI Response Quality
**Risk**: The AI might misunderstand user intents or provide inappropriate responses
**Mitigation**: Implement proper error handling and validation; provide clear feedback to users when requests are ambiguous

### 3. Database Performance
**Risk**: Large conversation histories could impact database performance
**Mitigation**: Implement conversation history limits and archival strategies

### 4. Security Vulnerabilities
**Risk**: Injection attacks through the chat interface
**Mitigation**: Proper input sanitization and validation; strict user isolation

## Next Steps

1. Implement the database schema extensions
2. Create the Cohere agent and tool definitions
3. Build the chat API endpoint
4. Develop the frontend chat interface
5. Integrate with existing authentication
6. Test the complete flow with various user inputs