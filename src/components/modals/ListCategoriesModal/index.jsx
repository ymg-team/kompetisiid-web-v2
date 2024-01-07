import React from "react";
import { useRouter } from "next/router";

// @services
import { fetchCompetitionCategories } from "@services/competition";

// @components
import Modal from "@components/modals/Base";
import ListCategoriesModalStyled from "./styled";

const ListCategoriesModal = ({ main_category }) => {
  const Router = useRouter();

  const [categories, setCategories] = React.useState({});

  // === initial memos ===
  const subcategories = React.useMemo(() => {
    if (main_category && categories.status) {
      const SelCategory =
        categories.data.find((n) => n.name === main_category) || {};
      return SelCategory.subcategories || [];
    }

    return [];
  }, [main_category]);

  // === initial functions ===
  const fetchCategories = React.useCallback(async () => {
    const Res = await fetchCompetitionCategories();
    setCategories(Res);
  });

  // === initial effects ===
  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ListCategoriesModalStyled>
      {/* modal select main category */}
      <Modal id="select-main-kat">
        <div className="container">
          <div className="modal-title">
            Pilih Kategori dibawah ini
            <a
              className="btn btn-white btn-close-modal btn-sm fas fa-times"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <hr />
          {categories.status && categories.status === 200 ? (
            <ul className="vertical-menu list-categories">
              {categories.data.map((n, key) => {
                return (
                  <li key={key}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("close", "select-main-kat");
                        Router.push({
                          pathname: `/browse/${n.name}`,
                          query: {
                            ...Router.query,
                            ...{ main_category: n.name, sub_category: "" },
                          },
                        });
                      }}
                      className="text-muted"
                    >
                      {n.name}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    modal("close", "select-main-kat");
                    Router.push({
                      pathname: `/browse`,
                      query: {
                        ...Router.query,
                        ...{ main_category: "", sub_category: "" },
                      },
                    });
                  }}
                  className="text-muted"
                >
                  semua kategori
                </a>
              </li>
            </ul>
          ) : (
            "loading..."
          )}
        </div>
      </Modal>

      {/* modal to set sub category */}
      <Modal id="select-sub-kat">
        <div className="container">
          <div className="modal-title">
            Pilih sub kategori dibawah ini
            <a className="btn btn-white btn-close-modal btn-sm fas fa-times" />
          </div>
          <hr />
          <ul className="vertical-menu list-categories">
            {subcategories.length > 0 &&
              subcategories.map((n, key) => {
                return (
                  <li key={key}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        modal("close", "select-sub-kat");
                        Router.push({
                          pathname: `/browse/${main_category}/${n.name}`,
                          query: {
                            ...Router.query,
                            ...{ sub_category: n.name },
                          },
                        });
                      }}
                      className="text-muted"
                    >
                      {n.name}
                    </a>
                  </li>
                );
              })}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  modal("close", "select-sub-kat");
                  Router.push({
                    pathname: `/browse/${main_category}`,
                    query: { ...Router.query, ...{ sub_category: "" } },
                  });
                }}
                className="text-muted"
              >
                Semua Sub Kategori
              </a>
            </li>
          </ul>
        </div>
      </Modal>

      {/* modal sort-by */}
      <Modal id="sort-by">
        <div className="container">
          <div className="modal-title">
            Urutkan kompetisi berdasarkan
            <a
              className="btn btn-white btn-close-modal btn-sm fas fa-times"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <hr />
          <ul className="vertical-menu list-categories">
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  modal("close", "sort-by");
                  Router.push({
                    pathname: location.pathname,
                    query: { ...Router.query, ...{ orderby: "time_dsc" } },
                  });
                }}
                href="#"
              >
                Terbaru
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  modal("close", "sort-by");
                  Router.push({
                    pathname: location.pathname,
                    query: { ...Router.query, ...{ orderby: "prize_dsc" } },
                  });
                }}
                href="#"
              >
                Hadiah Terbesar
              </a>
            </li>
          </ul>
        </div>
      </Modal>

      {/* modal filter-by-condition */}
      <Modal id="filter-by-condition">
        <div className="container">
          <div className="modal-title">
            Status kompetisi
            <a
              className="btn btn-white btn-close-modal btn-sm fas fa-times"
              href="#"
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <hr />
          <ul className="vertical-menu list-categories">
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  modal("close", "filter-by-condition");
                  Router.push({
                    pathname: location.pathname,
                    query: { ...Router.query, ...{ condition: "all" } },
                  });
                }}
                href="#"
              >
                Semua
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  modal("close", "filter-by-condition");
                  Router.push({
                    pathname: location.pathname,
                    query: { ...Router.query, ...{ condition: "active" } },
                  });
                }}
                href="#"
              >
                Masih berlangsung
              </a>
            </li>
          </ul>
        </div>
      </Modal>
    </ListCategoriesModalStyled>
  );
};

export default ListCategoriesModal;
