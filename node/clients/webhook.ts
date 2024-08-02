import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Webhook extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context.settings.webhookUrl, context, {
      ...options,
      headers: {
        ...options?.headers,
        ...(context.settings.token && context.settings.key) && {
          'X-PS2WEBHOOK-API-AppToken': context.settings.token,
          'X-PS2WEBHOOK-API-AppKey': context.settings.key
        },
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async sendWebhook(body: unknown): Promise<unknown> {
    return this.http.post('', body, {
      metric: 'webhook-send',
    })
  }
}
