import { Link } from 'react-router-dom'
import './game.tsx'
import path_menu from '/assets/path_menu.png'
import squad from '/assets/squad.png'
import { useAppDispatch, useAppSelector } from '../app/hook.ts'
import { Unit } from './game.tsx'
import { chooseUnit } from '../app/store.ts'
import { useState } from 'react'
import { NavBar, PlayerUnit } from '../App.tsx'

function SelectedUnits() {
  return (<>
  </>)
}

export default function Menu({ unitPool }: { unitPool: Unit[] }) {
  const [unitSelected, setUnitSelected] = useState<number[]>([0, 1, 2, 3])
  const currentUnit = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]].units[state.match.turnOrder[state.match.turn][1]])
  const dispatch = useAppDispatch()

  const [targetingUnit, setTargetingUnit] = useState<number>()
  function handleTargetUnit(unit_id: number) {
    setTargetingUnit(unit_id)
  }
  return (
    <div className='MenuContainer'>
      <h2>form squad</h2>
      <p>(squad information)</p>
      {/* <div> */}
      {/*   { */}
      {/*     unitSelected.map((id, idx) => */}
      {/*       <PlayerUnit key={idx} unit={unitPool[id]} targetingUnit={handleTargetUnit} /> */}
      {/*     ) */}
      {/*   } */}
      {/* </div> */}
      <Link
        className='MenuContainerLink'
        to={'/match'}
        onClick={() => {
          dispatch(chooseUnit([
            unitPool[unitSelected[0]],
            unitPool[unitSelected[1]],
            unitPool[unitSelected[2]],
            unitPool[unitSelected[3]],
          ]))
        }}
      >
        Play
      </Link>
      <img
        src={squad}
        className=""
      // onClick={action}
      />

      <NavBar />
    </div >)
}
//wallet & logic
