// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appDetials, toggleisStared} = props
  const {id, title, date, isStarred} = appDetials
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const onClickStar = () => {
    toggleisStared(id)
  }
  return (
    <li className="Appointment-item">
      <h1 className="AppointmentItem-heading">{title}</h1>

      <button
        type="button"
        testid="star"
        className="AppointmentItem-button"
        onClick={onClickStar}
      >
        <img src={starImgUrl} alt="star" />
        <p className="AppointmentItem-date">{date}</p>
      </button>
    </li>
  )
}

export default AppointmentItem
