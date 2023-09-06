import { useState } from "react";
import Modal from "./Modal";
import OTPInput from "../Form/otpInput";
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
  accountType,
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
        if (accountType === AccountType.BUSINESS) {
          navigate("/business");
        } else {
          navigate("/personal");
        }
      }

      if (errors && errors.length > 0) {
        toast.error("Error logging in");
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

      <button
        className="bg-red-500 py-3 px-5 mt-6 items-center self-stretch rounded-md text-white font-bold hover:opacity-70 transition w-full"
        onClick={() => handleSubmit()}
      >
        Next
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="2FA OTP"
      body={bodyContent}
    />
  );
};

export default TwoFALoginModal;
