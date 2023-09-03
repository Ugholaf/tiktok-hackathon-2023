import { MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { AccountType, useLoginMutation } from "../../generated/graphql";
import { onLogin } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface FormValues {
  usernameOrEmail: string;
  password: string;
  accountType: AccountType | undefined;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginRequest] = useLoginMutation();

  const { handleSubmit, control } = useForm<FormValues>({
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

      if (loginData?.login) {
        const accessToken = loginData.login.accessToken;
        dispatch(onLogin({ accessToken }));
        if (data.accountType === AccountType.INDIVIDUAL) {
          dispatch(onLogin({ accessToken }));
          navigate("/personal");
          toast.success("Login Successful");
        }
      }

      if (errors && errors.length > 0) {
        toast.error("Error logging in");
      }
    } catch (error) {
      toast.error("Error logging in");
    }
  });

  return (
    <form className="flex flex-wrap flex-col" onSubmit={onSubmit}>
      <div className="flex flex-wrap justify-between py-10">
        <label className="text-base font-medium mb-2">Email *</label>
        <Controller
          control={control}
          name="usernameOrEmail"
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Username/Email"
              fullWidth
            />
          )}
        />
        <label className="text-base font-medium py-2">Password *</label>
        <Controller
          control={control}
          name="password"
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
        <label className="text-base font-medium py-2">Account Type *</label>
        <Controller
          control={control}
          name="accountType"
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
                      <label className="text-zinc-400">Personal/Business</label>
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
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
