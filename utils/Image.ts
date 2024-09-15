type FetchedImage = {
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
      process.stderr.write(`Error fetching image" ${e.message}"`)
    } else {
      process.stderr.write(`Unknow error ocurred while fetching image`)
    }
    throw e
  }
}

