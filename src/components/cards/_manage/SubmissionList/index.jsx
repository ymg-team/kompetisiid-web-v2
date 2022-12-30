import SubmissionListStyled from "./styled";
import Label from "@components/Label";

// helpers
import { epochToDMYHIS } from "@helpers/dateTime";

const LABEL_COLORS = {
  checking: "yellow",
  valid: "green",
  won: "blue",
  failed: "red",
};

const SubmissionList = ({ data, onView, onDelete }) => {
  return (
    <SubmissionListStyled>
      <div className="submission-list__header">
        <div>
          <Label type={LABEL_COLORS[data.status]} size="medium" noMargin>
            {/* <i className="fa fa-check" />  */}
            &nbsp;{data.status.toUpperCase()}&nbsp;
          </Label>
        </div>
        <div>
          <a
            title="View submission"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onView({ id: data.id });
            }}
            style={{ marginRight: 10 }}
          >
            <span className="far fa-eye" />
          </a>
          <a
            title="Hapus submission"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onDelete({ id: data.id });
            }}
          >
            <span className="fas fa-times" />
          </a>
        </div>
      </div>
      <div className="submission-list__body">
        <p style={{ display: "flex", alignItems: "center" }}>
          <strong>Submitted at:&nbsp;&nbsp;</strong>{" "}
          {epochToDMYHIS(data.submitted_at * 1000)}
        </p>
        <p style={{ display: "flex", alignItems: "center" }}>
          <strong>Last Updated:&nbsp;&nbsp;</strong>{" "}
          {epochToDMYHIS(data.updated_at * 1000)}
        </p>
        {data.notes && (
          <p>
            <strong>Notes: </strong>
            {data.notes}
          </p>
        )}
      </div>

      {/*      
      <Label type="green" size="small">
        <i className="fa fa-check" /> Checked
      </Label> */}
    </SubmissionListStyled>
  );
};

SubmissionList.defaultProps = {
  data: {},
  setState: () => {},
};

export default SubmissionList;
