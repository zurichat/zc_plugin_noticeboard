import { useState } from "react";
import classes from "./Subscription.module.css";
import Newsletter from "./components/EmailSubscription";

function Subscription() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <main className={`flex-column ${classes.main}`}>
      <Newsletter closeHandler={() => setShowNewsletter(false)} />
    </main>
  );
}

export default Subscription;
