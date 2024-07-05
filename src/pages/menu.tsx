import { Link } from 'react-router-dom'
import './game.tsx'
import { Match, Unit, units } from './game.tsx'
import path_menu from '/assets/path_menu.png'
import squad from '/assets/squad.png'

export default function Menu() {
  return (
    <div className='MenuContainer'>
      <h2>form squad</h2>
      <p>(squad information)</p>
      <Link
        className='MenuContainerLink'
        to={'/match'}>
        Play
      </Link>
      <img
        src={squad}
        className=""
      // onClick={action}
      />
    </div >)
}
//wallet & logic
