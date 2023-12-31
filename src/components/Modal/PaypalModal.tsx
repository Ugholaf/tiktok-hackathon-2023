import { useRef, useState } from "react";
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
  const checkoutRef = useRef("");
  const amountRef = useRef<HTMLInputElement>(null);
  const [, setAmount] = useState("");
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
        inputRef={amountRef}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-100"
      />
    </div>
  );

  const paypalButton = (
    <PayPalButtons
      disabled={parseFloat(amountRef.current?.value || "0") <= 0}
      style={{ layout: "horizontal", tagline: false }}
      createOrder={async () => {
        const amount = amountRef.current?.value;
        if (!amount || isNaN(+amount) || +amount <= 0) {
          throw new Error("Invalid amount");
        }

        const { data: depositData, errors } = await requestDeposit({
          variables: {
            amount: +amount,
            currency: Currency.SGD,
          },
        });
        if (!depositData?.requestDeposit.paypalCheckoutId || errors?.length) {
          toast.error("Error requesting deposit");
          throw new Error("Error requesting deposit");
        }

        checkoutRef.current = depositData.requestDeposit.paypalCheckoutId;
        return depositData?.requestDeposit.paypalCheckoutId;
      }}
      onApprove={async () => {
        // call confirmDeposit
        try {
          const { data: confirmDepositData, errors } = await confirmDeposit({
            variables: {
              paypalCheckoutId: checkoutRef.current,
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
          handleClose();
        } catch (error) {
          toast.error((error as Error).message);
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
