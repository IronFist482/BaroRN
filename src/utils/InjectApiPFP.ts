import CONFIG from "@utils/config/config";

export default (filename: string) => {
  return `${CONFIG.URL}${filename}`;
};
