import React from "react";
import { useFormikContext } from "formik";

// services
import { fetchCompetitionCategories } from "@services/competition_categories";

import SelectV2 from "@components/form/v2/Select";
import GlobalLoader from "@components/preloaders/GlobalLoader";

const CompetitionCategory = () => {
  const { values }: any = useFormikContext();
  const [respCategories, setRespCategories]: any = React.useState({});

  // initial effects
  React.useEffect(() => {
    fetchCategories();
  }, []);

  // initial memos
  const MainCategories = React.useMemo(() => {
    if (respCategories.status === 200) {
      return respCategories.data.map((n: any) => {
        return {
          value: n.id,
          text: n.name,
        };
      });
    }
    return [];
  }, [respCategories]);

  const SubCategories = React.useMemo(() => {
    if (values.main_cat && respCategories.data) {
      const SelectedCategory =
        respCategories.data.find((n: any) => n.id == values.main_cat) || {};
      const SubCategories = SelectedCategory.subcategories || [];
      return SubCategories.map((n: any) => {
        return {
          value: n.id,
          text: n.name,
        };
      });
    } else {
      return [];
    }
  }, [MainCategories, values.main_cat, respCategories]);

  // initial functions
  const fetchCategories = React.useCallback(async () => {
    const Response = await fetchCompetitionCategories();
    setRespCategories(Response);
  }, []);

  return (
    <>
      {MainCategories.length > 0 ? (
        <SelectV2
          name="main_cat"
          label="Main Kategori"
          options={MainCategories}
          required
        />
      ) : (
        <GlobalLoader />
      )}

      {SubCategories.length > 0 && (
        <SelectV2
          name="sub_cat"
          label="Sub Kategori"
          options={SubCategories}
          required
        />
      )}
    </>
  );
};

export default CompetitionCategory;
