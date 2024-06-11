import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Webhook extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context.settings.webhookUrl, context, {
      ...options,
      headers: {
        ...options?.headers,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async sendWebhook(body: any): Promise<any> {
    return this.http.post('', body, {
      metric: 'webhook-send'
    })
  }
}