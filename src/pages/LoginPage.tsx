import { Box, Card, CardMedia } from "@mui/material";
import Layout from "../components/Layout/Layout";
import LoginRegistration from "../components/LoginRegistration.tsx/LoginRegistration";
import { useState } from "react";
import { RegisterFormValues } from "../components/Form/RegistrationForm";
import IndividualRegistrationForm, {
  IndividualFormValues,
} from "../components/Form/IndividualRegistrationForm";
import BusinessRegistrationForm from "../components/Form/BusinessRegistrationForm";

export enum FormNames {
  REGISTERLOGIN = "registerLogin",
  INDIVIDUAL = "individual",
  BUSINESS = "business",
}

const LoginPage = () => {
  const [currentForm, setCurrentForm] = useState<FormNames>(
    FormNames.REGISTERLOGIN
  );

  const [registerFormData, setRegisterFormData] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    accountType: undefined,
  });

  const [individualFormData, setIndividualFormData] =
    useState<IndividualFormValues>({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      country: "",
      postcode: "",
      occupation: "",
    });

  const forms = [
    {
      name: FormNames.REGISTERLOGIN,
      form: (
        <LoginRegistration
          setForm={setCurrentForm}
          setFormData={setRegisterFormData}
        />
      ),
    },
    {
      name: FormNames.INDIVIDUAL,
      form: (
        <IndividualRegistrationForm
          registerFormValues={registerFormData}
          setForm={setCurrentForm}
          setIndividualFormValues={setIndividualFormData}
        />
      ),
    },
    {
      name: FormNames.BUSINESS,
      form: (
        <BusinessRegistrationForm
          registerFormValues={registerFormData}
          individualFormValues={individualFormData}
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-center py-20 w-full">
        <Card className="flex ">
          <CardMedia
            component="img"
            sx={{ width: "24.5rem" }}
            image="/src/assets/loginImage.svg"
            alt="Login Image"
          />
          <Box sx={{ width: "38rem" }}>
            {/* <LoginRegistration /> */}
            {forms.find((form) => form.name === currentForm)?.form}
          </Box>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
