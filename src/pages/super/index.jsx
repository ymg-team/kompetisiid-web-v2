// layouts
import SuperLayout from "@layouts/SuperLayoutV5";

// components
import Login from "~/src/components/fields/Login";
import SEO from "@components/meta/SEO";

const SuperLoginPage = () => {
  return (
    <SuperLayout>
      <SEO title={"Super Login"} />
      <Login isSuper />
    </SuperLayout>
  );
};

export default SuperLoginPage;
