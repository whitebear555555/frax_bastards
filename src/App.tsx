import setting from '/assets/setting.png'
import usetrait from '/assets/usetrait.png'
import useitem from '/assets/useitem.png'
import useend from '/assets/useend.png'
import useback from '/assets/useback.png'
import { Fragment, PropsWithChildren, useEffect, useState } from 'react'
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
import enemy_boss from '/assets/enemy_boss.png'
import enemy_spider from '/assets/enemy_spider.png'
import portrait from '/assets/portrait.png'
import portrait1 from '/assets/portrait(1).png'
import portrait2 from '/assets/portrait(2).png'
import portrait3 from '/assets/portrait(4).png'
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
import { CreateWallet, Wallet } from './wallet/wallet.tsx'
import FriendsList from './pages/friends.tsx'
import { botStep, endTurn, setAnimationState, useItem, useTrait } from './app/store.ts'
import { AnimationState, Player, StatusEffectType, Unit, unit_pool } from './pages/game.tsx'
import anim from "/assets/anim.png"

function EnemyUnitContainer({ selectUnit }: { selectUnit: (playerId: number, id: number) => void }) {
  const player = useAppSelector((state) => state.match.players[0])
  return (
    <div className='EnemyUnitContainer'>
      {/* <img */}
      {/*   //src={anim} */}
      {/*   className={"TakeDamage"} */}
      {/* // onClick={action} */}
      {/* /> */}
      <EnemyUnit unit={player.units[0]} selectUnit={selectUnit} />
      <EnemyUnit unit={player.units[1]} selectUnit={selectUnit} />
      <EnemyUnit unit={player.units[2]} selectUnit={selectUnit} />
    </div>
  )
}
//function EnemyUnit({ type, imgUrl }: { type: string, imgUrl: string }) {
function EnemyUnit({ unit, selectUnit }: { unit: Unit, selectUnit: (playerId: number, id: number) => void }) {
  const currentUnit = useAppSelector((state) => state.match.turnOrder[state.match.turn])
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setAnimationState({ player_id: unit.player_owner, unit_id: unit.id, state: { type: "None" }, }))
    }, 2000)

    return () => { clearTimeout(timer) }
  }, [unit.animationState.type])
  return (<><div className='EnemyUnit' onClick={() => selectUnit(unit.player_owner, unit.id)}>
    <img
      src={unit.imgUrl}
      className={"EnemyUnit" + unit.name + "Img EnemyUnitImgBack "}
    // onClick={action}
    />
    <img
      src={unit.imgUrl}
      className={"EnemyUnit" + unit.name + "Img " + (unit.animationState.type == "TakeDamage" ? "Shake" : (selectUnit[0] == unit.player_owner && selectUnit[1] == unit.id ? "SelectEnemyUnit" : ""))}
    // onClick={action}
    />
    {
      unit.animationState.type == "TakeDamage" &&
      <div className={"EnemyUnit" + unit.name + "Img AnimationUnit"} >
        <img
          src={anim}
          className={"EnemyUnit" + unit.name + "Img TakeDamage"}
        // onClick={action}
        />
        <p className={"Damage"}>{unit.animationState.damge}</p>
        <img
          src={unit.animationState.trait.imgUrl}
        // onClick={action}
        />
        <p>{unit.animationState.trait.name}</p>
      </div>
    }
    <div className='UnitStatusDecs'>
      <p className={"UnitStatus" + " Re" + unit.name}> {unit.name}</p>
      <p className={"UnitStatus" + " Re" + unit.name}> {unit.healty + "/" + unit.mana}</p>
      <div className={"EnemyUnitStatus" + " Re" + unit.name}>
        {
          unit.status.map((s, idx) =>
            <PlayerUnitStatus key={idx} statusEffectType={s.type} />)
        }
      </div>
    </div>
  </div >
  </>
  )
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
function PlayerUnitContainer({ selectUnit }: { selectUnit: (playerId: number, id: number) => void }) {
  const player = useAppSelector((state) => state.match.players[1])
  return (
    <div className='PlayerUnitContainer'>
      {
        [0, 1, 2, 3].map((_, idx) =>
          <PlayerUnit key={idx} unit={player.units[idx]} selectUnit={selectUnit} />
        )
      }
    </div >
  )
}
export function PlayerUnit({ unit, selectUnit }: { selectUnit: (playerId: number, id: number) => void, unit: Unit }) {
  const currentUnit = useAppSelector((state) => state.match.turnOrder[state.match.turn])
  const dispatch = useAppDispatch()
  useEffect(() => {

    const timer = setTimeout(() => {
      dispatch(setAnimationState({ player_id: unit.player_owner, unit_id: unit.id, state: { type: "None" }, }))
    }, 2000)

    return () => { clearTimeout(timer) }
  }, [unit.animationState.type])
  return (<><div className='PlayerUnit' onClick={() => selectUnit(unit.player_owner, unit.id)}>
    <div className='PlayerUnitStatus' >
      {
        unit.status.map((s, idx) =>
          <PlayerUnitStatus key={idx} statusEffectType={s.type} />)
      }
    </div>
    <p className='Name'>{unit.name}</p>
    <p className='HP'>{unit.healty}</p>
    <p className='MP'>{unit.mana}</p>
    <img
      src={portrait_background}
      className="UnitPortraitBack"
    // onClick={action}
    />
    <div
      className={"UnitPortraitImgDiv"}
    ></div>
    <img
      src={unit.imgUrl}
      className={"UnitPortraitImg " + (currentUnit[0] == unit.player_owner && currentUnit[1] == unit.id ? " SelectEnemyUnit" : null)}
    // onClick={action}
    />
    <img
      src={anim}
      //className={"UnitPortraitImg " + "TakeDamage"} todo: fixed scale > max-widht: 150px
      className={(unit.animationState.type == "TakeDamage" ? "Shake" : "") + "UnitPortraitImg " + unit.animationState.type}
    // onClick={action}
    />
    {
      unit.animationState.type == "TakeDamage" &&
      <div className={"UnitPortraitImg  AnimationUnit"} >
        <img
          src={anim}
          className={"UnitPortraitImg TakeDamage"}
        // onClick={action}
        />
        <p className={"Damage"}>{unit.animationState.damge}</p>
        <img
          src={unit.animationState.trait.imgUrl}
        // onClick={action}
        />
        <p>{unit.animationState.trait.name}</p>
      </div>
    }
    {
      unit.animationState.type == "Heal" &&
      <div className={"UnitPortraitImg  AnimationUnit"} >
        <img
          src={anim}
          className={"UnitPortraitImg Heal"}
        // onClick={action}
        />
        <p className={"Healty"}>{unit.animationState.damge}</p>
        <img
          src={unit.animationState.trait.imgUrl}
        // onClick={action}
        />
        <p>{unit.animationState.trait.name}</p>
      </div>
    }
  </div>
  </>)
}
import status_icon1 from '/assets/status_icon1.png'
import status_icon2 from '/assets/status_icon2.png'
import status_icon3 from '/assets/status_icon3.png'
import Shop from './shop/shop.tsx'

