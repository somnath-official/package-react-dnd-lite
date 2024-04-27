export const loadImage = async (path: string): Promise<string> => {
  try {
      const image = await import(path)
      return image.default
  } catch(e) {
      console.error(e)
      return ''
  }
}