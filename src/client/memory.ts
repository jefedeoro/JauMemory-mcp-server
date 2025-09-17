/**
 * Memory client factory for production
 */

import { MemoryServiceClient } from '../grpc/clients/memory.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createMemoryClient(authManager: AuthManager): Promise<MemoryServiceClient> {
  // Default to production URL if not specified
  const address = process.env.JAUMEMORY_GRPC_URL || 'mem.jau.app:50051';

  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');

  return new MemoryServiceClient(address, authManager, useTls);
}