// ref : https://codepen.io/knyttneve/pen/QVqyNg
// ref: https://medium.com/@nitinpatel_20236/challenge-of-building-a-calendar-with-pure-javascript-a86f1303267d

import React from "react";
import Styled from "styled-components";
import { Month } from "../../helpers/dateTime";
import { fetchJelajah } from "../../pages/competition/actions";
import { connect } from "react-redux";
import memoize from "memoize-one";

const Year = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];
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

  &--today {
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

class CalendarBox extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    this.state = {
      current_date: date.getDate(),
      current_year: date.getFullYear(),
      current_month: date.getMonth(),
      show_set_month: false,
      show_set_year: false,
      // collection data of competition with deadline in current month and current year
      deadline_events: {},
      // collection data of competition with announcement in current month and current year
      announcement_events: {},
    };
  }

  componentDidMount() {
    // fetch competition data
    this.fetchData();
  }

  componentDidUpdate = (prevprops) => {
    this.onUpdateCompetition(this.props.competition);
  };

  // memoize handle on update props competition
  onUpdateCompetition = memoize((competition) => {
    const { current_month, current_year } = this.state;
    const filterDeadline = `deadline_${current_month}_${current_year}`;
    const deadlineData = competition[filterDeadline] || {};
    const announcementData = competition[filterDeadline] || {};
    if (deadlineData.status && !deadlineData.is_loading) {
      // transform competition data to calendar events format
      let { deadline_events, announcement_events } = this.state;

      announcementData.data.map((n) => {
        // get deadline date and month
        const announcement_date = new Date(parseInt(n.announcement_at * 1000));

        const event_filter = `${announcement_date.getFullYear()}_${announcement_date.getMonth()}_${announcement_date.getDate()}`;

        // store events in array by filter
        if (!announcement_events[event_filter])
          announcement_events[event_filter] = [];

        let found = false;

        for (let i = 0; i < announcement_events[event_filter].length; i++) {
          if (announcement_events[event_filter][i].id_competition === n.id) {
            found = true;
            break;
          }
        }

        if (!found) {
          announcement_events[event_filter].push({
            id_competition: n.id,
            link: `/competition/${n.id}/regulations/${n.nospace_title}`,
            title: n.title,
            type: "announcement",
          });
        }
      });

      deadlineData.data.map((n) => {
        // get deadline date and month
        const deadline_date = new Date(parseInt(n.deadline_at * 1000));

        const event_filter = `${deadline_date.getFullYear()}_${deadline_date.getMonth()}_${deadline_date.getDate()}`;

        // store events in array by filter
        if (!deadline_events[event_filter]) deadline_events[event_filter] = [];

        let found = false;

        for (let i = 0; i < deadline_events[event_filter].length; i++) {
          if (deadline_events[event_filter][i].id_competition === n.id) {
            found = true;
            break;
          }
        }

        if (!found) {
          deadline_events[event_filter].push({
            id_competition: n.id,
            link: `/competition/${n.id}/regulations/${n.nospace_title}`,
            title: n.title,
            type: "deadline",
          });
        }
      });

      // set state of deadline events
      this.setState({ deadline_events, announcement_events });
    }
  });

  dateGenerator() {
    // get starting day of the month
    const {
      current_month,
      current_year,
      current_date,
      deadline_events,
      announcement_events,
    } = this.state;
    const today = new Date();
    const firstday = new Date(current_year, current_month).getDay();
    const daysInMonth =
      32 - new Date(current_year, current_month, 32).getDate();

    let DateComponent = [];

    // start looping
    // create column by days
    let date = 1;
    for (let n = 0; n < 6; n++) {
      // create rows
      // creating individual cells
      for (let m = 0; m < 7; m++) {
        const key = `${n}_${m}`;

        if (n === 0 && m < firstday) {
          DateComponent.push(<div key={key} className="day day--disabled" />);
        } else if (date > daysInMonth) {
          break;
        } else {
          DateComponent.push(
            <div
              key={key}
              className={`day ${
                date === current_date &&
                today.getFullYear() === current_year &&
                today.getMonth() === current_month
                  ? "day--today"
                  : ""
              }`}
            >
              <span className="day--date">{date}</span>

              {/* events generator */}

              {/* lopping deadline competition */}
              {deadline_events[`${current_year}_${current_month}_${date}`]
                ? deadline_events[
                    `${current_year}_${current_month}_${date}`
                  ].map((n, key) => (
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
                  ))
                : null}
              {/* end of lopping deadline competition */}

              {/* lopping announcement competition */}
              {announcement_events[`${current_year}_${current_month}_${date}`]
                ? announcement_events[
                    `${current_year}_${current_month}_${date}`
                  ].map((n, key) => (
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
                  ))
                : null}
              {/* end of lopping announcement competition */}

              {/* end of event generator */}
            </div>
          );
          date++;
        }
      }
    }
    // end of loopiung

    return DateComponent;
  }

  fetchData() {
    // generate request params
    const { current_month, current_year } = this.state;
    const max_date = 32 - new Date(current_year, current_month, 32).getDate();
    const paramsDeadline = {
      min_deadline_date: `${current_year}-${current_month + 1}-1`,
      max_deadline_date: `${current_year}-${current_month + 1}-${max_date}`,
      limit: 100,
    };
    const paramsAnnouncement = {
      min_announcement_date: `${current_year}-${current_month + 1}-1`,
      max_announcement_date: `${current_year}-${current_month + 1}-${max_date}`,
      limit: 100,
    };

    const filterDeadline = `deadline_${current_month}_${current_year}`;
    const filterAnnouncement = `announcement_${current_month}_${current_year}`;
    const deadlineData = this.props.competition[filterDeadline] || {};
    const announcementData = this.props.competition[filterAnnouncement] || {};

    // request for first time
    if (!deadlineData.status && !deadlineData.is_loading) {
      this.props.dispatch(fetchJelajah(paramsDeadline, filterDeadline));
    }
    if (!announcementData.status && !announcementData.is_loading) {
      this.props.dispatch(fetchJelajah(paramsAnnouncement, filterAnnouncement));
    }
  }

  render() {
    return (
      <CalendarBoxStyled>
        <div className="calendar-container">
          {/* year and month select */}
          <div className="calendar-header">
            <div className="calendar-header_year">
              <h1>
                {Month[this.state.current_month][1].toUpperCase()}{" "}
                <button
                  onClick={() =>
                    this.setState({
                      show_set_month: !this.state.show_set_month,
                    })
                  }
                >
                  ▾
                </button>
              </h1>
              <div
                className={`calendar-header_year_select ${
                  this.state.show_set_month ? "show" : ""
                }`}
              >
                {Month.map((n, key) => {
                  return (
                    <a
                      key={key}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState(
                          {
                            current_month: key,
                            show_set_month: false,
                          },
                          () => this.fetchData()
                        );
                      }}
                    >
                      {n[1]}
                    </a>
                  );
                })}
              </div>
            </div>

            <p>
              {this.state.current_year}{" "}
              <button
                onClick={() =>
                  this.setState({ show_set_year: !this.state.show_set_year })
                }
              >
                ▾
              </button>
            </p>
            <div
              className={`calendar-header_year_select ${
                this.state.show_set_year ? "show" : ""
              }`}
            >
              {Year.map((n, key) => {
                return (
                  <a
                    key={key}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState(
                        {
                          current_year: n,
                          show_set_year: false,
                        },
                        () => this.fetchData()
                      );
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
            {this.dateGenerator()}
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
  }
}

const mapStateToProps = (state) => {
  return {
    competition: state.Kompetisi.data,
  };
};

export default connect(mapStateToProps)(CalendarBox);
