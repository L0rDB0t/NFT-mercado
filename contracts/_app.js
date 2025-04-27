import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Web3Modal } from '@web3modal/react';
import { EthereumClient } from '@web3modal/ethereum';
import { sepolia } from 'wagmi/chains';

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
});

const ethereumClient = new EthereumClient(config, chains);

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
      <Web3Modal projectId="tu_project_id_de_walletconnect" ethereumClient={ethereumClient} />
    </>
  );
}