import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { ADDRESS_ENTITY, PROFILE_ENTITY, PURCHASE_INFO_ENTITY, CONTACTS_ENTITY } from '../constants'

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

  public async getDocument(
    entity: string,
    profileId: string,
    documentId: string,
    versionId: string
  ): Promise<Record<string, unknown>> {
    switch (entity) {
      case PROFILE_ENTITY:
        return this.getProfile(profileId, versionId)
      case ADDRESS_ENTITY:
        return this.getAddress(profileId, documentId, versionId)
      case PURCHASE_INFO_ENTITY:
        return this.getPurchaseInfo(profileId)
      case CONTACTS_ENTITY:
        return this.getContact(profileId, documentId, versionId)
      default:
        throw new Error(
          `The entity ${entity} is not supported by this app.`
        )
    }
  }

  private async getProfile(
    profileId: string,
    versionId: string
  ): Promise<Record<string, unknown>> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/versions/${versionId}/unmask?onBehalfOf=psv2-webhook`
    )
  }

  private async getAddress(
    profileId: string,
    addressId: string,
    versionId: string
  ): Promise<Record<string, unknown>> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/addresses/${addressId}/versions/${versionId}/unmask?onBehalfOf=psv2-webhook`
    )
  }

  private async getPurchaseInfo(
    profileId: string
  ): Promise<Record<string, unknown>> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/purchase-info/unmask?onBehalfOf=psv2-webhook`
    )
  }

  private async getContact(
    profileId: string,
    contactId: string,
    versionId: string
  ): Promise<Record<string, unknown>> {
    return this.http.get(
      `/api/storage/profile-system/profiles/${profileId}/contacts/${contactId}/versions/${versionId}/unmask?onBehalfOf=psv2-webhook`
    )
  }
}
