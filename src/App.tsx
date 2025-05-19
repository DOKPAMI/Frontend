import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routers from './Routers';
import { registerSlushWallet } from '@mysten/slush-wallet';

const { networkConfig } = createNetworkConfig({
  // localnet: { url: getFullnodeUrl("localnet") },
  // mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: 'https://rpc-testnet.suiscan.xyz:443' },
});
const queryClient = new QueryClient();
registerSlushWallet('Dokpami');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork='testnet'>
        <WalletProvider autoConnect={true}>
          <Routers />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
