import { Request, Response } from 'express'

type ProviderConfig = {
  clientId?: string
  redirectUri?: string
  authUrl: string
  scope: string
  responseType?: string
  extraParams?: Record<string, string>
}

const getProviderConfig = (provider: string): ProviderConfig | null => {
  switch (provider) {
    case 'google':
      return {
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        scope: 'openid email profile',
        responseType: 'code',
        extraParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    case 'apple':
      return {
        clientId: process.env.APPLE_CLIENT_ID,
        redirectUri: process.env.APPLE_REDIRECT_URI,
        authUrl: 'https://appleid.apple.com/auth/authorize',
        scope: 'name email',
        responseType: 'code id_token',
        extraParams: {
          response_mode: 'form_post'
        }
      }
    case 'facebook':
      return {
        clientId: process.env.FACEBOOK_CLIENT_ID,
        redirectUri: process.env.FACEBOOK_REDIRECT_URI,
        authUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
        scope: 'email public_profile',
        responseType: 'code'
      }
    case 'twitter':
      return {
        clientId: process.env.TWITTER_CLIENT_ID,
        redirectUri: process.env.TWITTER_REDIRECT_URI,
        authUrl: 'https://twitter.com/i/oauth2/authorize',
        scope: 'tweet.read users.read offline.access',
        responseType: 'code',
        extraParams: {
          code_challenge: 'challenge',
          code_challenge_method: 'plain'
        }
      }
    default:
      return null
  }
}

const buildUrl = (config: ProviderConfig, state: string) => {
  const params = new URLSearchParams({
    client_id: config.clientId || '',
    redirect_uri: config.redirectUri || '',
    response_type: config.responseType || 'code',
    scope: config.scope,
    state,
    ...config.extraParams
  })

  return `${config.authUrl}?${params.toString()}`
}

// @desc    Start OAuth flow
// @route   GET /api/auth/oauth/:provider
// @access  Public
export const startOAuth = (req: Request, res: Response) => {
  const provider = String(req.params.provider || '').toLowerCase()
  const config = getProviderConfig(provider)

  if (!config) {
    return res.status(404).json({ success: false, message: 'Provider not supported' })
  }

  if (!config.clientId || !config.redirectUri) {
    return res.status(501).json({
      success: false,
      message: `${provider.toUpperCase()} OAuth not configured`
    })
  }

  const state = Math.random().toString(36).slice(2)
  const url = buildUrl(config, state)
  return res.redirect(url)
}

// @desc    OAuth callback placeholder
// @route   GET /api/auth/oauth/:provider/callback
// @access  Public
export const oauthCallback = (req: Request, res: Response) => {
  const provider = String(req.params.provider || '').toLowerCase()

  return res.json({
    success: true,
    message: 'OAuth callback received. Complete token exchange to finish login.',
    provider,
    query: req.query
  })
}
