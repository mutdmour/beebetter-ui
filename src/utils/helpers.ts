export function isAlphaNumericAndLowercase(input: string): boolean {
 return /^[a-z0-9]+$/.test(input)
}

function getCookie(name: string): string | null {
 name = name.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')

 const regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)', 'i'),
  match = document.cookie.match(regex)

 return match && unescape(match[1])
}

export function isUserIdCookieSet(): boolean {
 return Boolean(getCookie('userid'))
}
