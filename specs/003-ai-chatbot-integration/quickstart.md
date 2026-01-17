# Quickstart Guide: AI Chatbot Integration

## Overview
This guide provides a quick walkthrough of the AI chatbot integration feature, showing how to set up and use the new functionality.

## Prerequisites
- Python 3.13+
- Node.js 18+
- Cohere API key
- Existing Phase II Todo application setup

## Setup

### 1. Environment Variables
Add the following to your backend `.env` file:
```bash
COHERE_API_KEY=AOEX7Kpeys8EFBwFpVyL8al6J75TVy8yME0P1zNw
# Reuse existing:
BETTER_AUTH_SECRET=0ptqlUaq8uCH7lQPVd0Bl5ryd6VtLdOX
DATABASE_URL=postgresql://neondb_owner:npg_hJvC09KfQFab@ep-dry-smoke-a4zvp08s-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Install Dependencies
Backend:
```bash
cd backend
pip install cohere
```

Frontend:
```bash
cd frontend
npm install framer-motion react-hot-toast
```

## Architecture

### Backend Components
1. **Chat Endpoint** (`routers/chat.py`): Handles chat requests and authentication
2. **Chat Agent** (`agents/chatbot_agent.py`): Processes natural language with Cohere
3. **MCP Tools** (`tools/mcp_tools.py`): Implements task operations as callable tools
4. **Database Extensions**: New Conversation and Message models

### Frontend Components
1. **Chat Icon** (`components/Chat/ChatIcon.tsx`): Floating icon that triggers the chat modal
2. **Chat Modal** (`components/Chat/ChatModal.tsx`): Main chat interface
3. **Message Bubble** (`components/Chat/MessageBubble.tsx`): Displays individual messages

## Usage Examples

### 1. Starting a Conversation
1. Navigate to the dashboard
2. Click the floating chat icon (bottom-right)
3. Type a natural language command like "Add task to buy groceries"
4. The AI will process your request and respond

### 2. Task Operations
Try these commands in the chat:
- "Add task to call mom tomorrow"
- "Show me my pending tasks"
- "Mark task 3 as completed"
- "Update task 2 to 'Buy groceries'"
- "Delete task 1"

### 3. User Information
Ask the chatbot for your account details:
- "What is my email?"
- "Tell me about my account"

## Key Features

### Natural Language Processing
The chatbot uses Cohere's `command-r-plus` model to understand natural language and convert it to appropriate task operations.

### Persistent Conversations
Conversation history is stored in the database and persists across sessions. The conversation ID is maintained in localStorage.

### User Isolation
All operations are properly isolated by user_id, ensuring users can only access their own data.

### Error Handling
The system gracefully handles invalid inputs, non-existent tasks, and API errors with helpful responses.

## Troubleshooting

### Common Issues
1. **API Key Issues**: Ensure COHERE_API_KEY is properly set in environment variables
2. **Authentication Problems**: Verify JWT tokens are being passed correctly
3. **Database Connection**: Check that DATABASE_URL is properly configured

### Debugging Tips
- Check backend logs for detailed error information
- Verify that new database tables (Conversation, Message) were created
- Ensure frontend is sending JWT tokens with chat requests

## Next Steps
1. Explore the complete API documentation
2. Review the data models for Conversation and Message entities
3. Customize the chat UI to match your branding
4. Add additional tools for extended functionality