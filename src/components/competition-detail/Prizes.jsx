import React from "react";

const Prizes = ({ html }) => (
  <React.Fragment>
    <h2>Hadiah kompetisi</h2>
    <p className="text-muted">
      Berikut adalah hadiah-hadiah yang bisa dimenangkan para pemenang, semoga
      beruntung
    </p>
    <hr />
    <article>{html}</article>
  </React.Fragment>
);

export default Prizes;
