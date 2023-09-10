import React from "react";

import {
  CompetitionFormProps,
  CompetitionFormError,
  CompetitionFormValues,
} from "./types";

// helpers
import { dateToFormat } from "@helpers/dateTime";

// services
import {
  createCompetition as createCompetitionV3,
  updateCompetition as updateCompetitionV3,
} from "@services/v3/competitions";

// components
import { Form, Formik } from "formik";
import DatePickerV2 from "@components/form/v2/DatePicker";
import InputTextV2 from "@components/form/v2/InputText";
import InputFileV2 from "@components/form/v2/InputFile";
import TextareaV2 from "@components/form/v2/Textarea";

import EditorV2 from "@components/form/v2/Editor";
import CKEditor from "@components/form/CKEditor";
import Submit from "@components/form/v2/Submit";
import Spacer from "@components/boxs/Spacer";
import HeaderDashboard from "@components/headers/HeaderDashboard";
import CompetitionContactField from "@components/fields/CompetitionContacts";
import CompetitionCategoryField from "@components/fields/CompetitionCategory";
import Checkbox from "@components/form/v2/Checkbox";
import InputTag from "@components/form/v2/InputTag";
import { alert } from "@components/alert/Base";

const Now = new Date();

const FormCompetition: React.FC<CompetitionFormProps> = ({
  type,
  competitionData,
}) => {
  // initial states
  const [loading, setLoading] = React.useState(false);
  const [isDraft, setIsDraft] = React.useState(false);

  const submitHandler = React.useCallback(
    async (values: CompetitionFormValues) => {
      setLoading(true);
      let payload: any = { ...values };

      payload.contacts = JSON.stringify(values.contacts);
      payload.announcements = JSON.stringify(values.announcements);
      payload.tags = values.tags.length > 0 ? values.tags.join() : "";
      payload.main_cat = parseInt(payload.main_cat);
      payload.sub_cat = parseInt(payload.sub_cat);
      payload.status = isDraft ? "posted" : "draft";

      if (!payload.poster) {
        delete payload.poster;
      } else {
        // convert poster file to base64
      }

      // return console.log("payload", JSON.stringify(payload));

      const Response =
        type === "create"
          ? await createCompetitionV3(payload)
          : await updateCompetitionV3(payload, competitionData.data.id);

      if (Response.status === 201 || Response.status === 200) {
        alert(true, Response.message, "success");
        setTimeout(() => {
          location.href = "/super/competitions";
        }, 2000);
      } else {
        setLoading(false);
        alert(true, Response.message, "error");
      }
    },
    [isDraft, type, competitionData]
  );

  const InitialValues = React.useMemo(() => {
    if (competitionData.status === 200) {
      const { data } = competitionData;

      return {
        title: data.title || "",
        description: data.sort || "",
        organizer: data.organizer || "",
        poster: "",
        deadline_date: new Date(parseInt(data.deadline_at) * 1000),
        announcement_date: new Date(parseInt(data.announcement_at) * 1000),
        main_cat: data.main_category.id,
        sub_cat: data.sub_category.id,
        content: data.content,
        prize_total: data.prize.total,
        prize_description: data.prize.description,
        contacts: data.contacts,
        is_guaranteed: data.is_garansi,
        is_mediapartner: data.is_mediapartner,
        is_manage: data.is_manage_by_ki,
        draft: data.is_draft,
        register_link: data.link_join || "",
        source_link: data.link_source || "",
        tags: data.tag ? data.tag.split(",") : [],
        announcements: data.announcement,
      };
    } else {
      return {
        title: "",
        description: "",
        organizer: "",
        poster: "",
        deadline_date: Now,
        announcement_date: Now,
        main_cat: 0,
        sub_cat: 0,
        content: "",
        prize_total: 0,
        prize_description: "",
        contacts: [],
        is_guaranteed: false,
        is_mediapartner: false,
        is_manage: false,
        draft: false,
        register_link: "",
        source_link: "",
        tags: [],
        announcements: [],
      };
    }
  }, [type, competitionData]);

  return (
    <>
      <Formik
        initialValues={InitialValues}
        onSubmit={(values) => {
          const nextValues: any = { ...values };

          // normalize data
          nextValues.deadline_date = dateToFormat(
            nextValues.deadline_date.getTime(),
            "Y-m-d h:i:s"
          );
          nextValues.announcement_date = dateToFormat(
            nextValues.announcement_date.getTime(),
            "Y-m-d h:i:s"
          );

          return submitHandler(nextValues);
        }}
        validate={(values: CompetitionFormValues) => {
          const errors: CompetitionFormError = {};

          // title validation
          if (!values.title) errors.title = "Required";
          if (!values.description) errors.description = "Required";
          if (!values.organizer) errors.organizer = "Required";
          if (!values.poster && type === "create") errors.poster = "Required";
          if (!values.deadline_date) errors.deadline_date = "Required";
          if (!values.announcement_date) errors.announcement_date = "Required";
          if (!values.main_cat) errors.main_cat = "Required";
          if (!values.sub_cat) errors.sub_cat = "Required";
          if (!values.content.trim()) errors.content = "Required";
          if (values.tags.length === 0) errors.tags = "Required";
          if (values.source_link.length === 0) errors.source_link = "Required";

          return errors;
        }}
      >
        {({ handleSubmit }) => (
          <Form className="form-ki">
            <Spacer size="medium" />

            {/* about competition block */}
            <HeaderDashboard
              title="Seputar Kompetisi"
              text="Pastikan memasukan data selengkap mungkin untuk memudahkan pengunjung memahami mekanisme kompetisi yang bersangkutan"
              asSubHeader
            />

            <InputTextV2
              type="text"
              name="title"
              label="Judul Kompetisi"
              required
            />

            <TextareaV2
              name="description"
              label="Deskripsi Singkat Kompetisi"
              required
            />

            <InputTextV2
              type="text"
              name="organizer"
              label="Penyelenggara Kompetisi"
              required
            />

            <InputFileV2
              label="Poster"
              name="poster"
              fileType="image"
              accept="image/jpeg"
              required
              initialPreview={
                competitionData.status === 200 &&
                competitionData.data.poster.small
              }
            />

            <DatePickerV2
              label="Deadline Pendaftaran"
              name="deadline_date"
              initialDate={InitialValues.deadline_date}
              required
            />

            <DatePickerV2
              label="Pengumuman Pemenang"
              name="announcement_date"
              initialDate={InitialValues.deadline_date}
              required
            />

            <CompetitionCategoryField />

            {/* <EditorV2 name="content" label="Peraturan Kompetisi" required /> */}
            <CKEditor name="content" label="Peraturan Kompetisi" required />

            <Spacer size="large" />

            {/* competition prizes block */}
            <HeaderDashboard
              title="Hadiah Kompetisi"
              text="Cantumkan perkiraan nilai total hadiah dan detail hadiah untuk para pemenang."
              asSubHeader
            />

            <InputTextV2
              type="number"
              name="prize_total"
              label="Nilai Total Hadiah (Dalam Rp)"
              placeholder="Contoh: 1000000 (hanya tulis angka)"
              required
            />

            <TextareaV2
              name="prize_description"
              label="Deskripsi Hadiah"
              placeholder="Contoh: Juara 1 mendapatkan x, Juara 2 ..."
              required
            />
            {/* end of competition prizes block */}

            <Spacer size="large" />

            {/* competition contacts block */}

            <HeaderDashboard
              title="Kontak Penyelenggara"
              text="Kontak yang memungkinkan para peserta kompetisi untuk terhubung langsung dengan Penyelenggara."
              asSubHeader
            />

            <CompetitionContactField
              name="contacts"
              initialValue={
                competitionData.status === 200
                  ? competitionData.data.contacts
                  : []
              }
            />

            <Spacer size="large" />

            {/* end of competition contacts block */}

            {/* extra data block */}
            <HeaderDashboard title="Extra Data" asSubHeader />

            <Checkbox label="Kompetisi ini Bergaransi" name="is_guaranteed" />
            <Checkbox
              label='Kompetisi Id sebagai "Media Partner"'
              name="is_mediapartner"
            />

            <InputTextV2
              type="text"
              name="register_link"
              label="Link Mendaftar Kompetisi"
            />

            <InputTextV2
              type="text"
              name="source_link"
              label="Link Sumber Info Kompetisi"
              required
            />

            <InputTag name="tags" label="Tags/Label" required />

            {/* end of extra data block */}

            <Spacer size="large" />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Submit
                className="btn btn-green"
                disabled={loading}
                type="button"
                onClick={() => {
                  setIsDraft(true);
                  handleSubmit();
                }}
                text={
                  loading
                    ? "loading..."
                    : type === "create"
                    ? "Create Competition"
                    : "Edit Competition"
                }
              />
              <Submit
                className="btn btn-white"
                disabled={loading}
                type="button"
                onClick={() => {
                  setIsDraft(true);
                  handleSubmit();
                }}
                text={loading ? "loading..." : "Simpan Draft"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCompetition;
