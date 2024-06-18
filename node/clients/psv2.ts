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
      retries: 2,
    })
  }

  public async getProfile(
    profileId: string,
    versionId: string
  ): Promise<Record<string, unknown>> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/versions/${versionId}/unmask?onBehalfOf=psv2-webhook`
    )
  }

  public async getAddress(
    profileId: string,
    addressId: string,
    versionId: string
  ): Promise<Record<string, unknown>> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/addresses/${addressId}/versions/${versionId}/unmask?onBehalfOf=psv2-webhook`
    )
  }
}
