import fs from 'fs/promises'

type FetchedImage = {
  // Blob is a type that represents a binary data in the browser
  blob: Blob;
  contentType: string;
}

export async function fetchImage(url: string): Promise<FetchedImage> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error(`Unexpected content type: ${contentType}`)
    }
    const blob = await response.blob()
    return { blob, contentType }

  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error fetching image" ${e.message}"`)
    } else {
      console.error(`Unknow error ocurred while fetching image`)
    }
    throw e
  }
}

export async function saveImage(imageBlog: Blob, filePath: string): Promise<void> {
  try {
    const arrayBuffer = await imageBlog.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    await fs.writeFile(filePath, uint8Array)
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error saving image" ${e.message}"`)
    } else {
      console.error(`Unknow error ocurred while saving image`)
    }
    throw e
  }

}
