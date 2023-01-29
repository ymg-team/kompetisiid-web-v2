// ref : https://codepen.io/knyttneve/pen/QVqyNg
// ref: https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d

import React from "react";
import Styled from "styled-components";
import { Month } from "../../helpers/dateTime";

// services
import { fetchCompetitions } from "@services/competition";

const Year = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];
const Days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUM'AT", "SABTU", "MINGGU"];

const CalendarBoxStyled = Styled.div`
.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(150px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 150px;
  overflow: auto;
  
  &-container {
    width: 100%;
    margin: auto;
    overflow: hidden;
    background: #fff;
    // max-width: 1200px;
  }
  
  &-header {
    text-align: center;
    padding: 20px 0;
    border-bottom: 1px solid rgba(58, 58, 58, 0.14);
    
    h1 {
      margin: 0;
      font-size: 18px;
    }
    
    p {
      margin: 5px 0 0 0;
      font-size: 13px;
      font-weight: 600;
      color: #3a3a3a;
    }

    .calendar-header_year_select {
      height: 0;
      padding: 0;
      overflow: auto;
      transition: height .5s ease, padding .5s ease;
      &.show {
        padding: 5px 0;
        height: 100px;
      }
      a {
        display: block;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
    
    button {
      background: 0;
      border: 0;
      padding: 0;
      color: rgba(#51565d, .7);
      cursor: pointer;
      outline: 0;
    }
  }
}

.day {
  border-bottom: 1px solid rgba(58, 58, 58, 0.14);
  border-right: 1px solid rgba(58, 58, 58, 0.14);
  text-align: right;
  padding: 14px 20px 14px 10px;
  letter-spacing: 1px;
  font-size: 12px;
  box-sizing: border-box;
  color: #3a3a3a;
  position: relative;
  z-index: 1;
  overflow: auto;

  &:nth-of-type(7n + 7) {
    border-right: 0;
  }

  &:nth-of-type(n + 1):nth-of-type(-n + 7) {
    grid-row: 2;
  }

  &:nth-of-type(n + 8):nth-of-type(-n + 14) {
    grid-row: 3;
  }

  &:nth-of-type(n + 15):nth-of-type(-n + 21) {
    grid-row: 4;
  }

  &:nth-of-type(n + 22):nth-of-type(-n + 28) {
    grid-row: 5;
  }

  &:nth-of-type(n + 29):nth-of-type(-n + 35) {
    grid-row: 6;
  }

  &:nth-of-type(7n + 1) {
    grid-column: 1/1;
  }

  &:nth-of-type(7n + 2) {
    grid-column: 2/2;
  }

  &:nth-of-type(7n + 3) {
    grid-column: 3/3;
  }

  &:nth-of-type(7n + 4) {
    grid-column: 4/4;
  }

  &:nth-of-type(7n + 5) {
    grid-column: 5/5;
  }

  &:nth-of-type(7n + 6) {
    grid-column: 6/6;
  }
  &:nth-of-type(7n + 7) {
    grid-column: 7/7;
  }

  &-name {
    font-size: 12px;
    text-transform: uppercase;
    color: #3a3a3a;
    text-align: center;
    border-bottom: 1px solid rgba(58, 58, 58, 0.14);
    line-height: 50px;
    font-weight: 500;
  }

  &--disabled {
    color: rgba(#98a0a6, 0.6);
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
    cursor: not-allowed;
  }

  &--Now {
    span.day--date {
      background: #4786ff;
      color: #fff;
      padding: 10px;
      border-radius: 50%;
    }
  }
}

.task {
  // border-left-width: 3px;
  // padding: 8px 12px;
  // margin: 10px;
  // border-left-style: solid;
  // font-size: 14px;
  // position: relative;
  border-left-width: 3px;
  padding: 0 5px;
  margin-bottom: 10px;
  border-left-style: solid;
  font-size: 10px;
  position: relative;
  text-align: left;

  &--warning {
    border-left-color: #fdb44d;
    grid-column: 4 / span 3;
    grid-row: 3;
    background: #fef0db;
    align-self: center;
    color: darken(#fdb44d, 12%);
    margin-top: -5px;
  }

  &--danger {
    border-left-color: #fa607e;
    // border-left-color: #fa607e;
    // margin-top: 15px;
    // background: rgba(#fdc5d0, 0.7);
    // align-self: end;
    // color: darken(#fa607e, 12%);
  }

  &--info {
    border-left-color: #4786ff;
    // grid-column: 6 / span 2;
    // grid-row: 5;
    // margin-top: 15px;
    // background: rgba(#dae7ff, 0.7);
    // align-self: end;
    // color: darken(#4786ff, 12%);
  }

  &--primary {
    background: #4786ff;
    border: 0;
    border-radius: 4px;
    grid-column: 3 / span 3;
    grid-row: 4;
    align-self: end;
    color: #fff;
    box-shadow: 0 10px 14px rgba(#4786ff, 0.4);
  }

  &__detail {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    background: #fff;
    border: 1px solid rgba(166, 168, 179, 0.2);
    color: #000;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow:0 10px 40px rgba(0,0,0,0.08);
    z-index: 2;

    &:after,
    &:before {
      bottom: 100%;
      left: 30%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:before {
      border-bottom-color: rgba(166, 168, 179, 0.2);
      border-width: 8px;
      margin-left: -8px;
    }

    &:after {
      border-bottom-color: #fff;
      border-width: 6px;
      margin-left: -6px;
    }

    h2 {
      font-size: 15px;
      margin: 0;
      color: #51565d;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
      margin-bottom: 0;
      font-weight: 500;
      color: rgba(#51565d, .7);
    }
  }
}
`;

