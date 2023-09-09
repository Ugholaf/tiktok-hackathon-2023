import {
  Checkbox,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AccountType } from "../../generated/graphql";
import { FormNames } from "../../pages/LoginPage";
import { useState } from "react";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  accountType: AccountType | undefined;
  termsCondition: boolean;
}

interface RegistrationFormProps {
  setForm: (formName: FormNames) => void;
  setFormData: (formData: RegisterFormValues) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setForm,
  setFormData,
}) => {
  const [visibility, setVisibility] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      accountType: undefined,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    setFormData(data);
    setForm(FormNames.INDIVIDUAL);
  };

  return (
    <form
      className="flex flex-wrap flex-col"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="flex flex-wrap justify-between py-10">
        <div className="flex flex-col w-full items-start">
          <label className="text-base font-medium mb-2">Username *</label>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                placeholder="Username"
                fullWidth
              />
            )}
          />
          {errors.username && submitPressed && (
            <p className=" flex text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="text-base font-medium py-2">Email *</label>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            }}
            shouldUnregister={false}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                placeholder="Email"
                fullWidth
              />
            )}
          />
          {errors.email && submitPressed && (
            <p className=" flex text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="text-base font-medium py-2">Password *</label>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type={visibility ? "text" : "password"}
                variant="outlined"
                placeholder="Password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <button onClick={() => setVisibility(!visibility)}>
                      {visibility ? (
                        <img
                          src="/assets/visibilityOn.svg"
                          alt="showPassword"
                        />
                      ) : (
                        <img
                          src="/assets/visibilityOff.svg"
                          alt="hidePassword"
                        />
                      )}
                    </button>
                  ),
                }}
              />
            )}
          />
          {errors.password && submitPressed && (
            <p className=" flex text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="text-base font-medium py-2">Account Type *</label>
          <Controller
            control={control}
            name="accountType"
            rules={{
              required: "Account Type is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                className="w-full text-left"
                defaultValue="none"
                onChange={onChange}
                value={value}
                renderValue={
                  value !== undefined
                    ? undefined
                    : () => (
                        <label className="text-zinc-400">
                          Individual/Business
                        </label>
                      )
                }
              >
                {Object.values(AccountType).map((accountType) => (
                  <MenuItem key={accountType} value={accountType}>
                    {accountType}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.accountType && submitPressed && (
            <p className=" flex text-red-500">{errors.accountType.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full items-start">
          <div className="flex flex-row pt-4">
            <Checkbox
              {...register("termsCondition", {
                required: "Please accept the terms and conditions to continue",
              })}
            />
            <Typography className="py-2">
              I agree to the{" "}
              <span className="underline font-bold">Terms & Condition</span> and{" "}
              <span className="underline font-bold">Privacy Policy</span>
            </Typography>
          </div>
          {errors.termsCondition && submitPressed && (
            <p className=" flex text-red-500">
              {errors.termsCondition.message}
            </p>
          )}
        </div>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded"
        type="submit"
        onClick={() => setSubmitPressed(true)}
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
