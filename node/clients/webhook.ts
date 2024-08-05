import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Webhook extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    const headers: Record<string, string> = {
      ...options?.headers,
      'X-Vtex-Use-Https': 'true',
    }

    if (context.settings.token && context.settings.key) {
      headers['X-PS2WEBHOOK-API-AppToken'] = context.settings.token
      headers['X-PS2WEBHOOK-API-AppKey'] = context.settings.key
    }

    super(context.settings.webhookUrl, context, {
      ...options,
      headers,
    })
  }

  public async sendWebhook(body: unknown): Promise<unknown> {
    return this.http.post('', body, {
      metric: 'webhook-send',
    })
  }
}
