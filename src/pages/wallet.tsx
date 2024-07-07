import { createWalletClient, http } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { english, generateMnemonic } from 'viem/accounts'
import { Chain, base, fraxtal } from 'wagmi/chains'
import { useState } from 'react'
import { NavBar } from '../App'

export default function Wallet() {
  const [trans, setTrans] = useState(null);
  const mnemonic = generateMnemonic(english)
  const account = mnemonicToAccount(mnemonic)

  const client = createWalletClient({
    account,
    chain: fraxtal as Chain,
    transport: http("https://fraxtal.gateway.tenderly.co/1rDvVkHQLKzd0gmMpNiXQX")
  })

  const simulation = async () => {
    setTrans(client.request({
      method: "tenderly_simulateTransaction",
      params: [
        // transaction object
        {
          from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
          to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          gas: "0x0",
          gasPrice: "0x0",
          value: "0x0",
          data: "0xa9059cbb00000000000000000000000020a5814b73ef3537c6e099a0d45c798f4bd6e1d60000000000000000000000000000000000000000000000000000000000000001",
        },
        // the block
        "latest",
      ],
    }))
  };
  return (
    <>
      <button className='' onClick={simulation}>
        Create Wallet
      </button >
      < p className='ItemDesc' >
        {mnemonic}
      </p>
      < p className='ItemDesc' >
        {trans}
      </p>

      <NavBar />
    </>
  )
}

