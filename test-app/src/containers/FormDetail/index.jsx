import React, {useState, useEffect, useRef } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LimitedTextarea from '../../components/LimitedTextArea'
import styled from "styled-components";
import {fetchcoordinator, fetchresponsible} from '../../actions/index'


const MainDiv = styled.div`
  background-color: skyblue;
  font-size: 32px;
  color: white;
  width:100%
  height: 100%
`;

const MainDivTitle = styled.div`
  background-color: blue;
  font-size: 32px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  width:100%;
  height:60px;
  text-align: center;
`;

const SubDiv = styled.div`
  background-color: white;
  font-size: 32px;
  margin: 40px;
`;


const buttonSubmit = styled.div`
  text-align: center;
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
  const[fee, setFee] = useState('')
  const [error, setError] = useState({})

  const titleInput = useRef();
  const dateInput = useRef();
  const feeInput = useRef();
  const emailInput = useRef();
  const rewardInput = useRef();

  const ERROR = {
    title: '',
    description: '',
    category: '',
    fieldvalue: '',
    reward: '',
    email: '',
    date: '',
    time: '',
    fee: '',
    isError: false,
  }
  
  useEffect(()=> {
    props.fetchcoordinator()
    props.fetchresponsible()
  }, [])
  

  const validateEmail = (email) =>  { 
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  const Validation = () => {

    let isError = false;
    if(title == '') {
      ERROR.title = "Title is required."
      isError = true
      titleInput.current.focus();
    }

    if(date == '') {
      ERROR.date = "Date is required."
      isError = true
      dateInput.current.focus();
    }

    if(fieldvalue == 'Paid Event') {
      if(fee == '') {
        ERROR.fee = "Fee is required."
        isError = true
        feeInput.current.focus();
      }
    }

    if(email != '') {
      if(!validateEmail(email)) {
        ERROR.email = 'Invalid Email Address'
        isError = true
        emailInput.current.focus();
      }
    }

    if(reward != ''){
      const re = /^[0-9\b]+$/;
      if(!re.test(reward)){
        ERROR.reward = 'Only Numbers allowed'
        isError = true
        rewardInput.current.focus();
      }
    }

    if(fee != ''){
      const re = /^[0-9\b]+$/;
      if(!re.test(fee)){
        ERROR.fee = 'Only Numbers allowed'
        isError = true
        feeInput.current.focus();
      }
    }
    
    setError(ERROR)
    return isError
  }

  const setDescriptionvalue = (e) => {
    console.log('setDescriptionValue===', e)
    setDescription(e)
  }

  const handleSubmit = () => {
    const isError = Validation()

    if(!isError) {
      console.log('title===', title)
      console.log('description===', description)
      console.log('category==', category)
      console.log('fieldvalue==', fieldvalue)
      console.log('Fee==', fee)
      console.log('Reward==', reward)
      console.log('Responsible=', responsible)
        
      console.log('Email=', email)
      console.log('Date=', date)
      console.log('Time=', time)

      //create object
      var finalResult = {
        title: title,
        description: description,
        category_id : category,
        paid_event: fieldvalue == 'Paid Event' ? true: false,
        event_fee: fee,
        reward: reward,
        date: date,
        duration: duration,
      }

      console.log('FinalResult==', finalResult)
    }
  }

  return (
    <MainDiv>
        <MainDivTitle>NEW EVENT</MainDivTitle>
        <form>
          <SubDiv>
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
                  size={50}
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
                <LimitedTextarea rows={10} cols={60} limit={140} value="" 
                name="description" id="description" onChange={(e) => setDescriptionvalue(e)} />
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
                {fieldvalue == 'Paid Event' && 
                  <span>
                    <input
                      type="text"
                      name="Fee"
                      ref={feeInput}
                      size={10}
                      onChange={(e)=> setFee(e.target.value)}
                      required
                    /><span>$</span>
                     {error.fee &&
                      <span className="tooltiptext">{error.fee}</span>
                    }
                  </span>
                }
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
                  ref={rewardInput}
                  onChange={(e)=> setReward(e.target.value)}
                  required
                />
                {error.reward &&
                  <span className="tooltiptext">{error.reward}</span>
                }
              </div>
          </div>
          </SubDiv>
          <SubDiv>
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
                  ref={emailInput}
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                />
                {error.email &&
                  <span className="tooltiptext">{error.email}</span>
                }
              </div>
          </div>
          </SubDiv>
          <SubDiv>
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
          </SubDiv>
          <div className="row">
            <input type="button" value="PUBLISH EVENT" onClick={handleSubmit} />
          </div>
        </form>
    </MainDiv>
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
