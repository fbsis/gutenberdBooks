import { createClient } from 'redis';

export interface ICache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, expirationInSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

export class Cache implements ICache {
  private client;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://redis:6379'
    });
    this.client.connect();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, expirationInSeconds: number = 3600): Promise<void> {
    await this.client.set(key, value, {
      EX: expirationInSeconds
    });
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}