export function PlayerUnitStatus({ statusEffectType }: { statusEffectType: StatusEffectType }) {
  const ff = () => {
    switch (statusEffectType.type) {
      case "Poisoned": {
        return status_icon1;
      }
      case "Bleeding": {
        return status_icon2;
      }
      case "Stun": {
        return status_icon3;
      }
      default: {
        return status_icon1;
      }
    }
  }
  return (<div>
    <img
      src={ff()}
      className=""
    // onClick={action}
    />
  </div>)
}
function Selection({ is_trait, player_id, unit_id, id }: { is_trait: boolean, player_id: number, unit_id: number, id: number }) {
  const current = useAppSelector((state) => state.match.turnOrder[state.match.turn])
  const dispatch = useAppDispatch()
  return (<>
  </>)
}
type ActionMenuState = "main" | "traits" | "items" | "select" | "selectAlied"
function Actions() {
  const [id, setId] = useState<number>(0)
  const [lasActionMenuState, setLastActionMenuState] = useState<ActionMenuState>("main")
  const [actionMenuState, setActionMenuState] = useState<ActionMenuState>("main")
  const current = useAppSelector((state) => state.match.turnOrder[state.match.turn])
  const currentPlyer = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]])
  const currentUnit = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]].units[state.match.turnOrder[state.match.turn][1]])
  const dispatch = useAppDispatch()
  function setMenuState(s: ActionMenuState) {
    setLastActionMenuState(actionMenuState)
    setActionMenuState(s)
  }
  function lastIsTrait(): boolean {
    return lasActionMenuState == "traits"
  }
  function lastIsItem(): boolean {
    return lasActionMenuState == "items"
  }
  useEffect(() => {
    if (current[0] == 0) {
      const timer = setTimeout(() => {
        dispatch(botStep())
      }, 2000)

      return () => { clearTimeout(timer) }
    }
  }, [current])
  return (
    <>
      <div className='Actions'>
        {actionMenuState == "main" &&
          <>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                setMenuState("traits")
              }
            }}><p>{"Use Trait"}</p><img
                src={usetrait}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                setMenuState("items")
              }
            }}><p>{"Use Item"}</p><img
                src={useitem}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                setMenuState("main")
                dispatch(endTurn())
              }
            }}><p>{"End Turn"}</p><img
                src={useend}
                className=""
              // onClick={action}
              /></div></>}
        {actionMenuState == "selectAlied" &&
          <>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 0,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 0,
                  }))
                setMenuState("main")

              }
            }}><p>{currentPlyer.units[0].name}</p><img
                src={currentPlyer.units[0].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 1,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 1,
                  }))

                setMenuState("main")
              }
            }}><p>{currentPlyer.units[1].name}</p><img
                src={currentPlyer.units[1].imgUrl}
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 2,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 2,
                  }))

                setMenuState("main")
              }
            }}><p>{currentPlyer.units[2].name}</p><img
                src={currentPlyer.units[2].imgUrl}
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 3,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 3,
                  }))

                setMenuState("main")
              }
            }}><p>{currentPlyer.units[3].name}</p><img
                src={currentPlyer.units[3].imgUrl}
              // onClick={action}
              /></div>
            <div className='m' onClick={() => setMenuState("main")}> <p>Back</p>
              <img
                src={useback}
                className=""
              // onClick={action}
              />
            </div>
          </>
        }

        {actionMenuState == "select" &&
          <>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 0,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 0,
                  }))
                setMenuState("main")

              }
            }}><p>Spider</p><img
                src={enemy_spider}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 1,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 1,
                  }))

                setMenuState("main")
              }
            }}><p>Boss</p><img
                src={enemy_boss}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                lastIsTrait() ?
                  dispatch(useTrait({
                    player_id: current[0],
                    unit_id: current[1],
                    trait_id: id,
                    targets: 2,
                  })) : dispatch(useItem({
                    player_id: current[0],
                    item_id: id,
                    targets: 2,
                  }))

                setMenuState("main")
              }
            }}><p>Spider</p><img
                src={enemy_spider}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => setMenuState("main")}> <p>Back</p>
              <img
                src={useback}
                className=""
              // onClick={action}
              />
            </div>
          </>
        }
        {actionMenuState == "traits" &&
          <>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                //&& currentUnit.traits[0].condition.type == "Activation") {
                setId(0)
                currentUnit.traits[0].target.type == "Aliade" ?
                  setMenuState("selectAlied") :
                  setMenuState("select")
              }
            }}><p>{currentUnit.traits[0].name}</p><img
                src={currentUnit.traits[0].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                //&& currentUnit.traits[1].condition.type == "Activation") {
                setId(1)
                currentUnit.traits[1].target.type == "Aliade" ?
                  setMenuState("selectAlied") :
                  setMenuState("select")
              }
            }}><p>{currentUnit.traits[1].name}</p><img
                src={currentUnit.traits[1].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                //&& currentUnit.traits[2].condition.type == "Activation") {
                setId(2)
                currentUnit.traits[2].target.type == "Aliade" ?
                  setMenuState("selectAlied") :
                  setMenuState("select")
              }
            }}><p>{currentUnit.traits[2].name}</p><img
                src={currentUnit.traits[2].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              setMenuState("main")
            }}> <p>Back</p>
              <img
                src={useback}
                className=""
              // onClick={action}
              />
            </div></>}
        {
          actionMenuState == "items" &&
          <>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                setId(0)
                currentPlyer.items[0].target.type == "Aliade" ?
                  setMenuState("selectAlied") :
                  setMenuState("select")
              }
            }}><p>{currentPlyer.items[0].name}</p><img
                src={currentPlyer.items[0].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                setId(1)
                currentPlyer.items[1].target.type == "Aliade" ?
                  setMenuState("selectAlied") :
                  setMenuState("select")
              }
            }}><p>{currentPlyer.items[1].name}</p><img
                src={currentPlyer.items[1].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              if (current[0] == 1) {
                setId(2)
                currentPlyer.items[2].target.type == "Aliade" ?
                  setMenuState("selectAlied") :
                  setMenuState("select")
              }
            }}><p>{currentPlyer.items[2].name}</p><img
                src={currentPlyer.items[2].imgUrl}
                className=""
              // onClick={action}
              /></div>
            <div className='m' onClick={() => {
              setMenuState("main")
            }}> <p>Back</p>
              <img
                src={useback}
                className=""
              // onClick={action}
              />
            </div></>
        }
      </div >
      <div className='Description'>
        <p> {"Turn " + currentUnit.name}
        </p>
        {actionMenuState == "traits" && lasActionMenuState == "main" && <p>Choose traite</p>}
        {actionMenuState == "items" && lasActionMenuState == "main" && <p>Choose item</p>}
        {actionMenuState == "select" &&
          lastIsTrait() &&
          <p> {currentUnit.traits[id].desc}</p>
        }
        {actionMenuState == "select" &&
          lastIsItem() &&
          <p> {currentPlyer.items[id].desc}</p>
        }
        {currentPlyer.id == 1 && actionMenuState == "main" && <p>Choose action</p>}
      </div>
    </>
  )
}

