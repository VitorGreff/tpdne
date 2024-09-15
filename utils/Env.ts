type ENV = {
  BSKY_IDENTIFIER: string
  BSKY_PASSWORD: string
}

export function getConfig(): ENV {
  return {
    BSKY_IDENTIFIER: process.env.IDENTIFIER ?? process.env.BSKY_IDENTIFIER ?? '',
    BSKY_PASSWORD: process.env.PASSWORD ?? ''
  }
}
