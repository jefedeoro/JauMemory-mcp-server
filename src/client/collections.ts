/**
 * Collections client factory for production
 */

import { CollectionsServiceClient } from '../grpc/clients/collections.js';
import { AuthManager } from '../auth/AuthManager.js';

export async function createCollectionsClient(authManager: AuthManager): Promise<CollectionsServiceClient> {
  const address = process.env.JAUMEMORY_GRPC_URL;
  if (!address) {
    throw new Error('JAUMEMORY_GRPC_URL environment variable is required');
  }
  
  const useTls = !address.includes('localhost') && !address.includes('127.0.0.1');
  
  try {
    const client = new CollectionsServiceClient(address, authManager, useTls);
    // console.log('[Collections] Client created successfully for address:', address);
    return client;
  } catch (error) {
    console.error('[Collections] Failed to create client:', error);
    throw error;
  }
}