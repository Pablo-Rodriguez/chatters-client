
export const sizes = {
  phone: 320,
  phablet: 480,
  tablet: 768,
  desktop: 1024,
  large: 1824
}

const breakpoint = (key, value) => (...content) => `
  @media screen and (${key}: ${value}px) {
    ${content}
  }
`

const minBreakpoint = breakpoint.bind(null, 'min-width')

export const phone = minBreakpoint(sizes.phone)
export const phablet = minBreakpoint(sizes.phablet)
export const tablet = minBreakpoint(sizes.tablet)
export const desktop = minBreakpoint(sizes.desktop)
export const large = minBreakpoint(sizes.large)
