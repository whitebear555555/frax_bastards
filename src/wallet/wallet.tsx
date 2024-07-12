import { createWalletClient, http } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { english, generateMnemonic } from 'viem/accounts'
import { Chain, base, fraxtal } from 'wagmi/chains'
import { useState } from 'react'
import './wallet.css'

export function CreateWallet() {
  const [hasWallet, setHasWallet] = useState(false);
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
    <div>

      <div className='Memo' >
        <button className='' onClick={simulation}>
        </button >
        <h2> Memo wallet phrase:</h2>
        < div className='' >
          {mnemonic}
        </div>
        < p className='ItemDesc' >
          {trans}
        </p>
        <Link
          to="/wallet"
          className=''>
          Close
        </Link>
      </div>
    </div >
  )
}
type NFToken = {
  id: number
  name: string
  imgUrl: string,
  amount: number
  price: number
  priceChange: number
  //collection: string,
}
type Token = {
  id: number
  name: string
  imgUrl: string,
  amount: number
  price: number
  priceChange: number
}
type Action = {
  sender: string
  type: "SendToken"
}
import frxETHicon from "/assets/wallet/frxETH icon.svg"
import wethicon from "/assets/wallet/weth icon.svg"
import usdticon from "/assets/wallet/usdt icon.svg"
import add from "/assets/wallet/add.svg"
import down from "/assets/wallet/down.svg"
import up from "/assets/wallet/up.svg"
import home from "/assets/wallet/home.svg"
import settings from "/assets/wallet/settings.svg"
import bookmar from "/assets/wallet/bookmar.svg"
import { Link } from 'react-router-dom'
import portrait from '/assets/portrait.png'
import portrait1 from '/assets/portrait(1).png'
import portrait2 from '/assets/portrait(2).png'
import portrait3 from '/assets/portrait(4).png'
import boy1 from '/assets/boy1.png'
import boy2 from '/assets/boy2.png'
import boy3 from '/assets/boy3.png'
import boy4 from '/assets/boy4.png'
import boy5 from '/assets/boy5.png'
import boy6 from '/assets/boy6.png'

type ActiveAssetType = "Portfolio" | "NFT" | "Activity"
export function Wallet() {
  const [lastActiveAssetType, setLastActiveAssetType] = useState<ActiveAssetType>("Portfolio")
  const [activeAssetType, setActiveAssetType] = useState<ActiveAssetType>("Portfolio")
  const tokens = [{
    id: 0, name: "frxETH", imgUrl: frxETHicon, amount: 10.0, price: 31221.5, priceChange: -5
  },
  {
    id: 1, name: "WETH", imgUrl: wethicon, amount: 1.0, price: 3122.15, priceChange: 0
  },
  {
    id: 2, name: "USDT", imgUrl: usdticon, amount: 0.0, price: 1, priceChange: 0
  },
  ]
  const nftokens = [{
    id: 0, name: "Warlord", imgUrl: portrait, amount: 10, price: 31221.5, priceChange: -5,
  },
  {
    id: 1, name: "Seer", imgUrl: portrait1, amount: 1, price: 3122.15, priceChange: 0
  },
  {
    id: 2, name: "Ranger", imgUrl: portrait2, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 3, name: "Knight", imgUrl: portrait3, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 4, name: "Fiend", imgUrl: boy4, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 4, name: "Martyr", imgUrl: boy3, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 4, name: "Private ", imgUrl: boy1, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 4, name: "Occult priest", imgUrl: boy2, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 4, name: "Gluttony ", imgUrl: boy5, amount: 0, price: 1, priceChange: 0
  },
  {
    id: 4, name: "Delirium ", imgUrl: boy6, amount: 0, price: 1, priceChange: 0
  },
  ]
  return (<div className='Wallet'>
    <p>Fraxtal Mainnet</p>
    <p>{tokens[0].amount + tokens[0].name}</p>
    <div className='WalletButtoms'>
      {
        [[add, "Buy"], [up, "Send"], [down, "Deposit"]].map((b, idx) =>
          <div
            key={idx}
          >
            <img
              src={b[0]} />
            <p>{b[1]}</p>
          </div>
        )
      }</div>
    <div className='AssetType'>
      {
        ["Portfolio", "NFT", "Activity"].map((n, idx) =>
          <div key={idx} onClick={() => setActiveAssetType(n as ActiveAssetType)}>{n}</div>
        )
      }
    </div>
    {activeAssetType == "Portfolio" &&
      <TokenContainer tokens={tokens} />
    }
    {activeAssetType == "NFT" &&
      <NFTContainer nftokens={nftokens} />
    }
    {activeAssetType == "Activity" &&
      <ActivityContainer />
    }
    <NavBar />
  </div>)
}


function TokenContainer({ tokens }: { tokens: Token[] }) {
  return (
    <div className='TokenContainer'>
      {
        tokens.map((t, idx) =>
          <div className='Token' key={idx}>
            <img
              src={t.imgUrl}
            />
            <div className='TokenDesc'>
              <p className='Name'>{t.name}</p>
              <p className='Amount'>{t.amount}</p>
              <p className='Price'>{t.price}</p>
              <p className='PriceChange'>{t.priceChange}</p>
            </div>
          </div>
        )
      }
      <div>+Add token</div>
    </div>
  )
}
function NFTContainer({ nftokens }: { nftokens: NFToken[] }) {
  return (
    <div className='WalletNFTokenContainer'>
      {
        nftokens.map((t, idx) =>
          <div className='WalletNFT' key={idx}>
            <img
              src={t.imgUrl}
            />
            <div className='WalletNFTDesc'>
              <p className='Name'>{t.name}</p>
              <p className='Price'>{t.price}</p>
            </div>
          </div>
        )
      }
    </div>
  )
}
function ActivityContainer() {
  return (
    <div className=''>
      You have no transactions
    </div>
  )
}
export function NavBar() {
  return (
    <div className='WalletNavBar'>
      {
        [[bookmar, '/wallet'], [home, '/wallet'], [settings, '/wallet']].map((img, idx) =>
          <Link
            className='' key={idx}
            to={img[1]}>
            <img
              src={img[0]}
              className=""
            //onClick={action}
            />
          </Link>
        )
      }
    </div>

  )
}
