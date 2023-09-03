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

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  accountType: AccountType | undefined;
}

interface RegistrationFormProps {
  setForm: (formName: FormNames) => void;
  setFormData: (formData: RegisterFormValues) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  setForm,
  setFormData,
}) => {
  const { handleSubmit, control } = useForm<RegisterFormValues>({
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
        <label className="text-base font-medium mb-2">Username *</label>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Username"
              fullWidth
            />
          )}
        />
        <label className="text-base font-medium py-2">Email *</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Email"
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
        <div className="flex flex-row pt-4">
          <Checkbox />
          <Typography className="py-2">
            I agree to the{" "}
            <span className="underline font-bold">Terms & Condition</span> and{" "}
            <span className="underline font-bold">Privacy Policy</span>
          </Typography>
        </div>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
