/**
 * Consolidation client factory for production
 */

import { ConsolidationServiceClient } from '../grpc/clients/consolidation.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createConsolidationClient(authManager: AuthManager): Promise<ConsolidationServiceClient> {
  // Default to production URL if not specified
  const address = process.env.JAUMEMORY_GRPC_URL || 'mem.jau.app:50051';
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  return new ConsolidationServiceClient(address, authManager, useTls);
}