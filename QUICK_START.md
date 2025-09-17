# Quick Start Guide

## 1. Install

```bash
npm install
npm run build
```

## 2. Configure

Create a `.env` file:

```env
# For first-time setup
JAUMEMORY_USERNAME=your_username
JAUMEMORY_PASSWORD=your_password
JAUMEMORY_EMAIL=your_email@example.com

# OR if you have an auth hash
JAUMEMORY_AUTH_HASH=your_saved_auth_hash
```

## 3. First Run

```bash
npm start
```

For first-time setup:
1. You'll see an approval URL
2. Open it in your browser
3. Log in to JauMemory
4. Approve the connection
5. The server will save the auth hash

## 4. Configure Claude Desktop

Add to Claude's config file:

```json
{
  "mcpServers": {
    "jaumemory": {
      "command": "node",
      "args": ["/full/path/to/jauauth-mcp-server/dist/index.js"]
    }
  }
}
```

## 5. Use in Claude

```javascript
// Store a memory
remember({ content: "My important note" })

// Search memories
recall({ query: "important" })
```

That's it! 🎉