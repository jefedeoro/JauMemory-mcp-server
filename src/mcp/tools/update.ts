import { z } from 'zod';
import type { Tool } from './index.js';
import type { BackendClients } from '../../types/clients.js';

const updateSchema = z.object({
  memoryId: z.string().describe('Memory ID to update'),
  content: z.string().optional(),
  importance: z.number().optional()
});

export function updateTool(clients: BackendClients): Tool {
  return {
    name: 'update',
    description: 'Update an existing memory',
    inputSchema: {
      type: 'object',
      properties: {
        memoryId: { type: 'string', description: 'Memory ID to update' },
        content: { type: 'string', description: 'New content' },
        importance: { type: 'number', description: 'New importance' }
      },
      required: ['memoryId']
    },
    handler: async (args: unknown) => {
      const input = updateSchema.parse(args);
      const userId = await clients.auth.getCurrentUserId();
      
      await clients.memory.updateMemory(input.memoryId, userId, {
        content: input.content,
        importance: input.importance
      });
      
      return [{
        type: 'text',
        text: `Memory ${input.memoryId} updated successfully`
      }];
    }
  };
}