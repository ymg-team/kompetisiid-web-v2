import PropTypes from "prop-types";

// components
import SubmissionListStyled from "./styled";
import Label from "@components/Label";
import Link from "next/link";

// helpers
import { epochToDMYHIS } from "@helpers/dateTime";
import { useRouter } from "next/router";

const LABEL_COLORS = {
  checking: "yellow",
  valid: "green",
  won: "blue",
  failed: "red",
};

const SubmissionList = ({
  data,
  onView,
  onDelete,
  type,
  isCompetitionEnded,
}) => {
  const Router = useRouter();

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
          {/* button action for type === competition-detail */}
          {type === "competition-detail" && (
            <>
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
              {/* can't delete submission if competition ended */}
              {!isCompetitionEnded && (
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
              )}
            </>
          )}

          {/* button action for type === manage */}
          {type === "manage" && (
            <>
              <div className="dropdown">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="fa fa-ellipsis-h dropdown-button btn btn-white btn-transparent"
                  data-target={`action-competition-${data.id}`}
                  style={{ fontSize: 25, padding: "5px 10px" }}
                />
                <div
                  className="dropdown-items"
                  id={`action-competition-${data.id}`}
                >
                  <ul>
                    <li>
                      <Link
                        href={`/competition/${data.competition.id}/submission/${data.competition.nospace_title}`}
                      >
                        <a>Lihat / Edit</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
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
  type: "competition-detail",
  setState: () => {},
  isCompetitionEnded: false,
};

SubmissionList.propTypes = {
  type: PropTypes.oneOf(["competition-detail", "manage"]),
};

export default SubmissionList;
