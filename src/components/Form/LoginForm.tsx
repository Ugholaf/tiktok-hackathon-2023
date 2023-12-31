import { MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AccountType, useLoginRequestMutation } from "../../generated/graphql";
import toast from "react-hot-toast";
import { useState } from "react";
import TwoFALoginModal from "../Modal/TwoFALoginModal";

interface FormValues {
  usernameOrEmail: string;
  password: string;
  accountType: AccountType | undefined;
}

const LoginForm = () => {
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false);
  const [loginRequest] = useLoginRequestMutation();
  const [loginToken, setLoginToken] = useState("");
  const [accountType, setAccountType] = useState<AccountType | undefined>(
    undefined
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
      accountType: undefined,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: loginData, errors } = await loginRequest({
        variables: {
          ...data,
          accountType: data.accountType as AccountType,
        },
      });

      if (loginData?.loginRequest) {
        setLoginToken(loginData.loginRequest.loginToken);
        setAccountType(data.accountType);
        setTwoFAModalOpen(true);
      }

      if (errors && errors.length > 0) {
        toast.error("Error logging in");
      }
    } catch (error) {
      toast.error("Error logging in");
    }
  });

  return (
    <>
      <form className="flex flex-wrap flex-col" onSubmit={onSubmit}>
        <div className="flex flex-wrap justify-between py-10">
          <div className="flex flex-col w-full items-start">
            <label className="text-base font-medium mb-2">
              Username/Email *
            </label>
            <Controller
              control={control}
              name="usernameOrEmail"
              rules={{
                required: "Username or Email is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Username/Email"
                  fullWidth
                />
              )}
            />
            {errors.usernameOrEmail && (
              <p className=" flex text-red-500">
                {errors.usernameOrEmail.message}
              </p>
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
                  type="password"
                  variant="outlined"
                  placeholder="Password"
                  fullWidth
                />
              )}
            />
            {errors.password && (
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
            {errors.accountType && (
              <p className=" flex text-red-500">{errors.accountType.message}</p>
            )}
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-4 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <TwoFALoginModal
        open={twoFAModalOpen}
        setOpen={setTwoFAModalOpen}
        loginToken={loginToken}
        accountType={accountType}
      />
    </>
  );
};

export default LoginForm;
