/**
 * Memory client factory for production
 */

import { MemoryServiceClient } from '../grpc/clients/memory.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createMemoryClient(authManager: AuthManager): Promise<MemoryServiceClient> {
  const address = process.env.JAUMEMORY_GRPC_URL;
  if (!address) {
    throw new Error('JAUMEMORY_GRPC_URL environment variable is required. Please set it to your JauMemory gRPC endpoint.');
  }
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  return new MemoryServiceClient(address, authManager, useTls);
}