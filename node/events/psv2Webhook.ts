import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'
import type { ProfileSystemEvent } from '../models/profileSystemEvent'
import { ADDRESS_ENTITY, PROFILE_ENTITY, DELETE_OPERATION } from '../constants'

export async function psv2Webhook(ctx: EventContext<Clients>) {
  const {
    vtex: { account, workspace },
  } = ctx

  const appSettings = await ctx.clients.apps.getAppSettings(
    process.env.VTEX_APP_ID as string
  )

  ctx.vtex.settings = { ...ctx.vtex.settings, ...appSettings }

  const { webhookUrl } = ctx.vtex.settings

  if (!webhookUrl) {
    throw new Error(
      `No webhook url was set. Go to https://${workspace}--${account}.myvtex.com/admin/apps/${process.env.VTEX_APP_ID}/setup/ and set your webhook url.`
    )
  }

  const event = ctx.body as ProfileSystemEvent
  const reqBody = {
    payload: {},
    profileId: event.profileId,
    operation: event.operation.toLowerCase(),
    subject: event.entity.toLowerCase(),
  }

  let docResponse: Record<string, unknown> = {}

  if (event.operation === DELETE_OPERATION) {
    reqBody.payload = {
      id: event.documentId,
    }
  } else {
    if (event.entity.toLowerCase() === PROFILE_ENTITY) {
      docResponse = await ctx.clients.psv2.getProfile(
        event.profileId,
        event.documentVersion
      )
    } else if (event.entity.toLowerCase() === ADDRESS_ENTITY) {
      docResponse = await ctx.clients.psv2.getAddress(
        event.profileId,
        event.documentId,
        event.documentVersion
      )
    }

    reqBody.payload = docResponse
  }

  await ctx.clients.webhook.sendWebhook(reqBody)

  ctx.vtex.logger.info({
    message: 'Successfully sent webhook',
    webhookUrl,
    body: ctx.body,
  })
}
