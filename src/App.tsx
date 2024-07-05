
import { Fragment, PropsWithChildren, useState } from 'react'
import reactLogo from './assets/react.svg'
import twaLogo from './assets/tapps.png'
import viteLogo from '/assets/vite.svg'
import icon1 from '/assets/icon1.png'
import icon2 from '/assets/icon2.png'
import icon3 from '/assets/icon3.png'
import icon4 from '/assets/icon4.png'
import path_friends from '/assets/path_friends.png'
import path_tasks from '/assets/path_tasks.png'
import path_home from '/assets/path_home.png'
import background from '/assets/background.png'
import enemy_knight from '/assets/enemy_knight.png'
import enemy_spider from '/assets/enemy_spider.png'
import portrait from '/assets/portrait.png'
import portrait_background from '/assets/portrait_background.png'
import { motion } from "framer-motion"
import { createSlice, type PayloadAction, type ThunkAction } from "@reduxjs/toolkit"
import WebApp from '@twa-dev/sdk'
import './App.css'
import { createAppSlice } from './app/createAppSlice'
import { useAppDispatch, useAppSelector } from './app/hook'
//import 'pages/types/game.d.ts'
import ErrorPage from './pages/erroe-page.tsx'
import { Link, Outlet, createBrowserRouter } from 'react-router-dom'
import TaskList from './pages/tasks.tsx'
import Menu from './pages/menu.tsx'
import Wallet from './pages/wallet.tsx'
import FriendsList from './pages/friends.tsx'
import { endTurn, useItem, useTrait } from './app/store.ts'

function EnemyUnitContainer() {
  return (
    <div className='EnemyUnitContainer'>
      <EnemyUnit type={'EnemyUnitSpiderImg'} imgUrl={enemy_spider} />
      <EnemyUnit type={'EnemyUnitKnightImg'} imgUrl={enemy_knight} />
      <EnemyUnit type={'EnemyUnitSpiderImg'} imgUrl={enemy_spider} />
    </div>
  )
}
function EnemyUnit({ type, imgUrl }: { type: string, imgUrl: string }) {
  return (<div className='EnemyUnit'>
    <img
      src={imgUrl}
      className={type}
    // onClick={action}
    />
    <p className='UnitStatus'> Spider</p>
    <p className='UnitStatus'> 10/10</p>
  </div>)
}
// function EnemyUnitContainer() {
//   return (
//     <div className='EnemyUnitContainer'>
//       {
//         [enemy_spider, enemy_knight, enemy_spider,].map((img, idx) =>
//           <EnemyUnit key={idx} imgUrl={img} />
//         )
//       }
//     </div>
//   )
// }
// function EnemyUnit({ imgUrl }: { imgUrl: string }) {
//   return (<>
//     <img
//       src={imgUrl}
//       className=""
//     // onClick={action}
//     />
//   </>)
// }
function PlayerUnitContainer() {
  return (
    <div className='PlayerUnitContainer'>
      {
        [portrait, portrait, portrait, portrait].map((img, idx) =>
          <PlayerUnit key={idx} imgUrl={img} />
        )
      }
    </div >
  )
}
function PlayerUnit({ imgUrl }: { imgUrl: string }) {
  return (<div className='PlayerUnit'>
    <p className='Name'>{"Ivan"}</p>
    <p className='HP'> 100</p>
    <p className='MP'> 100</p>
    <img
      src={portrait_background}
      className="UnitPortraitBack"
    // onClick={action}
    />
    <img
      src={imgUrl}
      className="UnitPortraitImg"
    // onClick={action}
    />
  </div>)
}

type ActionMenu = "main" | "traits" | "items"
function MainMatch() {
  const current = useAppSelector((state) => state.match.turnOrder[state.match.turn])
  const currentPlyer = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]])
  const currentUnit = useAppSelector((state) => state.match.units[state.match.turnOrder[state.match.turn][1]])
  const dispatch = useAppDispatch()
  return (<>
    <div className='TopSide'>
      <EnemyUnitContainer />
      <img
        src={background}
        className="TopBackground"
      // onClick={action}
      />
    </div>
    <div className='BottomSide'>
      <PlayerUnitContainer />
      <div className='Actions'>
        <button className='m' onClick={() => {
          if (current[0] == 1) {
            dispatch(useTrait({
              player_id: current[0],
              unit_id: current[1],
              trait_id: 0,
              targets: 0,
            }))
          }
        }}><p>{currentUnit.traits[0].name}</p><img
            src={currentUnit.traits[0].imgUrl}
            className=""
          // onClick={action}
          /></button>
        <button className='m' onClick={() => {
          if (current[0] == 1) {
            dispatch(useTrait({
              player_id: current[0],
              unit_id: current[1],
              trait_id: 0,
              targets: 0,
            }))
          }
        }}><p>{currentUnit.traits[1].name}</p><img
            src={currentUnit.traits[0].imgUrl}
            className=""
          // onClick={action}
          /></button>
        <button className='m' onClick={() => {
          if (current[0] == 1) {
            dispatch(useTrait({
              player_id: current[0],
              unit_id: current[1],
              trait_id: 0,
              targets: 0,
            }))
          }
        }}><p>{currentUnit.traits[2].name}</p><img
            src={currentUnit.traits[0].imgUrl}
            className=""
          // onClick={action}
          /></button>
        <button className='m' onClick={() => dispatch(endTurn())}> <p>end</p></button>
      </div>
    </div >

  </>)
}
function Root() {

  // const [count, setCount] = useState(match)var message = AwesomeMessage.create({awesomeField: "AwesomeString" });
  //const [actionMenu, setActionMenu] = useState<ActionMenu>("main")
  return (
    <>
      <div className="App">
        <Outlet />
        <div className='NavBar'>
          {
            [[path_tasks, 'tasks'], [path_home, 'menu'], [path_friends, 'friends']].map((img, idx) =>
              <Link
                className='NavBarButton' key={idx}
                to={img[1]}>
                <img
                  src={img[0]}
                  className="NavBarButtonImg"
                //onClick={action}
                />
              </Link>
            )
          }
        </div>
      </div >
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "match",
        element: <MainMatch />,
      },
      {
        path: "tasks",
        element: <TaskList />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "friends",
        element: <FriendsList />,
      },
    ],
  },
]);

export default router
