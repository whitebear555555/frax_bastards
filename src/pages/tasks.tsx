import { Link } from 'react-router-dom'
import tg from '/assets/tg.png'
export default function TaskList() {
  const question = [
    { title: "subscribe twitter", path: "" }, ,
    { title: "play 3 match", path: "" }, ,
    { title: "kill 3 enemy", path: "" }, ,
    { title: "kill boss", path: "" }, ,
  ]
  return (
    <div className='TaskContainer'>
      <h2>6 task avaible</h2>
      <Link
        className='Task Taskh'
        to={'/wallet'}>
        <img
          src={tg}
          className=""
        // onClick={action}
        />
        create wallet</Link>
      <a className='Task Taskh' href="https://t.me/frax_bastards">
        <img
          src={tg}
          className=""
        // onClick={action}
        />
        join telegram</a>
      {
        question.map((item, idx) =>
          <TaskBottom key={idx} {...item} />
        )
      }
    </div >
  )
}
function TaskBottom({ title }) {
  return (
    <button className='Task'>
      <img
        src={tg}
        className=""
      // onClick={action}
      />
      <p className=''>
        {title} </p>
    </button>)
}
{/* <Link */ }
{/*   className='NavBarButton' key={idx} */ }
{/*   to={img[1]}> */ }
{/*   <img */ }
{/*     src={img[0]} */ }
{/*     className="NavBarButtonImg" */ }
{/*   //onClick={action} */ }
{/*   /> */ }
{/*   Tasks</Link> */ }
{/* const win = window.open(url, '_blank'); */ }
{/* if (win != null) { */ }
{/*   win.focus(); */ }
{/* } */ }
