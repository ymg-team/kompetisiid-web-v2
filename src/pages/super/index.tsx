import type { NextPage } from "next";

// components
import Login from "~/src/components/Fields/Login";
import SuperLayout from "@layouts/SuperLayoutV5";

const SuperLoginPage: NextPage = () => {
  return (
    <SuperLayout>
      <Login isSuper />
    </SuperLayout>
  );
};

export default SuperLoginPage;