const Now = new Date();

const CalendarBox = (props) => {
  // initial states
  const [date, setDate] = React.useState(Now.getDate());
  const [month, setMonth] = React.useState(Now.getMonth());
  const [showMonth, setShowMonth] = React.useState(false);
  const [year, setYear] = React.useState(Now.getFullYear());
  const [showYear, setShowYear] = React.useState(false);
  const [respDeadlineEvents, setRespDeadlineEvents] = React.useState({});
  const [respAnnouncementEvents, setRespAnnouncementEvents] = React.useState(
    {}
  );

  // === initial memos  ====
  const EventData = React.useMemo(() => {
    let NextDataAnnouncements = {};
    let NextDataDeadline = {};

    // generate list event of deadline
    if (respDeadlineEvents.status) {
      respDeadlineEvents.data.map((n) => {
        const DeadlineDate = new Date(parseInt(n.deadline_at * 1000));
        const Filter = `${DeadlineDate.getFullYear()}_${DeadlineDate.getMonth()}_${DeadlineDate.getDate()}`;

        // set default value
        if (!NextDataDeadline[Filter]) NextDataDeadline[Filter] = [];

        let found = false;

        for (let i = 0; i < NextDataDeadline[Filter].length; i++) {
          if (NextDataDeadline[Filter][i].id_competition === n.id) {
            found = true;
            break;
          }
        }

        if (!found) {
          NextDataDeadline[Filter].push({
            id_competition: n.id,
            link: `/competition/${
              n.id
            }/regulations/${n.nospace_title.toLowerCase()}`,
            title: n.title,
            type: "deadline",
          });
        }
      });
    }

    // generate list event of announcement
    if (respAnnouncementEvents.status) {
      respAnnouncementEvents.data.map((n) => {
        const AnnouncementDate = new Date(parseInt(n.announcement_at * 1000));
        const Filter = `${AnnouncementDate.getFullYear()}_${AnnouncementDate.getMonth()}_${AnnouncementDate.getDate()}`;

        // set default value
        if (!NextDataAnnouncements[Filter]) NextDataAnnouncements[Filter] = [];

        let found = false;

        for (let i = 0; i < NextDataAnnouncements[Filter].length; i++) {
          if (NextDataAnnouncements[Filter][i].id_competition === n.id) {
            found = true;
            break;
          }
        }

        if (!found) {
          NextDataAnnouncements[Filter].push({
            id_competition: n.id,
            link: `/competition/${
              n.id
            }/regulations/${n.nospace_title.toLowerCase()}`,
            title: n.title,
            type: "announcement",
          });
        }
      });
    }

    return {
      deadline: NextDataDeadline,
      announcement: NextDataAnnouncements,
    };
  }, [respDeadlineEvents, respAnnouncementEvents]);

  // === initial effects ===

  React.useEffect(() => {
    fetchData();
  }, [month, year]);

  const dateGenerator = React.useCallback(() => {
    // get starting day of the month
    const firstday = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    let DateComponent = [];

    // start looping
    // create column by days
    let calendarDate = 1;
    for (let n = 0; n < 6; n++) {
      // create rows
      // creating individual cells
      for (let m = 0; m < 7; m++) {
        const key = `${n}_${m}`;

        if (n === 0 && m < firstday) {
          DateComponent.push(<div key={key} className="day day--disabled" />);
        } else if (calendarDate > daysInMonth) {
          break;
        } else {
          DateComponent.push(
            <div
              key={key}
              className={`day ${
                date === calendarDate &&
                Now.getFullYear() === year &&
                Now.getMonth() === month
                  ? "day--Now"
                  : ""
              }`}
            >
              <span className="day--date">{calendarDate}</span>
              {/* events generator */}

              {/* lopping deadline competition */}
              {EventData.deadline[`${year}_${month}_${calendarDate}`] &&
                EventData.deadline[`${year}_${month}_${calendarDate}`].map(
                  (n, key) => (
                    <a
                      key={key}
                      href={n.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <section className="task task--danger">
                        Deadline {n.title}
                      </section>
                    </a>
                  )
                )}

              {/* lopping announcement competition */}
              {EventData.announcement[`${year}_${month}_${calendarDate}`] &&
                EventData.announcement[`${year}_${month}_${calendarDate}`].map(
                  (n, key) => (
                    <a
                      key={key}
                      href={n.link}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <section className="task task--info">
                        Pengumuman {n.title}
                      </section>
                    </a>
                  )
                )}
            </div>
          );
          calendarDate++;
        }
      }
    }
    // end of loopiung

    return DateComponent;
  }, [year, month, EventData]);

  const fetchData = React.useCallback(async () => {
    const MaxDate = 32 - new Date(year, month, 32).getDate();

    const QueryMinDate = `${year}-${month + 1}-1`;
    const QueryMaxDate = `${year}-${month + 1}-${MaxDate}`;

    const QueryDeadline = {
      min_deadline_date: QueryMinDate,
      max_deadline_date: QueryMaxDate,
      limit: 100,
    };
    const QueryAnnouncement = {
      min_announcement_date: QueryMinDate,
      max_announcement_date: QueryMaxDate,
      limit: 100,
    };

    const ResponseDeadline = await fetchCompetitions({ query: QueryDeadline });
    setRespDeadlineEvents(ResponseDeadline);

    const ResponseAnnouncement = await fetchCompetitions({
      query: QueryAnnouncement,
    });
    setRespAnnouncementEvents(ResponseAnnouncement);
  }, [year, month, respDeadlineEvents]);

  return (
    <CalendarBoxStyled>
      <div className="calendar-container">
        {/* year and month select */}
        <div className="calendar-header">
          <div className="calendar-header_year">
            <h1>
              {Month[month][1].toUpperCase()}{" "}
              <button onClick={() => setShowMonth(!showMonth)}>▾</button>
            </h1>
            <div
              className={`calendar-header_year_select ${
                showMonth ? "show" : ""
              }`}
            >
              {Month.map((n, key) => {
                return (
                  <a
                    key={key}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMonth(key);
                      setShowMonth(false);
                      fetchData({ month: key });
                    }}
                  >
                    {n[1]}
                  </a>
                );
              })}
            </div>
          </div>

          <p>
            {year} <button onClick={() => setShowYear(!showYear)}>▾</button>
          </p>
          <div
            className={`calendar-header_year_select ${showYear ? "show" : ""}`}
          >
            {Year.map((n, key) => {
              return (
                <a
                  key={key}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowYear(false);
                    setYear(n);
                    fetchData({ year: n });
                  }}
                >
                  {n}
                </a>
              );
            })}
          </div>
        </div>
        {/* end of year and month select */}

        <div className="calendar">
          {/* days maping */}
          {Days.map((n, key) => {
            return (
              <span key={key} className="day-name">
                {n}
              </span>
            );
          })}
          {/* end of days maping */}

          {/* date maping */}
          {dateGenerator()}
          {/* end of date maping */}

          {/* events */}
          {/* <section
        style={{ gridColumn: "2 / span 3", gridRow: 3 }}
        className="task task--danger"
      >
        Deadline kompetisi blog pertamina
      </section> */}
          {/* <section className="task task--warning">Deadline Kompetisi Blog Nintendo</section> */}
          {/* <section className="task task--primary">
        Product Checkup 1
        <div className="task__detail">
          <h2>Product Checkup 1</h2>
          <p>15-17th November</p>
        </div>
      </section> */}
          {/* <section className="task task--info">Product Checkup 2</section> */}
          {/* end of events */}
        </div>
      </div>
    </CalendarBoxStyled>
  );
};

export default CalendarBox;
