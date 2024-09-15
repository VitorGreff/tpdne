import { fetchImage } from "./utils/Image";

async function main() {
  try {
    const result = await fetchImage('https://thispersondoesnotexist.com')
    console.log(`Fetched image of type: ${result.contentType}`)
    console.log(`Fetched image of size: ${result.blob.size}`)
  } catch (e) {
    if (e instanceof Error) {
      process.stderr.write(`error: ${e.message}`)
    } else {
      process.stderr.write(`unknown error ocurred`)
    }
  }
}

main()
