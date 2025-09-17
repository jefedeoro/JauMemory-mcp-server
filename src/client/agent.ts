/**
 * Agent client factory for production
 */

import { AgentServiceClient } from '../grpc/clients/agent.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createAgentClient(authManager: AuthManager): Promise<AgentServiceClient> {
  const address = process.env.JAUMEMORY_GRPC_URL;
  if (!address) {
    throw new Error('JAUMEMORY_GRPC_URL environment variable is required');
  }
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  return new AgentServiceClient(address, authManager, useTls);
}