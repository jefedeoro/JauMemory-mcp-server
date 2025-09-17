/**
 * Vector client factory for production
 */

import { VectorServiceClient } from '../grpc/clients/vector.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createVectorClient(authManager: AuthManager): Promise<VectorServiceClient> {
  const address = process.env.JAUMEMORY_GRPC_URL;
  if (!address) {
    throw new Error('JAUMEMORY_GRPC_URL environment variable is required');
  }
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  return new VectorServiceClient(address, authManager, useTls);
}