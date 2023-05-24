import CONFIG from '@utils/config'

export default (filename: string) => {
  return `${CONFIG.URL}${filename}`
}
