import React from "react";
import { epochToRelativeTime } from "../../../helpers/dateTime";

// components
import Link from "next/link";
import Label from "../../Label";

const NewsListCard = (props) => {
  const { data } = props;
  return (
    <div className="competition-items">
      <div className="item">
        <div className="item__left">
          <h4>
            <Link href={`/super/news/${data.id}`}>
              <a>{data.title}</a>
            </Link>
          </h4>
          <p>
            <span>Dipost {epochToRelativeTime(data.created_at)} hari lalu</span>{" "}
            oleh {data.author.username}
          </p>
          {data.is_draft ? <Label type="gray">draft</Label> : null}
        </div>

        <div className="item__right">
          {/* dropdown menus */}
          <div className="item__right-item">
            <div className="dropdown">
              <a
                className="btn btn-sm dropdown-button text-muted fa fa-ellipsis-v"
                title="options"
                href="#"
                onClick={(e) => e.preventDefault()}
                data-target={`menu-${data.id}`}
              />
              <div className="dropdown-items" id={`menu-${data.id}`}>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href={`/news/${data.id}/${data.nospace_title}`}
                      rel="noreferrer noopener"
                    >
                      Preview
                    </a>
                  </li>
                  <li>
                    <Link href={`/super/news/${data.id}`}>
                      <a>Ubah</a>
                    </Link>
                  </li>
                  <li>
                    <a onClick={(e) => e.preventDefault()} href="#">
                      Hapus
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* end of dropdown menus */}
        </div>
      </div>
    </div>
  );
};

export default NewsListCard;
