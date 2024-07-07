import { NavBar } from '../App'
import tg_avatar from '/assets/tg_avatar.png'
export default function FriendsList() {
  const question = [
    { title: "profile" }, ,
    { title: "profile" }, ,
    { title: "profile" }, ,
    { title: "profile" }, ,
    { title: "profile" }, ,
  ]
  return (
    <div className='FriendsContainer'>
      <h2 className=''>5 friends</h2>
      <p className=''>(referrals information)</p>
      {
        question.map((item, idx) =>
          <FriendBottom key={idx} {...item} />
        )
      }
    </div>
  )
}
function FriendBottom({ title }) {
  return (
    <>
      <button className='Friend'>
        <img
          src={tg_avatar}
          className="TgAvatar"
        // onClick={action}
        />
        <p className=''>
          {title} </p>
      </button>

      <NavBar />
    </>
  )
}
