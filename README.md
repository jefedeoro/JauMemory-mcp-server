# JauMemory MCP Server

A Model Context Protocol (MCP) server that provides persistent memory capabilities for AI assistants like Claude. Store, recall, and analyze information across conversations with intelligent memory management.

## Features

- 🧠 **Persistent Memory**: Store information that persists across all sessions
- 🔍 **Smart Recall**: Search memories using keywords or semantic similarity
- 📊 **Pattern Analysis**: Automatically detect patterns and extract insights
- 🏷️ **Automatic Classification**: Memories are automatically categorized (errors, solutions, insights, questions)
- 🔄 **Memory Consolidation**: Merge related memories to prevent redundancy
- 🎯 **Importance Scoring**: Content-based importance assessment with learning value metrics
- 🤝 **Multi-Agent Support**: Coordinate between multiple AI agents with notifications and assignments
- 🚀 **Production Ready**: Connects to JauMemory cloud service with secure authentication

## Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- JauMemory account (free tier available at [mem.jau.app](https://mem.jau.app))

## Installation

### From NPM

```bash
npm install -g @jaumemory/mcp-server
```

### From GitHub

```bash
git clone https://github.com/Jau-app/jaumemory-mcp-server.git
cd jaumemory-mcp-server
npm install
npm run build
```

## Configuration

### Claude Desktop Integration

Add to your Claude desktop configuration file:

**MacOS/Linux**: `~/.config/claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "jaumemory": {
      "command": "npx",
      "args": ["@jaumemory/mcp-server"],
      "env": {
        "JAUMEMORY_API_URL": "https://mem.jau.app",
        "JAUMEMORY_GRPC_URL": "mem.jau.app:50051",
        "JAUMEMORY_USERNAME": "your-username",
        "JAUMEMORY_EMAIL": "your-email@example.com"
      }
    }
  }
}
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Production API Configuration
JAUMEMORY_API_URL=https://mem.jau.app
JAUMEMORY_GRPC_URL=mem.jau.app:50051

# JauMemory Credentials
JAUMEMORY_USERNAME=your-username
JAUMEMORY_EMAIL=your-email@example.com

# Optional: Use existing auth hash from web login
# JAUMEMORY_AUTH_HASH=your-auth-hash-here

# Logging
LOG_LEVEL=info
NODE_ENV=production
```

## Authentication

### First-Time Setup

1. Configure your username and email in the environment
2. Launch Claude Desktop - the MCP server will start automatically
3. Use the `mcp_login` tool in Claude to initiate authentication
4. Click the approval link sent to your browser
5. Complete the authentication in your web browser
6. The server will automatically store your credentials securely

### Using Existing Web Login

If you're already logged into JauMemory web app:
1. Copy your auth hash from browser developer tools
2. Set `JAUMEMORY_AUTH_HASH` in your environment
3. The server will use your existing session

## Usage

### MCP Tools Available

Once integrated with Claude, you'll have access to these tools:

#### Core Memory Tools

**`remember`** - Store a new memory with automatic classification
```javascript
remember({
  content: "Important insight about TypeScript generics",
  tags: ["typescript", "learning"],
  importance: 0.8,
  shortcuts: ["--insight", "--high"]
})
```

**`recall`** - Search and retrieve memories
```javascript
recall({
  query: "typescript generics",
  limit: 10,
  mode: "keyword" // or "semantic" for AI-powered search
})
```

**`forget`** - Delete a specific memory
```javascript
forget({
  memoryId: "550e8400-e29b-41d4-a716-446655440000"
})
```

**`update`** - Update an existing memory
```javascript
update({
  memoryId: "memory-id",
  content: "Updated content",
  importance: 0.9
})
```

#### Analysis Tools

**`analyze`** - Analyze patterns and extract insights
```javascript
analyze({
  timeRange: "week" // or "day", "month", "all"
})
```

**`consolidate`** - Consolidate similar memories
```javascript
consolidate({
  similarityThreshold: 0.7,
  minGroupSize: 2
})
```

**`memory_stats`** - Get statistics about memories
```javascript
memory_stats({
  query: "project-name",
  timeRange: { start: "2024-01-01", end: "2024-12-31" }
})
```

#### Multi-Agent Features

**`create_agent`** - Create an AI agent with personality
```javascript
create_agent({
  name: "Code Reviewer",
  personalityTraits: ["analytical", "detail-oriented"],
  specializations: ["code-review", "best-practices"]
})
```

**`check_notifications`** - Check for agent notifications
```javascript
check_notifications({
  agentId: "reviewer-001"
})
```

### Shortcuts System

Quick memory creation with metadata flags:

```javascript
remember({
  content: "Fix authentication bug",
  shortcuts: ["--bug", "--high", "--assign @backend-dev", "--project webapp"]
})
```

Available shortcuts:
- **Types**: `--todo`, `--task`, `--bug`, `--question`, `--note`
- **Status**: `--pending`, `--wip`, `--done`, `--blocked [reason]`
- **Priority**: `--low`, `--medium`, `--high`, `--urgent`
- **Assignment**: `--assign @agent-name`, `--notify @agent1,@agent2`
- **Context**: `--project name`, `--thread id`, `--parent memory-id`

## Memory Types

JauMemory automatically classifies memories:

- 🔴 **Error**: Problems and bugs encountered
- ✅ **Solution**: Fixes and resolutions
- 💡 **Insight**: Patterns and realizations
- ❓ **Question**: Unknowns and research needs

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Project Structure

```
jaumemory-mcp-server/
├── src/                # TypeScript source code
│   ├── index.ts        # Main entry point
│   ├── auth/           # Authentication logic
│   ├── client/         # gRPC client code
│   ├── tools/          # MCP tool implementations
│   └── utils/          # Utility functions
├── dist/               # Compiled JavaScript
├── proto/              # Protocol buffer definitions
└── package.json        # Package configuration
```

## Troubleshooting

### Authentication Issues

1. Ensure you have a valid JauMemory account
2. Check your username and email are correct
3. Look for the approval link in your browser
4. Check logs: `LOG_LEVEL=debug npm start`

### Connection Problems

1. Verify internet connection
2. Check if JauMemory service is available
3. Ensure firewall allows HTTPS/gRPC connections
4. Try clearing auth cache and re-authenticating

### Claude Integration

1. Verify MCP configuration in Claude desktop
2. Restart Claude after configuration changes
3. Check Claude logs for MCP errors
4. Ensure Node.js version is 18.0.0 or higher

## Security

- Authentication uses secure MCP approval flow
- Credentials are encrypted and stored securely
- All communication uses HTTPS/TLS
- No sensitive data is logged

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://mem.jau.app/docs)
- 🐛 [Issue Tracker](https://github.com/Jau-app/jaumemory-mcp-server/issues)
- 💬 [Discussions](https://github.com/Jau-app/jaumemory-mcp-server/discussions)
- 🌐 [JauMemory Website](https://mem.jau.app)

## Acknowledgments

- Built for use with [Claude](https://www.anthropic.com/claude) by Anthropic
- Uses the [Model Context Protocol](https://modelcontextprotocol.io) specification
- Powered by JauMemory's high-performance Rust backend

---

Made with ❤️ for the AI assistant community