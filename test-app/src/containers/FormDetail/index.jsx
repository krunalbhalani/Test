import React, {useState, useEffect, useRef } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LimitedTextarea from '../../components/LimitedTextArea'
import styled from "styled-components";
import {fetchcoordinator, fetchresponsible} from '../../actions/index'


const MainDiv = styled.div`
  background-color: gray;
  font-size: 32px;
  color: white;
  width:100%
  height: 100%;
`;

const MainDivTitle = styled.div`
  background-color: black;
  font-size: 32px;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  width:100%;
  height:60px;
  text-align: center;
`;

const SubDiv = styled.div`
  background-color: lightgrey;
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
  const [issubmitted, setIsSubmitted] = useState(false)

  const titleInput = useRef();
  const dateInput = useRef();
  const feeInput = useRef();
  const emailInput = useRef();
  const rewardInput = useRef();
  const descriptionInput = useRef();
  const durationInput = useRef();

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
    durationInput: '',
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

    if(description == '') {
      ERROR.description = "Description is required."
      isError = true
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

    if(duration != ''){
      const re = /^[0-9\b]+$/;
      if(!re.test(duration)){
        ERROR.duration = 'Only Numbers allowed'
        isError = true
        durationInput.current.focus();
      }
    }
    
    
    setError(ERROR)
    return isError
  }

  const setDescriptionvalue = (e) => {
    setDescription(e)
  }

  const handleSubmit = () => {
    const isError = Validation()

    if(!isError) {
      setIsSubmitted(true)
      let objCoordinator = props.responsible.find(o => o.id === parseInt(responsible));
      //create object
      var finalResult = {
        title: title,
        description: description,
        category_id : parseInt(category),
        paid_event: fieldvalue == 'Paid Event' ? true: false,
        event_fee: fee != '' ? parseInt(fee) : '', 
        reward: reward != '' ? parseInt(reward) : '',
        date: date + time,
        duration: duration != '' ? parseInt(duration) : '',
        coordinator: {
          id: objCoordinator.id,
          email: objCoordinator.email,
        }
      }

      console.log('Final Object==', finalResult)
    }
  }

  return (
    <MainDiv>
          <MainDivTitle>NEW EVENT</MainDivTitle>
          { !issubmitted &&
          <div>
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
                    className="col-4"
                    required
                  />
                  {error.title &&
                    <span className="tool_tip">{error.title}</span>
                  }
                </div>
            </div>
            <div className="row">
                <div className="column1">DESCRIPTION  *</div>
                <div className="column2">
                  <LimitedTextarea rows={10} cols={60} limit={140} value=""
                  name="description" id="description" onChange={(e) => setDescriptionvalue(e)} error={error} />
                </div>
            </div>
            <div className="row">
                <div className="column1">CATEGORY</div>
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
                  /><span className="fieldlabel">Free Event</span>
                  <input
                  type="radio"
                  name="test"
                  value="Paid Event"
                  onChange={() => setFieldValue("Paid Event")}
                  /><span className="fieldlabel">Paid Event</span>
                  {fieldvalue == 'Paid Event' && 
                    <span className="fieldmargin">
                      <input
                        type="text"
                        name="Fee"
                        ref={feeInput}
                        size={10}
                        onChange={(e)=> setFee(e.target.value)}
                        required
                      /><span className="fieldlabel fieldmargin">$</span>
                      {error.fee &&
                        <span className="tool_tip">{error.fee}</span>
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
                    className="col-2"
                    onChange={(e)=> setReward(e.target.value)}
                  />
                  {error.reward &&
                    <span className="tool_tip">{error.reward}</span>
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
                <div className="column1">RESPONSIBLE *</div>
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
                <div className="column1">EMAIL</div>
                <div className="column2">
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    ref={emailInput}
                    className="col-4"
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                  {error.email &&
                    <span className="tool_tip">{error.email}</span>
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
                <div className="column1">STARTS ON *</div>
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
                  className="col-2"
                />
                {error.date &&
                    <span className="tool_tip">{error.date}</span>
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
                    ref={durationInput}
                    className="col-2"
                  />
                  {error.duration &&
                    <span className="tool_tip">{error.duration}</span>
                  }
                </div>
            </div>
            </SubDiv>
            <div className="row">
              <input type="button" value="PUBLISH EVENT" onClick={handleSubmit} />
            </div>
          </form>
          </div>
          }
          {issubmitted &&
          <div>
          <form>
            <SubDiv>
            <div className="row">
              <div className="singleColumn">
              Success
              </div>
            </div>
            <div className="row">
                <div className="column1">Event has been created</div>
            </div>
            
            </SubDiv>
            <div className="row" />
          </form>
          </div>
          }
    </MainDiv>
  );
}

const mapStateToProps = (state) => {
  return {
    coordinator: state.coordinator,
    responsible: state.responsible,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchcoordinator, fetchresponsible}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FormDetail);
