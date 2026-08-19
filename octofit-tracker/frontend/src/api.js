const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codeSpaceName
  ? `https://${codeSpaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiOrigin}/api`

export async function fetchCollection(componentOrUrl) {
  const endpoint = componentOrUrl.startsWith('http')
    ? componentOrUrl
    : `${apiBaseUrl}/${componentOrUrl}/`
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Unable to load collection (${response.status})`)
  }

  const payload = await response.json()
  const collection = payload?.data ?? payload?.results ?? payload
  if (Array.isArray(collection)) return collection
  if (Array.isArray(collection?.results)) return collection.results
  if (Array.isArray(collection?.items)) return collection.items
  return []
}
