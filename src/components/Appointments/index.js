// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidV4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    AppointmentsList: [],
    isFilterActive: false,
    titleInput: '',
    dateInput: '',
  }
  onChangetitleInput = event => {
    this.setState({titleInput: event.target.value})
  }
  onChangedateInput = event => {
    this.setState({dateInput: event.target.value})
  }
  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }
  toggleisStared = id => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(eachAppoint => {
        if (id === eachAppoint.id) {
          return {...eachAppoint, isStarred: !eachAppoint.isStarred}
        }
        return eachAppoint
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''
    const newAppointment = {
      id: uuidV4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      AppointmentsList: [...prevState.AppointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }
  getfilterAppointmentlist = () => {
    const {AppointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return AppointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return Appointments
  }
  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter'
    const filterAppointmentlist = this.getfilterAppointmentlist()

    return (
      <div className="main-container">
        <div className="app-container">
          <div className="booking-data">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h2 className="app-heading">Add Appointment</h2>
              <label htmlFor="title" className="label">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                className="input"
                placeholder="Title"
                onChange={this.onChangetitleInput}
              />
              <label htmlFor="date" className="label">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={dateInput}
                className="input"
                onChange={this.onChangedateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointments-filter-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              className={`filter-style ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filterAppointmentlist.map(eachAppoint => (
              <AppointmentItem
                key={eachAppoint.id}
                appDetials={eachAppoint}
                toggleisStared={this.toggleisStared}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
