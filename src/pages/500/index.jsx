import FullPageError from "~/src/components/boxs/FullPageError";

const Error500 = () => {
  return (
    <FullPageError
      message={
        "Maaf ada sedikit masalah di Kompetisi Id, akses secara berkala ya"
      }
      code={"500"}
    />
  );
};

export default Error500;
