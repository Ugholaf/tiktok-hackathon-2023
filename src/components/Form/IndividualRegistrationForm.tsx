import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues } from "./RegistrationForm";
import dayjs from "dayjs";
import countries from "../../constant/countries";
import {
  AccountType,
  RegisterIndividualMutationVariables,
  useRegisterIndividualMutation,
} from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { onLogin } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { FormNames } from "../../pages/LoginPage";

export interface IndividualFormValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postcode: string;
  occupation: string;
}

interface IndividualRegistrationFormProps {
  registerFormValues: RegisterFormValues;
  setForm: (formName: FormNames) => void;
  setIndividualFormValues: (individualFormValues: IndividualFormValues) => void;
}

const IndividualRegistrationForm: React.FC<IndividualRegistrationFormProps> = ({
  registerFormValues,
  setForm,
  setIndividualFormValues,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerIndividual] = useRegisterIndividualMutation();

  const { handleSubmit, control } = useForm<IndividualFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      country: "",
      postcode: "",
      occupation: "",
    },
  });

  const onSubmit = handleSubmit(async (individualData) => {
    if (registerFormValues.accountType === AccountType.BUSINESS) {
      setForm(FormNames.BUSINESS);
      setIndividualFormValues(individualData);
      return;
    }

    const data: RegisterIndividualMutationVariables = {
      ...individualData,
      dateOfBirth: dayjs(individualData.dateOfBirth).format("DD-MM-YYYY"),
      username: registerFormValues.username,
      email: registerFormValues.email,
      password: registerFormValues.password,
    };

    try {
      const { data: registerData, errors } = await registerIndividual({
        variables: {
          ...data,
        },
      });

      if (registerData?.registerIndividual) {
        const accessToken = registerData.registerIndividual.accessToken;
        dispatch(onLogin({ accessToken }));
        navigate("/");
        toast.success("Successfully registered!");
      }

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }
    } catch (error: unknown) {
      console.log(error);
      if ((error as Error).message.includes("duplicate")) {
        toast.error("Email or username already exists!");
        return;
      }
      toast.error((error as Error)?.message ?? "Error registering!");
    }
  });

  return (
    <form className="flex flex-wrap flex-col" onSubmit={onSubmit}>
      <div className="flex flex-col py-10 px-4 md:px-12">
        <div className="flex flex-wrap justify-center">
          <p className="text-2xl font-bold">Enter Your Personal Information </p>
        </div>
        <div className="grid grid-col-1 gap-4 md:grid-cols-2 my-10">
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">First Name</p>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField {...field} variant="outlined" placeholder="First Name" fullWidth />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">Last Name</p>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField {...field} variant="outlined" placeholder="Last Name" fullWidth />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">Date of Birth</p>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value.length === 0 ? null : dayjs(field.value)}
                  views={["day", "month", "year"]}
                  slotProps={{ textField: { placeholder: "Please select" } }}
                />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">Country</p>
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, value } }) => (
                <Select
                  className="text-left"
                  value={value}
                  onChange={onChange}
                  renderValue={
                    value !== ""
                      ? undefined
                      : () => <label className="text-gray-400">Country</label>
                  }
                  MenuProps={{
                    style: {
                      maxHeight: "300px",
                    },
                  }}
                >
                  {countries.map((country, i) => (
                    <MenuItem key={i} value={country} className="text">
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">Postal Code</p>
            <Controller
              control={control}
              name="postcode"
              render={({ field }) => (
                <TextField {...field} variant="outlined" placeholder="Postal Code" fullWidth />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">Occupation</p>
            <Controller
              control={control}
              name="occupation"
              render={({ field }) => (
                <TextField {...field} variant="outlined" placeholder="Occupation" fullWidth />
              )}
            />
          </div>
          <button
            className=" bg-red-500 hover:bg-red-600 text-white p-4 rounded md:col-span-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default IndividualRegistrationForm;
