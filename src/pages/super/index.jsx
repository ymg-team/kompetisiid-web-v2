// components
import Login from "~/src/components/fields/Login";
import SuperLayout from "@layouts/SuperLayoutV5";

const SuperLoginPage = () => {
  return (
    <SuperLayout>
      <Login isSuper />
    </SuperLayout>
  );
};

export default SuperLoginPage;
