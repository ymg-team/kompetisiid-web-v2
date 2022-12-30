// components
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";

const Announcements = (props) => (
  <>
    <Spacer size="medium" />
    <HeaderDashboard
      title="Pengumuman Kompetisi"
      text="Berisi pengumuman jika terjadi perubahan peraturan, detail hadiah, atau
      hal penting lainnya pada kompetisi ini."
    />

    {props.data && props.data.length > 0 ? (
      props.data.map((n, key) => {
        return (
          <div key={key} className="announcements-list">
            {key > 0 ? <hr /> : null}
            <small className="text-muted">
              {n.tgl} oleh {n.by}
            </small>
            <br />
            {n.data}
          </div>
        );
      })
    ) : (
      <p>saat ini tidak ada pengumuman</p>
    )}
  </>
);

export default Announcements;
