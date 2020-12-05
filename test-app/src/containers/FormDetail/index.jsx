import React, {useState, useEffect, useRef } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LimitedTextarea from '../../components/LimitedTextArea'
import styled from "styled-components";
import {fetchcoordinator, fetchresponsible} from '../../actions/index'


const MainDiv = styled.div`
  background-color: grey;
  font-size: 32px;
  color: white;
`;


const FormDetail = (props) => {
  const [categorylist,setCategoryList] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [responsible, setResponsible] = useState('')
  const [fieldvalue, setFieldValue] = useState('')
  const [reward, setReward] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState({})

  const titleInput = useRef();
  const dateInput = useRef();

  const ERROR = {
    title: '',
    description: '',
    category: '',
    fieldvalue: '',
    reward: '',
    email: '',
    date: '',
    time: '',
  }
  
  useEffect(()=> {
    props.fetchcoordinator()
    props.fetchresponsible()
  }, [])
  
  const Validation = () => {
    

    if(title == '') {
      ERROR.title = "Title is required."
      titleInput.current.focus();
    }

    if(date == '') {
      ERROR.date = "Date is required."
      dateInput.current.focus();
    }

    
    /* if(description == '') {
      ERROR.description = "Description is required."
      descriptionInput.current.focus();
    }*/

    setError(ERROR)
  }

  const handleSubmit = () => {
    console.log('title===', title)
    console.log('description===', description)
    console.log('category==', category)
    console.log('fieldvalue==', fieldvalue)
    console.log('Reward==', reward)
    console.log('Reward==', reward)
    console.log('Email=', email)
    console.log('Date=', date)
    console.log('Time=', time)

    Validation()
  }

 // console.log('cc=', this.props);
  return (
    <div className="flex-container">
    <div className="flex-item">
        <form>
          <div className="row">
            <div className="singleColumn">
            About
            <hr /> 
            </div>
          </div>
          <div className="row">
              <div className="column1">TITLE *</div>
              <div className="column2">
                <input
                  type="text"
                  id="title"
                  ref={titleInput}
                  onChange={(e)=> setTitle(e.target.value)}
                  name="title"
                  required
                />
                {error.title &&
                  <span className="tooltiptext">{error.title}</span>
                }
              </div>
          </div>
          <div className="row">
              <div className="column1">DESCRIPTION  *</div>
              <div className="column2">
                <LimitedTextarea limit={32} value="" onChange={(e)=> setDescription(e.target.value)} />
              </div>
          </div>
          <div className="row">
              <div className="column1">CATEGORY  *</div>
              <div className="column2">
                <select
                    name="category"
                    onChange={(e)=> setCategory(e.target.value)}
                    style={{ display: 'block' }}
                >
                { props.coordinator.map((option, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                ))}
                </select>
              </div>
          </div>
          <div className="row">
              <div className="column1">PAYMENT</div>
              <div className="column2">
                <input
                type="radio"
                name="test"
                value="Free Event"
                onChange={() => setFieldValue("Free Event")}
                /><span className="radiolable">Free Event</span>
                <input
                type="radio"
                name="test"
                value="Paid Event"
                onChange={() => setFieldValue("Paid Event")}
                /><span className="radiolable">Paid Event</span>
              </div>
          </div>
          <div className="row">
              <div className="column1">REWARD</div>
              <div className="column2">
                <input
                  type="text"
                  id="first-name-input"
                  placeholder="Enter Reward"
                  name="reward"
                  onChange={(e)=> setReward(e.target.value)}
                  required
                />
              </div>
          </div>
          <div className="row">
            <div className="singleColumn">
            Coordinator
            <hr /> 
            </div>
          </div>
          <div className="row">
              <div className="column1">RESPONSIBLE</div>
              <div className="column2">
                  <select
                      name="responsible"
                      onChange={(e)=> setResponsible(e.target.value)}
                      style={{ display: 'block' }}
                  >
                  { props.responsible.map((option, index) => (
                      <option key={index} value={option.id}>{option.name} {option.lastname}</option>
                  ))}
                  </select>
              </div>
          </div>
          <div className="row">
              <div className="column1">Email</div>
              <div className="column2">
                <input
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                />
              </div>
          </div>
          <div className="row">
            <div className="singleColumn">
            WHEN
            <hr /> 
            </div>
          </div>
          <div className="row">
              <div className="column1">STARTS ON</div>
              <div className="column2">
                <input
                  type="date"
                  id="date"
                  name="date"
                  ref={dateInput}
                  onChange={(e)=> setDate(e.target.value)}
                  required
                />
                <input
                type="time"
                id="time"
                name="time"
                min="01:00" max="12:00"
                pattern="^(1[0-2]|[1-9])$:[0-9]{2}"
                onChange={(e)=> setTime(e.target.value)}
                required
              />
              {error.date &&
                  <span className="tooltiptext">{error.date}</span>
                }
              </div>
          </div>
          <div className="row">
              <div className="column1">DURATION</div>
              <div className="column2">
                <input
                  type="text"
                  id="duration"
                  onChange={(e)=> setDuration(e.target.value)}
                  name="duration"
                  required
                />
              </div>
          </div>
          <div className="row">
              <div className="column1"></div>
              <div className="column2">
                <input type="button" value="PUBLISH EVENT" onClick={handleSubmit} />
              </div>
          </div>
        </form>
    </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('state==', state)
  return {
    coordinator: state.coordinator,
    responsible: state.responsible,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchcoordinator, fetchresponsible}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FormDetail);
