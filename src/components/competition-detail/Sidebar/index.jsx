import { nominalToText } from "@helpers/number";
import { epochToDMY, epochToRelativeTime } from "@helpers/dateTime";

// components
import MediaPartnerAds from "@components/cards/MediaPartnerAds";
import GAds from "@components/cards/GoogleAds";
import Label from "@components/Label";

const Sidebar = ({ data, submissionFields }) => {
  return (
    <div className="col-sm-4">
      <div className="competition-detail--meta">
        <progress value={30} max={100} />
        <h3 className="total-prize">
          <strong>{nominalToText(data.competition.prize.total)}</strong>
          <small className="text-muted">total hadiah</small>
        </h3>
        <h3 className="total-view">
          {data.competition.stats.views}
          <small className="text-muted">kunjungan</small>
        </h3>
        <h3 className="total-view">
          {epochToRelativeTime(data.competition.deadline_at)}
          <small className="text-muted">{`Deadline (${epochToDMY(
            data.competition.deadline_at
          )})`}</small>
        </h3>
        <h3 className="total-view">
          {epochToRelativeTime(data.competition.announcement_at)}
          <small className="text-muted">{`Pengumuman (${epochToDMY(
            data.competition.announcement_at
          )})`}</small>
        </h3>
        {submissionFields.open_registration_at && (
          <h3 className="total-view">
            {epochToRelativeTime(submissionFields.open_registration_at)}
            <small className="text-muted">{`Pendaftaran dibuka (${epochToDMY(
              submissionFields.open_registration_at * 1000
            )})`}</small>
          </h3>
        )}
      </div>
      <hr />
      <h4>Kompetisi ini bersifat</h4>
      {data.competition.is_guaranted && (
        <Label
          type="gray"
          title="kompetisi sudah diverifikasi keberadaannya oleh kru KI"
          text="Garansi"
        />
      )}
      {data.competition.is_mediapartner && (
        <Label
          type="gray"
          title="KI berlaku sebagai media partner di kompetisi ini"
          text="Media Partner"
        />
      )}
      {data.competition.is_manage && (
        <Label
          type="gray"
          title="kompetisi ini bisa diikuti melalui KI"
          text="Manage on KI"
        />
      )}
      <br />
      <br />

      {/* media parner ads */}
      <MediaPartnerAds size="square" noads={true} />

      {/* GAds */}
      <GAds style={{ margin: 0 }} adSlot={9209398500} timeout={1000} />
      {/* end of GAds */}
    </div>
  );
};

Sidebar.defaultProps = {
  data: {},
  submissionFields: {},
};

export default Sidebar;