import backkk from '/assets/backkk.mp4'
type MainMenuState = { type: "none" } | { type: "unit", playerId: number, id: number } | { type: "winner", id: number } | { type: "turn", id: number }
function MainMatch() {
  const [mainMenuState, setMainMenuState] = useState<MainMenuState>({ type: "none" })
  const match = useAppSelector((state) => state.match)
  const current = useAppSelector((state) => state.match.turnOrder[state.match.turn])
  const currentPlyer = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]])
  const currentUnit = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]].units[state.match.turnOrder[state.match.turn][1]])
  const selectUnit = useAppSelector((state) => mainMenuState.type == "unit" ? state.match.players[mainMenuState.playerId].units[mainMenuState.id] : null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (match.end) {
      setMainMenuState({ type: "winner", id: match.winner })
    }
  }, [match.end])

  function handlerSelectUnit(playerId: number, id: number) {
    setMainMenuState({ type: "unit", playerId, id })
  }

  return (<>
    {mainMenuState.type == "winner" &&
      <div className='Banner'>{match.players[mainMenuState.id].name + " Winner"}</div>
    }
    {mainMenuState.type == "unit" &&
      <div className='UnitInfoModal'>
        <div className='UnitInfoModalBack'>
          <span className="close" onClick={() => setMainMenuState({ type: "none" })}>&times;</span>
          <p className='Name'>{selectUnit.name}</p>
          <img
            src={selectUnit.imgUrl}
            className={"UnitInfoModalPortraitImg"}
          // onClick={action}
          />
          <p className='HP'>{"Healty: " + selectUnit.healty}</p>
          <p className='MP'>{"Mana: " + selectUnit.mana}</p>
          <div className='UnitInfoModalStatus' >
            {
              selectUnit.status.map((s, idx) =>
                <div key={idx}>
                  <PlayerUnitStatus statusEffectType={s.type} />
                  <p> {s.name} </p></div>)
            }
          </div>
          <div>
            {
              selectUnit.traits.map((t, i) =>
                <div className='UnitInfoModalTraits' key={i}>
                  <p>{t.name}</p><img
                    src={t.imgUrl}
                    className=""
                  // onClick={action}
                  />
                  <span>{t.desc}</span>
                </div>
              )
            }
          </div>
        </div>
      </div >
    }

    <div className='TopSide'>
      <Link
        className='Setting'
        to={"/menu"}>
        <img
          src={setting}
          className="Setting"
        //onClick={action}
        />
      </Link>
      <EnemyUnitContainer selectUnit={handlerSelectUnit} />
      <video
        src={backkk}
        className="TopBackground"
        autoPlay={true}
        loop={true}
        muted
      // onClick={action}
      />
    </div>
    <div className='BottomSide'>
      <PlayerUnitContainer selectUnit={handlerSelectUnit} />

      <Actions />
    </div >

  </>)
}
export function NavBar() {
  return (
    <div className='NavBar'>
      {
        [[path_tasks, '/tasks'], [path_home, '/menu'], [path_friends, '/friends']].map((img, idx) =>
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

  )
}
function Root() {
  // const [count, setCount] = useState(match)var message = AwesomeMessage.create({awesomeField: "AwesomeString" });
  return (
    <>
      <div className="App">
        <Outlet />
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
        element: <Menu unitPool={unit_pool} />,
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
        path: "create_wallet",
        element: <CreateWallet />,
      },
      {
        path: "friends",
        element: <FriendsList />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
]);

export default router
