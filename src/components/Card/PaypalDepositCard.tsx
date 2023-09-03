import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export const PaypalDepositCard = () => {
  const [amount, setAmount] = useState("0");
  console.log(amount);
  return (
    <div>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async (data) => {
          console.log("create order data");
          console.log(data);
          return "3KR61530608664229";
        }}
        onApprove={async (data) => {
          // call confirmDeposit
        }}
      />
    </div>
  );
};
