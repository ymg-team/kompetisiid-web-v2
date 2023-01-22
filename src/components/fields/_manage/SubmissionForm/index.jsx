import React from "react";
import { alert } from "@components/alert/Base";

// components
import Submit from "@components/form/v2/Submit";
import InputTextV2 from "@components/form/v2/InputText";
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import MobileHeader from "@components/headers/MobileHeader";
import Spacer from "@components/boxs/Spacer";

// configs
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { RECHAPTCHA_SITE_KEY } = publicRuntimeConfig;

// services
import { submitCompetitionSubmission } from "@services/competition_submission";

const SubmissionForm = ({
  submissionFields,
  submissionData,
  onBack,
  state,
}) => {
  // initial state
  const [loading, setLoading] = React.useState(false);

  // initial memos
  const initialValues = React.useMemo(() => {
    let formInitialValues = {};
    submissionFields.fields.map((n) => {
      if (state === "view" && submissionData[n.label]) {
        formInitialValues[n.label] = submissionData[n.label];
      } else {
        formInitialValues[n.label] =
          n.type === "phone" ? "628" : n.type === "link" ? "https://" : "";
      }
    });
    return formInitialValues;
  }, [submissionFields, submissionData, state]);

  // initial functions
  // function to handle submit
  const submitHandler = React.useCallback(async (values) => {
    setLoading(true);
    if (grecaptcha.getResponse()) {
      //ready to request to be
      const Response = await submitCompetitionSubmission({
        submission: values,
        competition_submission_field_id: submissionFields.id,
      });
      alert(
        true,
        Response.message,
        Response.status === 201 ? "success" : "error"
      );
      if (Response.status === 201) {
        onBack();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
      return alert(true, "Rechaptcha wajib diisi", "error");
    }
  });

  // function to handle field validator
  const fieldValidator = React.useCallback(
    (fields) => {
      let error = {};

      submissionFields.fields.map((n) => {
        // required validation
        if (!fields[n.label]) error[n.label] = "field ini wajib diisi";

        // phone number validation
        if (n.type === "phone" && !fields[n.label].match(/[628][0-9]{6,18}/)) {
          error[n.label] = "Nomor telepon tidak valid, awali dengan 628***";
        }

        if (
          n.type === "link" &&
          !fields[n.label].match(
            /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
          )
        ) {
          error[n.label] = "URL tidak valid, awali juga dengan https://";
        }
      });

      return error;
    },
    [submissionFields]
  );

  return (
    <>
      <MobileHeader
        title={`${state === "create" ? "Buat" : "View"} Submission`}
        {...{ onBack }}
      />
      <Spacer size="small" />

      <Formik
        {...{ initialValues }}
        onSubmit={(values, { setSubmitting }) => {
          return submitHandler(values);
        }}
        validate={fieldValidator}
      >
        <Form className="form-ki">
          {submissionFields.fields.map((n, key) => {
            switch (n.type) {
              default:
                return (
                  <InputTextV2
                    key={n.label || key}
                    name={n.label}
                    label={n.label}
                    required={n.required}
                    disabled={state === "view"}
                  />
                );
            }
          })}
          {state === "create" && (
            <>
              <br />
              <ReCAPTCHA sitekey={RECHAPTCHA_SITE_KEY} />
              <br />
              <Submit
                className="btn btn-gray"
                disabled={loading}
                type="submit"
                style={{
                  fontWeight: "bold",
                  width: "100%",
                  backgroundColor: "#FFF",
                  color: "#292929",
                }}
                text={loading ? "loading..." : "Submit"}
              />
            </>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default SubmissionForm;
