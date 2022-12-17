import React from "react";

// services
import { fetchUserDetail } from "@services/user";

// components
import SEO from "@components/meta/SEO";
import { UserDetailStyled } from "./styled";

const UserDetailPage = ({ username, serverData = {} }: any) => {
  const profile = React.useMemo(() => {
    if (serverData.profile && serverData.profile.status) {
      return serverData.profile;
    } else {
      return {};
    }
  }, [serverData]);

  const helmetData = React.useMemo(() => {
    return {
      title: `Profile ${username} di Kompetisi Id`,
      description: `Cek kompetisi yang diikuti dan di pasang oleh ${username} di halaman ini.`,
    };
  }, [username]);

  return (
    <UserDetailStyled className="profile">
      <SEO {...helmetData} />
      <div className="col-md-12 no-margin no-padding profile__cover">
        <div className="row">
          <div className="col-md-12 divider"> </div>
        </div>
        <div className="row meta-container">
          <div className="container">
            <div className="col-sm-1 col-sm-push-1 col-xs-3">
              <div className="avatar">
                <img
                  src={
                    profile.data && profile.data.avatar
                      ? profile.data.avatar.original
                      : "/assets/4.2/img/avatar-default.jpg"
                  }
                />
              </div>
            </div>
            <div className="col-sm-9 col-sm-push-1 col-xs-9">
              {profile && profile.status ? (
                profile.status == 200 ? (
                  <h3>
                    {profile.data.username}
                    &nbsp;
                    <small>
                      terdaftar {profile.data.register_date}
                      {/*terakhir login {epochToRelativeTime(profile.data.last_active)}*/}
                    </small>
                  </h3>
                ) : (
                  <h3>{profile.message}</h3>
                )
              ) : (
                <h3>
                  <i>...</i>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {profile[username] && profile.status == 200 ? (
      <UserStats data={profile.data.competition_stats} />
    ) : null} */}
    </UserDetailStyled>
  );
};

UserDetailPage.getInitialProps = async (ctx: any) => {
  const { query = {} } = ctx || {};

  const { username } = query;

  const ResponseProfile = await fetchUserDetail(username);
  return {
    username,
    serverData: {
      profile: ResponseProfile,
    },
  };
};

export default UserDetailPage;
