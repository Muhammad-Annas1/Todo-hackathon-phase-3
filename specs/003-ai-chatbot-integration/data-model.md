# Data Model: AI Chatbot Integration

## Overview
This document defines the data models required for the AI chatbot integration feature, extending the existing Todo application schema.

## Entity Definitions

### 1. Conversation
Represents a chat session for a user, containing metadata about the conversation.

**Fields**:
- `id` (int, Primary Key): Unique identifier for the conversation
- `user_id` (str): Foreign key linking to the user who owns this conversation
- `created_at` (datetime): Timestamp when the conversation was initiated
- `updated_at` (datetime): Timestamp when the conversation was last updated

**Relationships**:
- One-to-many with Message (one conversation can have many messages)

**Validation Rules**:
- `user_id` must exist in the users table
- `created_at` is set automatically on creation
- `updated_at` is updated automatically on any change

### 2. Message
Represents individual messages within a conversation, including sender, content, and timestamp.

**Fields**:
- `id` (int, Primary Key): Unique identifier for the message
- `conversation_id` (int): Foreign key linking to the conversation this message belongs to
- `user_id` (str): Foreign key linking to the user who sent this message
- `role` (str): The role of the sender ("user" or "assistant")
- `content` (str): The actual message content
- `created_at` (datetime): Timestamp when the message was sent

**Relationships**:
- Many-to-one with Conversation (many messages belong to one conversation)

**Validation Rules**:
- `conversation_id` must exist in the conversations table
- `user_id` must exist in the users table
- `role` must be either "user" or "assistant"
- `content` must not exceed 5000 characters
- `created_at` is set automatically on creation

## Extended Relationships

### Task (Existing)
The existing Task entity remains unchanged but will be accessed by the new tools.

**Fields** (unchanged):
- `id` (int, Primary Key)
- `user_id` (str): Links to the user who owns this task
- `title` (str): Task title
- `description` (str, optional): Task description
- `completed` (bool): Whether the task is completed
- `created_at` (datetime): When the task was created
- `updated_at` (datetime): When the task was last updated

### User (Existing)
The existing User entity remains unchanged but will be accessed by the new tools.

**Fields** (unchanged):
- `id` (str, Primary Key): User identifier from Better Auth
- `email` (str): User's email address
- `name` (str, optional): User's name
- `hashed_password` (str, optional): User's hashed password
- `created_at` (datetime): When the user account was created

## State Transitions

### Conversation State
- A conversation is created when a user starts a new chat session
- A conversation is updated when a new message is added
- Conversations may be archived after a period of inactivity (future enhancement)

### Message State
- Messages are immutable once created
- Messages are associated with a specific conversation and user
- Messages have a fixed role that doesn't change after creation

## Validation Rules

### Cross-Entity Validation
- Every message must belong to a valid conversation
- Every message must be associated with the correct user
- Users can only access their own conversations and messages
- Tools must filter by user_id to ensure proper isolation

### Data Integrity
- Foreign key constraints ensure referential integrity
- User isolation is enforced at the application level
- All timestamps are stored in UTC