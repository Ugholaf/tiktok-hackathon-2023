import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues } from "./RegistrationForm";
import dayjs from "dayjs";
import countries from "../../constant/countries";

interface FormValues {
  firstName: string;
  lastName: string;
  DOB: string;
  country: string;
  postalCode: string;
  occupation: string;
}

interface IndividualRegistrationFormProps {
  registerFormValues: RegisterFormValues;
}

const IndividualRegistrationForm: React.FC<IndividualRegistrationFormProps> = ({
  registerFormValues,
}) => {
  // const [
  //   registerIndividual,
  //   { loading: isRegisterLoading, error: registerError },
  // ] = useRegisterIndividualMutation();

  const { control } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      DOB: "",
      country: "",
      postalCode: "",
      occupation: "",
    },
  });

  console.log(registerFormValues);

  return (
    <form
      className="flex flex-wrap flex-col"
      onSubmit={(data) => console.log(data)}
    >
      <div className="flex flex-col py-10 px-12">
        <div className="flex flex-wrap justify-center">
          <p className="text-2xl font-bold">Enter Your Personal Information </p>
        </div>
        <div className="grid grid-col-1 gap-4 md:grid-cols-2 my-10">
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">
              First Name
            </p>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="First Name"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Last Name
            </p>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Last Name"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Date of Birth
            </p>
            <Controller
              control={control}
              name="DOB"
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
            <p className="flex flex-start text-sm font-semibold mb-2">
              Country
            </p>
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
            <p className="flex flex-start text-sm font-semibold mb-2">
              Postal Code
            </p>
            <Controller
              control={control}
              name="postalCode"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Postal Code"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Occupation
            </p>
            <Controller
              control={control}
              name="occupation"
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Occupation"
                  fullWidth
                />
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
