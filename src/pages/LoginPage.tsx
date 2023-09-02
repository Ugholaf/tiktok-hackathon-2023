import { Box, Card, CardMedia } from "@mui/material";
import Layout from "../components/Layout/Layout";
import LoginRegistration from "../components/LoginRegistration.tsx/LoginRegistration";

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center py-20 w-full">
        <Card className="flex">
          <CardMedia
            component="img"
            sx={{ width: "24.5rem" }}
            image="/src/assets/loginImage.svg"
            alt="Login Image"
          />
          <Box sx={{ width: "38rem" }}>
            <LoginRegistration />
          </Box>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
