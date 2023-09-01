import { MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

enum AccountType {
  Personal = "Personal",
  Business = "Business",
}

interface FormValues {
  usernameEmail: string | undefined;
  password: string | undefined;
  accountType: AccountType | undefined;
}

const LoginForm = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      usernameEmail: undefined,
      password: undefined,
      accountType: undefined,
    },
  });

  return (
    <form
      className="flex flex-wrap flex-col"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="flex flex-wrap justify-between py-10">
        <label className="text-base font-medium mb-2">Email *</label>
        <Controller
          control={control}
          name="usernameEmail"
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
