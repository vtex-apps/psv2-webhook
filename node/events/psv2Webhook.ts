import type { EventContext } from '@vtex/api'

import type { Clients } from '../clients'

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

  const { profileId } = ctx.body

  // TODO: Remove console.log
  // eslint-disable-next-line no-console
  console.log('profileId', profileId)

  const profile = await ctx.clients.psv2.getProfile(profileId)

  // TODO: Remove console.log
  // eslint-disable-next-line no-console
  console.log('profile', profile)

  const body = {
    profile,
    event: ctx.body,
    meta: {
      account,
      workspace,
      timestamp: Date.now(),
    },
  }

  await ctx.clients.webhook.sendWebhook(body)

  ctx.vtex.logger.info({
    message: 'Successfully sent webhook',
    webhookUrl,
    body: ctx.body,
  })
}
