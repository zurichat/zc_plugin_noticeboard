import { useContext, useState } from "react";

import Button from "./EmailSubscriptionButton";
import Modal from "./EmailSubscriptionModal";
import TextInput from "./TextInput";
import "./EmailSubscription.css";
import axios from "axios";
import { DataContext, UserInfoContext } from "../../../../App";

const EmailSubscription = (props) => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [agreementValue, setAgreementValue] = useState(false);
  const [message, setMessage] = useState();

  const _globalData = useContext(DataContext)
  const org_id = _globalData.Organizations[0]
  const userData = useContext(UserInfoContext)
  const orgID = "6145b49e285e4a18402073bc";
  const userID = "614ebf43f314e068e4dar5";

  const closeHandler = () => {
    setSubscriptionSuccess(false);
    props.closeHandler();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setSubscriptionSuccess(true);
    console.log({
      name: nameValue,
      company: companyValue,
      email: emailValue,
      agreement: agreementValue,
    });
    
  };

  const clearHandler = () => {
    setNameValue("");
    setCompanyValue("");
    setEmailValue("");
    setAgreementValue(false);
  };


  const submitEmail = () => {
    
    axios
      .post(
        `https://noticeboard.zuri.chat/api/v1/organisation/email-subscription?org=${orgID}&user=${userID}`,
        {
          email:emailValue
        }
        
      )
      .then((res) => {
        if (res.status === "You have successfully Subscribed") {
          setMessage("You have successfully subcribed to our mailing list");
          console.log(res, "looking for response")
        } else {
          setMessage(res);
          console.log(res, "looking for response")
        }
        
      })
      .catch((err) => console.log(err));
      
      
      
      
  };

  

  return (
    <Modal closeHandler={closeHandler}>
      <div className="modal1" >
      <form onSubmit={submitHandler} className="form">
        <h1>
          {subscriptionSuccess
            ? "Thank You for Subscribing!"
            : "Subscribe to get notifications in your mail"}
        </h1>
        {subscriptionSuccess ? (
          <div className="form content  successContent ">
            <p className="successMessage">
              You have successfully subscribed <em>{emailValue}</em> to Zuri
              Chat 
            </p>
            <Button type="button" className="successClose" onClick={closeHandler}>
              CLOSE
            </Button>
          </div>
        ) : (
          <fieldset onClick={closeHandler} className="fieldset">
            <label >
              
              <input
                
                className="email-input"
                required
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
             <p className="email-text">E-mail</p>
            </label>
            <div className="btnGroup">
              {/* <Button className={classes.clear} type="reset" onClick={clearHandler}>
                CLEAR
              </Button> */}
              <Button className="submit" onClick={submitEmail}>SUBMIT</Button>
            </div>
          </fieldset>
        )}
      </form>
      <span  onClick={closeHandler} />
      </div>
    </Modal>
  );
};

export default EmailSubscription;
