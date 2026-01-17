# API Contract: Chat Endpoint

## Overview
This document specifies the API contract for the chat endpoint that integrates with the Cohere-powered AI chatbot.

## Endpoint: POST /api/{user_id}/chat

### Description
Processes natural language input from the user and returns AI-generated responses. The endpoint handles conversation state management and tool calling for task operations.

### Path Parameters
- `user_id` (string, required): The ID of the user initiating the chat. Used for authentication and user isolation.

### Request Headers
- `Authorization` (string, required): JWT token for authentication in the format "Bearer {token}"

### Request Body
```json
{
  "message": "Add a task to buy milk tomorrow",
  "conversation_id": 123
}
```

**Request Body Fields**:
- `message` (string, required): The user's natural language input
- `conversation_id` (integer, optional): The ID of an existing conversation to continue. If not provided, a new conversation will be created.

### Response
```json
{
  "response": "I've added the task 'buy milk' to your list.",
  "conversation_id": 123,
  "tool_calls": [
    {
      "name": "add_task",
      "arguments": {
        "user_id": "user_abc123",
        "title": "buy milk",
        "description": "Purchase milk tomorrow"
      }
    }
  ]
}
```

**Response Fields**:
- `response` (string): The AI-generated response to the user
- `conversation_id` (integer): The ID of the conversation (either the one provided or a new one created)
- `tool_calls` (array, optional): Array of tools that were called during processing, with their arguments

### Error Responses

#### 400 Bad Request
```json
{
  "detail": "Invalid request format"
}
```

#### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

#### 403 Forbidden
```json
{
  "detail": "Access denied - user ID mismatch"
}
```

#### 404 Not Found
```json
{
  "detail": "Conversation not found"
}
```

#### 500 Internal Server Error
```json
{
  "detail": "An error occurred processing your request"
}
```

### Authentication & Authorization
- The endpoint requires a valid JWT token in the Authorization header
- The user_id in the path must match the user_id in the JWT token
- All operations are restricted to the authenticated user's data

### Business Logic
1. Validate JWT token and user_id match
2. If conversation_id is provided, fetch existing conversation history
3. If no conversation_id, create a new conversation
4. Pass user message and conversation history to Cohere agent
5. Execute any required tool calls
6. Generate AI response based on tool results
7. Store user message and AI response in the conversation
8. Return the AI response and conversation ID

### Rate Limiting
- Requests are limited to 100 per hour per user
- Exceeding the limit results in a 429 Too Many Requests response