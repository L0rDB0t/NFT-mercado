import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import NFTMarketABI from '../../contracts/artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function Mint() {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: '0x100140437e66c72d34D6C85f5818E6E55CfF4A25',
    abi: NFTMarketABI.abi,
    functionName: 'mintAndList',
    args: ['ipfs://tu_metadata_uri', ethers.parseEther('0.1')],
  });
  const { write: mintNFT } = useContractWrite(config);

  return (
    <button onClick={() => mintNFT?.()}>Mint NFT</button>
  );
}