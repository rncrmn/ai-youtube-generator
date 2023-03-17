export const copyToClipboard = (principal: string) => {
  navigator.clipboard.writeText(principal);
};
