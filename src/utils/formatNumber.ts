import numeral from 'numeral'

export const simpleFormat = (
  number: number,
  options?: {
    format?: string
    prefix?: string
    suffix?: string
  }
) => {
  const { format, prefix, suffix } = options ?? {}
  const formatted = numeral(number).format(format ?? '0,0.00')
  return `${prefix || ''}${formatted}${suffix || ''}`
}
