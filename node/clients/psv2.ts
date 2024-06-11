import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class PSV2 extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public async getProfile(profileId: string): Promise<unknown> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/unmask?onBehalfOf=psv2-webhook`
    )
  }
}
