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
      <div className="flex flex-col items-center gap-4 w-screen px-6 sm:12 md:px-32 xl:px-20 py-9">
        <div className="flex flex-wrap ">

          <div className="flex flex-row rounded-xl bg-white lg:mx-30 xl:mx-30 2xl:mx-60 overflow-hidden  min-h-[700px]"> {/*mx-30 xl:mx-40 2xl:mx-60 */}
            <img src="/assets/loginImage.svg" className="desktopImage h-full"></img>
            <div className="flex flex-col items-center">
              {forms.find((form) => form.name === currentForm)?.form}
            </div>
          </div>

        </div>
      </div>
      {/* <div className="flex items-center justify-center py-20 w-full">
        <Card className="flex">
          <div className="desktopImage">

            <CardMedia
              component="img"
              image="/assets/loginImage.svg"
              alt="Login Image"
            />
          </div>
          <Box className="">
            {forms.find((form) => form.name === currentForm)?.form}
          </Box>
        </Card>
      </div> */}
    </Layout>
  );
};

export default LoginPage;
