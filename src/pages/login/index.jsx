// components
import ManageLayout from "@layouts/ManageLayoutV5";
import Login from "@components/Fields/Login";

const LoginPage = () => {
  return (
    <ManageLayout>
      <Login isDashboard />
    </ManageLayout>
  );
};

export default LoginPage;
