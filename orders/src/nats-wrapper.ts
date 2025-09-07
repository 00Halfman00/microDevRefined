import nats, { Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, url: string, clientId?: string) {
    const finalClientId = clientId || randomBytes(4).toString('hex');
    this._client = nats.connect(clusterId, finalClientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }

  close() {
    this._client?.close();
  }
}

export const natsWrapper = new NatsWrapper();
