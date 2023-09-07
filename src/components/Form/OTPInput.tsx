import {
  ChangeEvent,
  ClipboardEvent,
  FocusEventHandler,
  KeyboardEvent,
  useRef,
} from "react";

const CONTAINS_1_NUMBER = /^\d$/;
const CONTAINS_6_NUMBERS = /^\d{6}$/;

interface OTPInputProps {
  otpValue: string[];
  onChange: (otpValue: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ otpValue, onChange }) => {
  /**
   * Refs of each bubble input
   */
  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;

    if (!CONTAINS_1_NUMBER.test(value) && value !== "") return;
    if (index < 5 && value !== "") otpInputRefs[index + 1].current?.focus();

    const newOtpArr = [...otpValue];
    newOtpArr[index] = value;
    onChange(newOtpArr);
  };

  //   not used on the first input because it's not possible to go back
  const keyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key !== "Backspace") return;
    const newOtpArr = [...otpValue];

    if (index > 0 && otpInputRefs[index].current?.value === "") {
      newOtpArr[index - 1] = "";
      otpInputRefs[index - 1].current?.focus();
    } else {
      newOtpArr[index] = "";
    }
    onChange(newOtpArr);

    event.stopPropagation();
    event.preventDefault();
  };

  const pasteHandler = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData("text") ?? "";

    if (CONTAINS_6_NUMBERS.test(pastedData)) {
      const newOtpArr = pastedData.split("");
      onChange(newOtpArr);
    }
  };

  const handlePreventScrolling: FocusEventHandler = (e) => {
    e.preventDefault();
    // Prevent iOS scrolling/jumping everytime it's focused
    window.scrollTo(0, window.scrollY);
  };

  return (
    <>
      {otpValue.map((value, index) => (
        <input
          className="w-12 h-12 border border-black outline-none rounded-sm text-center text-xl"
          onPaste={pasteHandler}
          key={index}
          ref={otpInputRefs[index]}
          onFocus={handlePreventScrolling}
          value={value}
          type={"number"}
          inputMode="numeric"
          onChange={(val) => changeHandler(val, index)}
          onKeyDown={(val) => keyDownHandler(val, index)}
          pattern="\d*"
          required
        />
      ))}
    </>
  );
};
export default OTPInput;
