import { useState } from "react";

import Button from "./EmailSubscriptionButton";
import Modal from "./EmailSubscriptionModal";
import TextInput from "./TextInput";
import classes from "./EmailSubscription.module.css";
import axios from "axios";

const Newsletter = props => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [agreementValue, setAgreementValue] = useState(false);
  const [message, setMessage] = useState();

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
      axios.post(`http://127.0.0.1:8000/api/v1/email-subscription?org=6145b49e285e4a18402073bc&user=614ebf43f31a74e068e4dae1`,
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
            "You have successfully unsubcribed from our mailing list"
          );
        }
        else {
          setMessage(res.data.message);
        }
      }).catch((err) => console.log(err));
     
    }

  return (
    <Modal closeHandler={closeHandler}>
      <form className={`${classes.form}`} onSubmit={submitHandler}>
        <h1 className="flex">{subscriptionSuccess ? "Thank You for Subscribing!" : "Subscribe to get notifications through your mail"}</h1>
        {subscriptionSuccess ? (
          <div className={`flex-column ${classes.formContent} ${classes.successContent}`}>
            <p className={classes.successMessage}>
              You have successfully subscribed <em>{emailValue}</em> to Zuri Chat  oti
            </p>
            <Button type="button" className={classes.successClose} onClick={closeHandler}>
              CLOSE
            </Button>
          </div>
        ) : (
          <fieldset onClick={closeHandler} className={`grid ${classes.formContent} ${classes.fieldset}`}>

            <label className={classes.email}>
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
            <div className={`flex ${classes.btnGroup}`}>
              {/* <Button className={classes.clear} type="reset" onClick={clearHandler}>
                CLEAR
              </Button> */}
              <Button className={classes.submit} onClick={submitEmail}>SUBMIT</Button>
            </div>
          </fieldset>
        )}
      </form>
      <button className={classes.close} onClick={closeHandler} />
    </Modal>
  );
};

export default Newsletter;
