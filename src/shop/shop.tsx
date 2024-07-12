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
import './shop.css'
import { useState } from "react"

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
export default function Shop() {
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
  return (<div className="Shop">
    <h2>FraxyShop</h2>
    <NFTContainer nftokens={nftokens.concat(nftokens).concat(nftokens).concat(nftokens).concat(nftokens)} />
    <NavBar />
  </div>)
}
function NFTContainer({ nftokens }: { nftokens: NFToken[] }) {
  return (
    <div className='NFTokenContainer'>
      {
        nftokens.map((t, idx) =>
          <NFT nft={t} key={idx} />
        )
      }
    </div>
  )
}
function NFT({ nft }: { nft: NFToken }) {
  const [activeInfoModal, setAcriveInfoModal] = useState<Boolean>(false)
  return (
    <div className='NFT'>
      <img
        src={nft.imgUrl}
        className={"NFTImg"}
        onClick={() => setAcriveInfoModal(true)}
      />
      <div className='NFTDesc'>
        <p className='Name'>{nft.name}</p>
        <p className='Price'>{nft.price + " frxETH"}</p>
      </div>
      {activeInfoModal &&
        <div className='NFTModal'>
          <div className='NFTModalBack'>
            <span className="close" onClick={() => setAcriveInfoModal(false)}>&times;</span>
            <img
              src={nft.imgUrl}
              className={"NFTModalImg"}
            // onClick={action}
            />
            <p className='Name'>{nft.name}</p>
            <p className='Price'>{nft.price + " frxETH"}</p>
            <p className='Price'>{nft.priceChange + "%"}</p>
            <p className=''>{"Created by "}
              <a className='Creator' href="https://t.me/grimmnail">{"grimnail"}</a>
            </p>
            <div className="NFTButtom">
              <div className="Send">Send</div>
              <div className="Buy">Buy</div></div>

            {/* <p className='HP'>{"Healty: " + unit.healty}</p> */}
            {/* <p className='MP'>{"Mana: " + unit.mana}</p> */}
            {/* <div className='UnitInfoModalStatus' > */}
            {/*   { */}
            {/*     unit.status.map((s, idx) => */}
            {/*       <div key={idx}> */}
            {/*         <PlayerUnitStatus statusEffectType={s.type} /> */}
            {/*         <p> {s.name} </p></div>) */}
            {/*   } */}
            {/* </div> */}
            {/* <div> */}
            {/*   { */}
            {/*     unit.traits.map((t, i) => */}
            {/*       <div className='UnitInfoModalTraits' key={i}> */}
            {/*         <p>{t.name}</p><img */}
            {/*           src={t.imgUrl} */}
            {/*           className="" */}
            {/*         // onClick={action} */}
            {/*         /> */}
            {/*         <span>{t.desc}</span> */}
            {/*       </div> */}
            {/*     ) */}
            {/*   } */}
            {/* </div> */}
          </div>
        </div >
      }

    </div >
  )
}

function NavBar() {
  return (
    <div className='ShopNavBar'>
      {
        [[bookmar, '/menu'], [home, '/shop'], [settings, '/friends']].map((img, idx) =>
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
