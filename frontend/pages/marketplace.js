import { useContractRead } from 'wagmi';
import NFTMarketABI from '../../contracts/artifacts/contracts/NFTMarket.sol/NFTMarket.json';

export default function Marketplace() {
  const { data: listings } = useContractRead({
    address: '0x100140437e66c72d34D6C85f5818E6E55CfF4A25',
    abi: NFTMarketABI.abi,
    functionName: 'listings',
    args: [tokenId], // Iterar sobre todos los tokenIds
  });

  // Implementa lógica para comprar NFTs...
}