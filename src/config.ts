import { http, createConfig } from 'wagmi'
import { Chain, base, fraxtal, mainnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

// walletConnect({ projectId }),
// safe(),
// metaMask(),
export const config = createConfig({
  connectors: [
    injected(),

  ],
  transports: {
    [fraxtal.id]: http(),
  },
  chains: [fraxtal as Chain]
})
