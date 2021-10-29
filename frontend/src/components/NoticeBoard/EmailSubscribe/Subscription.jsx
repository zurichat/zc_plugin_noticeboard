import { useState } from "react";
import "./Subscription.css";
import EmailSubscription from "./components/EmailSubscription";

function Subscription() {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <main className="flex-column">
      <EmailSubscription closeHandler={() => setShowNewsletter(false)} />
    </main>
  );
}

export default Subscription;
