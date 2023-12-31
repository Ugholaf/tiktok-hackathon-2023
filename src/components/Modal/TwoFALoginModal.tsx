import { useState } from "react";
import Modal from "./Modal";
import OTPInput from "../Form/OTPInput";
import { AccountType, useLoginMutation } from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { onLogin } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

interface TwoFALoginModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loginToken: string;
  accountType: AccountType | undefined;
}

const TwoFALoginModal: React.FC<TwoFALoginModalProps> = ({
  open,
  setOpen,
  loginToken,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const handleClose = () => {
    setOpen(false);
  };

  const [login] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      const { data: loginData, errors } = await login({
        variables: {
          loginToken,
          otp: otpValue.join(""),
        },
      });

      if (loginData?.login) {
        const accessToken = loginData.login.accessToken;
        dispatch(onLogin({ accessToken }));
        setOpen(false);
        navigate("/");
      }

      if (errors && errors.length > 0) {
        toast.error(errors[0].message);
      }
    } catch (error) {
      toast.error("Error logging in");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="Enter OTP"
          className="flex text-xl ml-2 font-semibold justify-center"
        >
          Please enter the OTP sent to your registered email
        </label>
        <div className="flex justify-center mt-8 mb-4 gap-2">
          <OTPInput otpValue={otpValue} onChange={setOtpValue} />
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="2FA OTP"
      body={bodyContent}
      actionLabel="Submit"
    />
  );
};

export default TwoFALoginModal;
