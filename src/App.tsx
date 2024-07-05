import { Fragment, PropsWithChildren, useState } from 'react'
import reactLogo from './assets/react.svg'
import twaLogo from './assets/tapps.png'
import viteLogo from '/assets/vite.svg'
import boy1 from '/assets/boy1.png'
import boy2 from '/assets/boy2.png'
import boy3 from '/assets/boy3.png'
import icon1 from '/assets/icon1.png'
import icon2 from '/assets/icon2.png'
import icon3 from '/assets/icon3.png'
import icon4 from '/assets/icon4.png'
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
import { ActionItem, ActionTrait, Match, units } from './pages/game.tsx'
import { match } from 'assert'
import Wallet from './pages/wallet.tsx'

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const initialState: Match = {
  players: [
    {
      id: 0,
      name: "JohnBot",
      items: []
    },
    {
      id: 1,
      name: "Player",
      items: []
    }
  ],
  units: units,
  turnOrder: [
    [1, 0],
    [0, 0],
    [1, 1],
    [0, 1],
    [1, 2],
    [0, 2],
    [1, 3],
    [0, 3],
  ],
  turn: 0
}

const counterSlice = createSlice({
  name: 'Match',
  initialState,
  reducers: {
    useTrait: (state, payload: PayloadAction<ActionTrait>) => {
      //if have mana
      const player = state.players[payload.payload.player_id]
      const unit = state.units[payload.payload.unit_id]
      const trait = unit.traits[payload.payload.trait_id]
      if (trait.condition.type == "Activation" && unit.mana >= trait.condition.cost) {
        switch (trait.effect.type) {
          case 'Attack':
            break
          case 'Resist':
            break
          case 'Def':
            break
          case 'Heal':
            unit.healty + randomInteger(trait.effect.min, trait.effect.max)
            break
          case 'Vampirism':
            break
          case 'Poison':
            break
          case 'Stun':
            break
          default: break

        }
      }
      //check win
      //endTurn
    },
    useItem: (state, payload: PayloadAction<ActionItem>) => {
      //check win
      //endTurn
    },
    endTurn: (state) => {
      state.turn += 1;
      if (state.turn == state.turnOrder.length) {
        state.turn = 0;
      }
      //end_turn check trait and status
      //end_turn(m);
      //next_turn check trait and status
      //bot ther
      const l = state.turnOrder[state.turn]
      if (l[0] == 0) {
        //bot
      } else {
        //player
      }
    },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// export const { } = counterSlice.actions
// const selectCount = (state: RootState) => state.counter.value
// counterSlice.reducer


function Root() {
  // const [count, setCount] = useState(match)var message = AwesomeMessage.create({ awesomeField: "AwesomeString" });
  return (
    <>
      <div className="App">
        <ul>
          <li><Link to={`tasks`}>Tasks</Link></li>
          <li><Link to={`/menu`}>Home</Link></li>
          <li><Link to={`wallet`}>Friends</Link></li>
        </ul>
        <Outlet />
      </div>
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
        path: "tasks",
        element: <TaskList />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
    ],
  },
]);

export default router
