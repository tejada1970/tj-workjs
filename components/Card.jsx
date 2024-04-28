const Card = (props) => {
  return (
    <div className={props.cardClassName} id={props.id}>
      <div className={props.cardHeaderClassName}>
        <div className={props.bgCardHeader}></div>
        {props.children[0]}
      </div>
      <div className={props.cardBodyClassName}>
        {props.children[1]}
      </div>
      {props.children[2]}
    </div>
  )
}
export default Card