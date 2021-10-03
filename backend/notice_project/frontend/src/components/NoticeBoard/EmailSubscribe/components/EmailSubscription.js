import { useState } from "react";

import Button from "./EmailSubscriptionButton";
import Modal from "./EmailSubscriptionModal";
import TextInput from "./TextInput";
import classes from "./EmailSubscription.css";
import axios from "axios";
import { DataContext, UserInfoContext } from "../../../../App";
import { UserContext } from "../../../../Data-fetcing";

const EmailSubscription = props => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [agreementValue, setAgreementValue] = useState(false);
  const [message, setMessage] = useState();

  const _globalData = useContext(DataContext)
  const org_id = _globalData.Organizations[0]
  const userData = useContext(UserInfoContext)

  const closeHandler = () => {
    setSubscriptionSuccess(false);
    props.closeHandler();
  };

  const submitHandler = e => {
    e.preventDefault();
    setSubscriptionSuccess(true);
    console.log({ name: nameValue, company: companyValue, email: emailValue, agreement: agreementValue });
  };

  const clearHandler = () => {
    setNameValue("");
    setCompanyValue("");
    setEmailValue("");
    setAgreementValue(false);
  };

  const submitEmail = () => {
      axios.post(`https://noticeboard.zuri.chat/api/v1/email-subscription?org=${org_id}&user=${userData}`,
      {
        email: result.email,
        user_id: result._id,
      }
      )
      .then((res) => {
        if (
          res.data.Message ===
          "You have successfully Unsubscribed"
        ) {
           setMessage(
            "You have successfully subcribed to our mailing list"
          );
        }
        else {
          setMessage(res.data.message);
        }
      }).catch((err) => console.log(err));
     
    }

  return (
    <Modal closeHandler={closeHandler}>
      <form className="form"  onSubmit={submitHandler}>
        <h1 className="flex">{subscriptionSuccess ? "Thank You for Subscribing!" : "Subscribe to get notifications through your mail"}</h1>
        {subscriptionSuccess ? (
          <div className="form content  successContent ">
            <p className="successMessage">
              You have successfully subscribed <em>{emailValue}</em> to Zuri Chat  oti
            </p>
            <Button type="button" className="successClose" onClick={closeHandler}>
              CLOSE
            </Button>
          </div>
        ) : (
          <fieldset onClick={closeHandler} className="fieldset  formContent">

            <label className="email">
              E-mail:
              <TextInput
                name="email"
                id="email"
                type="email"
                required
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
              />
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
      <button className="close"onClick={closeHandler} />
    </Modal>
  );
};

export default EmailSubscription;
