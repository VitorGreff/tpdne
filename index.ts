import { BskyAgent } from '@atproto/api'
import { fetchImage } from "./utils/Image";
import { updateProfileWithAvatar, updateProfileWithBio, updateProfileWithWallpaper } from './bsky/Update';
import { getConfig } from './utils/Env';

async function main() {
  while (true) {
    try {
      const avatarImage = await fetchImage('https://thispersondoesnotexist.com')
      const headerImage = await fetchImage('https://picsum.photos/1500/500')
      console.log(`TPDNE: Fetched image of type: ${avatarImage.contentType}`)
      console.log(`TPDNE: Fetched image of size: ${avatarImage.blob.size} bytes`)

      // load env vars
      const config = getConfig()
      const agent = new BskyAgent({ service: 'https://bsky.social' });
      await agent.login({
        identifier: config.BSKY_IDENTIFIER,
        password: config.BSKY_PASSWORD
      })

      await updateProfileWithAvatar(agent, avatarImage.blob)
      await updateProfileWithWallpaper(agent, headerImage.blob)
      await updateProfileWithBio(agent)

    } catch (e) {
      if (e instanceof Error) {
        console.error(`error: ${e.message}`)
        process.exit(1)
      } else {
        process.stderr.write(`unknown error ocurred`)
      }
    }
  }
}

main()
