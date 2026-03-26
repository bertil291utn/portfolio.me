/**
 * Classify portfolio items for Web2 vs Web3 sections.
 * Supports optional `ecosystem: "web3"` from CMS; otherwise infers from copy.
 */
export function isWeb3Project(project) {
  if (!project) return false;
  if (project.ecosystem === 'web3') return true;
  if (project.ecosystem === 'web2') return false;
  const type = (project.type || '').toLowerCase();
  const desc = (project.description || '').toLowerCase();
  if (
    /solidity|polygon|ethereum|evm|nft|web3|hardhat|alchemy|metamask/.test(type)
  ) {
    return true;
  }
  if (
    /nft|marketplace|on-chain|blockchain|token|wallet|defi|web3/.test(desc)
  ) {
    return true;
  }
  return false;
}
