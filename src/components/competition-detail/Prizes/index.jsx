// components
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";

const Prizes = ({ html }) => (
  <>
    <Spacer size="medium" />
    <HeaderDashboard
      title="Hadiah Kompetisi"
      text=" Berikut adalah hadiah-hadiah yang bisa dimenangkan para pemenang, semoga
      beruntung"
    />
    <Spacer size="small" />
    <article>{html}</article>
  </>
);

export default Prizes;
