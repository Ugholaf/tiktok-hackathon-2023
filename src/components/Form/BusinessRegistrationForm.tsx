import { MenuItem, Select, TextField } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues } from "./RegistrationForm";
import dayjs from "dayjs";
import countries from "../../constant/countries";
import {
  RegisterBusinessMutationVariables,
  useRegisterBusinessMutation,
} from "../../generated/graphql";
import { useDispatch } from "react-redux";
import { onLogin } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { IndividualFormValues } from "./IndividualRegistrationForm";
import { useNavigate } from "react-router";

interface FormValues {
  businessName: string;
  uen: string;
  businessCountry: string;
  businessPostcode: string;
  businessAddress: string;
}

interface BusinessRegistrationFormProps {
  registerFormValues: RegisterFormValues;
  individualFormValues: IndividualFormValues;
}

const BusinessRegistrationForm: React.FC<BusinessRegistrationFormProps> = ({
  registerFormValues,
  individualFormValues,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerBusiness] = useRegisterBusinessMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      businessName: "",
      uen: "",
      businessCountry: "",
      businessPostcode: "",
      businessAddress: "",
    },
  });

  const onSubmit = handleSubmit(async (businessData) => {
    const data: RegisterBusinessMutationVariables = {
      ...businessData,
      ...individualFormValues,
      dateOfBirth: dayjs(individualFormValues.dateOfBirth).format("DD-MM-YYYY"),
      username: registerFormValues.username,
      email: registerFormValues.email,
      password: registerFormValues.password,
    };

    try {
      const { data: registerData, errors } = await registerBusiness({
        variables: {
          ...data,
        },
      });

      if (registerData?.registerBusiness) {
        const accessToken = registerData.registerBusiness.accessToken;
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
          <p className="text-2xl font-bold">Enter Your Business Information </p>
        </div>
        <div className="grid grid-col-1 gap-4 md:grid-cols-2 my-10">
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Business Name *
            </p>
            <Controller
              control={control}
              name="businessName"
              rules={{
                required: "Business Name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Business Name"
                  fullWidth
                />
              )}
            />
            {errors.businessName && (
              <p className=" flex text-red-500">
                {errors.businessName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Business UEN *
            </p>
            <Controller
              control={control}
              name="uen"
              rules={{
                required: "UEN is required",
                minLength: {
                  value: 9,
                  message: "UEN must be at least 9 characters",
                },
                maxLength: {
                  value: 10,
                  message: "UEN must be at most 10 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="UEN"
                  fullWidth
                />
              )}
            />
            {errors.uen && (
              <p className=" flex text-red-500">{errors.uen.message}</p>
            )}
          </div>
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Country *
            </p>
            <Controller
              control={control}
              name="businessCountry"
              rules={{
                required: "Country is required",
              }}
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
            {errors.businessCountry && (
              <p className=" flex text-red-500">
                {errors.businessCountry.message}
              </p>
            )}
          </div>
          <div className="flex flex-col md:col-span-1">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Postal Code *
            </p>
            <Controller
              control={control}
              name="businessPostcode"
              rules={{
                required: "Postal Code is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Postal Code"
                  fullWidth
                />
              )}
            />
            {errors.businessPostcode && (
              <p className=" flex text-red-500">
                {errors.businessPostcode.message}
              </p>
            )}
          </div>
          <div className="flex flex-col md:col-span-2">
            <p className="flex flex-start text-sm font-semibold mb-2">
              Business Address *
            </p>
            <Controller
              control={control}
              name="businessAddress"
              rules={{
                required: "Business Address is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  placeholder="Business Address"
                />
              )}
            />
            {errors.businessAddress && (
              <p className=" flex text-red-500">
                {errors.businessAddress.message}
              </p>
            )}
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

export default BusinessRegistrationForm;
