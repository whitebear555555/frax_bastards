export default function TaskList() {
  const question = [
    { title: "create wallet" }, ,
    { title: "join telegram" }, ,
    { title: "subscribe twitter" }, ,
    { title: "play 3 match" }, ,
    { title: "kill 3 enemy" }, ,
    { title: "kill boss" }, ,
  ]
  return (
    <>
      {
        question.map((item, idx) =>
          <TaskBottom key={idx} {...item} />
        )
      }
    </>
  )
}
function TaskBottom({ title }) {
  return (
    <button className='Task'>
      {/* <img */}
      {/*   src={imgUrl} */}
      {/*   className="ItemImg" */}
      {/* // onClick={action} */}
      {/* /> */}
      <p className=''>
        {title} </p>
    </button>)
}
