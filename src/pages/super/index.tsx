import Login from "@modules/components/Login";
import { NextPage } from "next";
import SuperLayout from "@layouts/SuperLayoutV5";

const SuperLoginPage: NextPage = () => {
  return (
    <SuperLayout>
      <Login isSuper />
    </SuperLayout>
  );
};

export default SuperLoginPage;
