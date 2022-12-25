// helpers
import { generateLink } from "@helpers/linkGenerator";

// components
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";

const Type = [
  { icon: "" },
  { icon: "fas fa-globe-asia" },
  { icon: "fab fa-facebook" },
  { icon: "fab fa-twitter-square" },
  { icon: "fab fa-instagram" },
  { icon: "fab fa-google-plus" },
  { icon: "fas fa-envelope-square" },
  { icon: "fas fa-map" },
  { icon: "fab fa-youtube-square" },
  { icon: "fas fa-phone-square" },
];

const Contacts = (props) => (
  <>
    <Spacer size="medium" />
    <HeaderDashboard
      title="Kontak Kompetisi"
      text="Ada pertanyaan atau ingin info lebih lanjut langsung dari penyelenggara,
      silahkan sampaikan melalui kontak dibawah ini."
    />
    {props.data && props.data.length > 0 ? (
      props.data.map((n, key) => {
        return (
          <p key={key}>
            <i className={Type[n.type].icon} />{" "}
            {[1, 2, 3, 4, 8].includes(parseInt(n.type))
              ? generateLink(n.value, "_blank")
              : n.value}
          </p>
        );
      })
    ) : (
      <p>kontak tidak tersedia</p>
    )}
  </>
);

export default Contacts;
