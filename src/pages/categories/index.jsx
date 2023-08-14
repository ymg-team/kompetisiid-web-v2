import React, { Component } from "react";

// services
import { fetchCompetitionCategories } from "@services/competition";

// components
import Link from "next/link";
import SEO from "@components/meta/SEO";
import Subheader from "@components/Subheader";
import Loader from "@components/preloaders/GlobalLoader";

const Meta = {
  title: "Kategori Kompetisi",
  description: "Ikuti kompetisi-kompetisi berdasarkan kategori dan minat kamu",
};

const CategoriesPage = ({ serverData }) => {
  console.log("serverData", serverData);

  // === initial functions ===
  const generateList = () => {
    if (serverData.categories.status === 200) {
      return (
        <div className="col-md-12">
          <div className="container">
            {serverData.categories.data.map((n, key) => {
              return (
                <div key={key} className="categories">
                  <h2>{n.name}</h2>
                  <div className="categories-child">
                    {n.subcategories.map((m, key) => (
                      <Link
                        legacyBehavior
                        key={key}
                        href={`/browse/${n.name}/${m.name}`}
                      >
                        <a>
                          {m.name}
                          <i className="fa fa-angle-right" />
                        </a>
                      </Link>
                    ))}
                    <Link legacyBehavior href={`/browse/${n.name}`}>
                      <a>
                        Semua {n.name}
                        <i className="fa fa-angle-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="align-center text-muted">
          <p>{serverData.categories.message}</p>
        </div>
      );
    }
  };

  return (
    <>
      <SEO {...Meta} />
      <Subheader {...Meta} title={Meta.title} desc={Meta.description} />
      <div className="col-md-12">
        <div className="m-30" />
      </div>
      {serverData.categories.status ? generateList() : <Loader />}
      <div className="col-md-12">
        <div className="m-30" />
      </div>
    </>
  );
};

CategoriesPage.getInitialProps = async () => {
  const ResponseCategories = await fetchCompetitionCategories();

  return {
    serverData: {
      categories: ResponseCategories,
    },
  };
};

export default CategoriesPage;
