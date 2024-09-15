import { fetchImage, saveImage } from "./utils/Image";
import fs from 'fs/promises'

async function main() {
  while (true) {
    try {
      const result = await fetchImage('https://thispersondoesnotexist.com')
      console.log(`TPDNE: Fetched image of type: ${result.contentType}`)
      console.log(`TPDNE: Fetched image of size: ${result.blob.size}`)

      const filePath = './images/test.jpeg'
      await fs.mkdir('./images', { recursive: true })
      await saveImage(result.blob, filePath)

    } catch (e) {
      if (e instanceof Error) {
        process.exit(1)
      } else {
        process.stderr.write(`unknown error ocurred`)
      }
    }
  }
}

main()
