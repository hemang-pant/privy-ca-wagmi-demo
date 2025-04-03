'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {http} from 'viem';
import {mainnet, sepolia} from 'viem/chains';

import type {PrivyClientConfig} from '@privy-io/react-auth';
import {PrivyProvider} from '@privy-io/react-auth';
import {WagmiProvider, createConfig} from '@privy-io/wagmi';
import { CAProvider } from '@arcana/ca-wagmi';

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'sms'],
  appearance: {
    showWalletLoginFirst: true,
  },
};

export default function Providers({children}: {children: React.ReactNode}) {
  return (
      <PrivyProvider
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        apiUrl={"cm8ey4k5100pqguea5tdhv0om"}
        appId={"<enter an Alchemy API key>"}
        config={privyConfig}
      >
            <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
          <CAProvider>
            {children}
          </CAProvider>
        </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
  );
}
