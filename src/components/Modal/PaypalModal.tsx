import { useState } from "react";
import Modal from "./Modal";
import { InputAdornment, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  Currency,
  useConfirmDepositMutation,
  useRequestDepositMutation,
} from "../../generated/graphql";

interface PaypalModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PaypalModal: React.FC<PaypalModalProps> = ({ open, setOpen }) => {
  // const amountRef = useRef<HTMLInputElement>(null);
  const amount = "1";
  const [paypalCheckoutId, setPaypalCheckoutId] = useState<string>("");
  const handleClose = () => {
    setOpen(false);
  };

  const [requestDeposit] = useRequestDepositMutation();
  const [confirmDeposit] = useConfirmDepositMutation();

  const bodyContent = (
    <div className="flex flex-col">
      <p className="flex text-xl ml-2 font-semibold justify-start">Amount</p>
      <TextField
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={amount}
        type="number"
        className="bg-gray-100"
      />
    </div>
  );

  const paypalButton = (
    <PayPalButtons
      style={{ layout: "horizontal", tagline: false }}
      createOrder={async () => {
        if (amount) {
          toast.error("Amount cannot be empty");
          throw new Error("Amount cannot be empty");
        }

        if (amount) {
          toast.error("Amount must be greater than 0");
          throw new Error("Amount must be greater than 0");
        }
        try {
          const { data: depositData, errors } = await requestDeposit({
            variables: {
              amount: amount,
              currency: Currency.SGD,
            },
          });

          if (errors && errors.length > 0) {
            toast.error("Error requesting deposit");
            return "";
          }

          if (!depositData?.requestDeposit.paypalCheckoutId) {
            toast.error("Error requesting deposit");
            return "";
          }

          setPaypalCheckoutId(depositData?.requestDeposit.paypalCheckoutId);
          toast.success("Successfully requested deposit");
          console.log("hi");
          console.log(depositData?.requestDeposit.paypalCheckoutId);
          return depositData?.requestDeposit.paypalCheckoutId;
        } catch (error) {
          toast.error("Error requesting deposit");
          return "";
        }
      }}
      onApprove={async () => {
        // call confirmDeposit
        try {
          const { data: confirmDepositData, errors } = await confirmDeposit({
            variables: {
              paypalCheckoutId: paypalCheckoutId,
            },
          });

          if (errors && errors.length > 0) {
            toast.error("Error confirming deposit");
            return;
          }

          if (!confirmDepositData?.confirmDeposit) {
            toast.error("Error confirming deposit");
            return;
          }

          toast.success("Successfully confirmed deposit");
          return;
        } catch (error) {
          toast.error("Error confirming deposit");
          return;
        }
      }}
      className="w-full"
    />
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Cash In by Paypal"
      body={bodyContent}
      button={paypalButton}
    />
  );
};

export default PaypalModal;
