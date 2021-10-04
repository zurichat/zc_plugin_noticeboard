import { useState } from "react";
import classes from "./Subscription.module.css";
import EmailSubscription from "./components/EmailSubscription";

function Subscription() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <main>
      <EmailSubscription closeHandler={() => setShowNewsletter(false)} />
    </main>
  );
}

export default Subscription;
