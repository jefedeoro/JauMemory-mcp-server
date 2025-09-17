/**
 * Pattern client factory for production
 */

import { PatternServiceClient } from '../grpc/clients/pattern.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createPatternClient(authManager: AuthManager): Promise<PatternServiceClient> {
  const address = process.env.JAUMEMORY_GRPC_URL;
  if (!address) {
    throw new Error('JAUMEMORY_GRPC_URL environment variable is required');
  }
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  return new PatternServiceClient(address, authManager, useTls);
}