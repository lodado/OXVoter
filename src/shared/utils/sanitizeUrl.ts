/**
 * Returns true if the given string is a url.
 *
 * @param text The url to check.
 * @param options Parsing options.
 * @returns True if a url, false otherwise.
 */
export function isUrl(text: string, options?: { requireHostname: boolean }) {
  if (text.match(/\n/)) {
    return false
  }

  try {
    const url = new URL(text)
     
    const blockedProtocols = ['javascript:', 'file:', 'vbscript:', 'data:']

    if (blockedProtocols.includes(url.protocol)) {
      return false
    }
    if (url.hostname) {
      return true
    }

    return (
      url.protocol !== '' &&
      (url.pathname.startsWith('//') || url.pathname.startsWith('http')) &&
      !options?.requireHostname
    )
  } catch (err) {
    return false
  }
}

/**
 * Temporary prefix applied to links in document that are not yet persisted.
 */
export const creatingUrlPrefix = 'creating#'

/**
 * Returns match if the given string is a base64 encoded url.
 *
 * @param url The url to check.
 * @returns A RegExp match if the url is base64, false otherwise.
 */
export function isBase64Url(url: string) {
  const match = url.match(/^data:([a-z]+\/[^;]+);base64,(.*)/i)
  return match || false
}

/**
 * For use in the editor, this function will ensure that a url is
 * potentially valid, and filter out unsupported and malicious protocols.
 *
 * @param url The url to sanitize
 * @returns The sanitized href
 */
export function sanitizeUrl(url: string | null | undefined) {
  if (!url) {
    return undefined
  }

  if (
    !isUrl(url, { requireHostname: false }) &&
    !url.startsWith('/') &&
    !url.startsWith('#') &&
    !url.startsWith('mailto:') &&
    !url.startsWith('sms:') &&
    !url.startsWith('fax:') &&
    !url.startsWith('tel:')
  ) {
    return `https://${url}`
  }
  return url
}
