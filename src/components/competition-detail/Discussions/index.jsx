import React from "react";
import { pushScript } from "@helpers/domEvents";

// components
import HeaderDashboard from "@components/headers/HeaderDashboard";
import Spacer from "@components/boxs/Spacer";

const Discussions = (props) => {
  React.useEffect(() => {
    // disquss js sdk
    pushScript("//kompetisiindonesia.disqus.com/embed.js");

    setTimeout(() => {
      resetDisqus();
    }, 1000);
  }, []);

  const resetDisqus = () => {
    if (window.DISQUS) {
      DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = `${this.props.link}`;
          this.page.url = this.props.link;
          this.callbacks.onNewComment = [
            function (comment) {
              console.log("Thanks for comment...", comment.text);
              if (window.DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true });
            },
          ];
        },
      });
    }
  };

  return (
    <>
      <Spacer size="medium" />
      <HeaderDashboard
        title="Diskusi Kompetisi"
        text="Untuk mendapatkan info lebih lanjut, mari sampaikan melalui menu diskusi
        ini. Diskusi bisa dijawab oleh peserta lain atau bahkan penyelenggara
        kompetisi sendiri."
      />
      <Spacer size="small" />
      <div id="disqus_thread" />
    </>
  );
};

export default Discussions;
