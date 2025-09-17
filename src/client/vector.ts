/**
 * Vector client factory for production
 */

import { VectorServiceClient } from '../grpc/clients/vector.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createVectorClient(authManager: AuthManager): Promise<VectorServiceClient> {
  // Default to production URL if not specified
  const address = process.env.JAUMEMORY_GRPC_URL || 'mem.jau.app:50051';
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  return new VectorServiceClient(address, authManager, useTls);
}