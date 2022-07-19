const CompetitionDetailPage = ({ id, type, title }) => {
  return (
    <p>
      this is competition detail page {id} {type} {title}
    </p>
  );
};

CompetitionDetailPage.getInitialProps = ({ query }) => {
  const { id, type, title } = query;

  return {
    id,
    type,
    title,
  };
};

export default CompetitionDetailPage;
