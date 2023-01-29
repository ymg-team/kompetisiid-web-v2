// components
import CompetitionList from "@components/cards/_manage/CompetitionList";

const DUMMY = {
  id: "2",
  title: "sdsdsd",
  author: {
    username: "author",
  },
  updated_at: 2000,
  main_category: {
    name: "main category",
  },
  sub_category: {
    name: "sub_category",
  },
  content: "this is content",
  stats: {
    views: 0,
  },
};

const CompetitionBox = ({ data, type }) => {
  return (
    <>
      {data.map((n, key) => (
        <CompetitionList key={key} {...{ n, type }} />
      ))}
    </>
  );
};

CompetitionBox.defaultProps = {
  data: [DUMMY, DUMMY, DUMMY, DUMMY, DUMMY],
  type: "as-participant",
};

export default CompetitionBox;
