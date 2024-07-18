
import portrait_background from '/assets/portrait_background.png'
import { Link } from 'react-router-dom'
import './game.tsx'
import path_menu from '/assets/path_menu.png'
import squad from '/assets/squad.png'
import { useAppDispatch, useAppSelector } from '../app/hook.ts'
import { Trait, Unit } from './game.tsx'
import { chooseUnit } from '../app/store.ts'
import { useState } from 'react'
import { NavBar, PlayerUnitStatus } from '../App.tsx'
import WebApp from '@twa-dev/sdk'

export default function Menu({ unitPool }: { unitPool: Unit[] }) {
  const [unitSelected, setUnitSelected] = useState<number[]>([0, 1, 2, 3])
  const currentUnit = useAppSelector((state) => state.match.players[state.match.turnOrder[state.match.turn][0]].units[state.match.turnOrder[state.match.turn][1]])
  const dispatch = useAppDispatch()

  const [targetingUnit, setTargetingUnit] = useState<number>()
  function handleTargetUnit(unit_id: number) {
    setTargetingUnit(unit_id)
  }
  return (
    <>
      <div className='MenuContainer'>
        <h2>form squad</h2>
        <p>(squad information)</p>
        <div className='Inventory'>
          {
            unitSelected.map((id, idx) =>
              <PlayerUnit key={idx} unit={unitPool[id]} />
            )
          }
        </div>
        <p>5 mission avaible</p>
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

        {/* <img */}
        {/*   src={squad} */}
        {/*   className="" */}
        {/* // onClick={action} */}
        {/* /> */}

      </div >
      <NavBar />
    </>)
}
//wallet & logic
// function PlayerUnit({ unit }: { unit: Unit }) {
//   return (<div className='PlayerUnit' onClick={() => { }}>
//     <div className='Name'>{unit.name}</div>
//     <div className='HP'>{unit.healty}</div>
//     <div className='MP'>{unit.mana}</div>
//     <img
//       src={portrait_background}
//       className="UnitPortraitBack"
//     // onClick={action}
//     />
//     <img
//       src={unit.imgUrl}
//       className="UnitPortraitImg"
//     // onClick={action}
//     />
//     <div className='TraitsIcon'>
//       {
//         unit.traits.map((t, idx) =>
//           <TraitIcon key={idx} trait={t} />
//         )
//       }
//     </div>
//   </div>)
// }
function TraitIcon({ trait }: { trait: Trait }) {
  return (<div className='TraitIcon'>
    {/* <p>{trait.name}</p> */}
    <img
      src={trait.imgUrl}
      className="MenuContainerImg"
    // onClick={action}
    />

  </div>)
}
export function PlayerUnit({ unit }: { unit: Unit }) {
  const [activeInfoModal, setAcriveInfoModal] = useState<Boolean>(false)
  const dispatch = useAppDispatch()

  return (<><div className='PlayerUnit' onClick={() => setAcriveInfoModal(true)}>
    <p className='Name'>{unit.name}</p>
    <p className='HP'>{unit.healty}</p>
    <p className='MP'>{unit.mana}</p>
    <img
      src={portrait_background}
      className="UnitPortraitBack  MenuContainerImg"
    // onClick={action}
    />
    <img
      src={unit.imgUrl}
      className={"UnitPortraitImg  MenuContainerImg"}
    // onClick={action}
    />
    <div className='TraitsIcon MenuContainerImg'>
      {
        unit.traits.map((t, idx) =>
          <TraitIcon key={idx} trait={t} />
        )
      }
    </div>
  </div>
    {activeInfoModal &&
      <div className='UnitInfoModal'>
        <div className='UnitInfoModalBack'>
          <span className="close" onClick={() => setAcriveInfoModal(false)}>&times;</span>
          <p className='Name'>{unit.name}</p>
          <img
            src={unit.imgUrl}
            className={"UnitInfoModalPortraitImg"}
          // onClick={action}
          />
          <p className='HP'>{"Healty: " + unit.healty}</p>
          <p className='MP'>{"Mana: " + unit.mana}</p>
          <div className='UnitInfoModalStatus' >
            {
              unit.status.map((s, idx) =>
                <div key={idx}>
                  <PlayerUnitStatus statusEffectType={s.type} />
                  <p> {s.name} </p></div>)
            }
          </div>
          <div>
            {
              unit.traits.map((t, i) =>
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
  </>)
}

