import FullPageError from "~/src/components/boxs/FullPageError";

const Error404 = () => {
  return (
    <FullPageError
      message={"Halaman yang anda kunjungi tidak ditemukan"}
      code={"404"}
    />
  );
};

export default Error404;
