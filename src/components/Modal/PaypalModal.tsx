import { useState } from "react";
import Modal from "./Modal";
import { InputAdornment, TextField } from "@mui/material";
import { toast } from "react-hot-toast";

interface PaypalModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PaypalModal: React.FC<PaypalModalProps> = ({ open, setOpen }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    if (!amount) {
      toast.error("Amount cannot be empty");
      return;
    }

    if (amount < 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    toast.success("Cash in success");
    setOpen(false);
  };

  const bodyContent = (
    <div className="flex flex-col">
      <p className="flex text-xl ml-2 font-semibold justify-start">Amount</p>
      <TextField
        sx={{ m: 1 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={handleChange}
        type="number"
        className="bg-gray-100"
      />
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Cash In by Paypal"
      body={bodyContent}
      actionLabel="paypal"
    />
  );
};

export default PaypalModal;
