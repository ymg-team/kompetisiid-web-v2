let showSearch = !1,
  showNavTop = !1;

function toggleNavTop() {
  (showNavTop = !showNavTop),
    (document.getElementById("top-menu").style.left = showNavTop
      ? "0"
      : "-50%");
}

function hasClass(e, t) {
  return e.classList
    ? e.classList.contains(t)
    : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
}

function addClass(e, t) {
  e.classList ? e.classList.add(t) : hasClass(e, t) || (e.className += " " + t);
}

function removeClass(e, t) {
  if (e.classList) e.classList.remove(t);
  else if (hasClass(e, t)) {
    var s = new RegExp("(\\s|^)" + t + "(\\s|$)");
    e.className = e.className.replace(s, " ");
  }
}

function modal(e, t) {
  const s = document.getElementById(t);
  "open" == e &&
    ((document.getElementsByTagName("body")[0].style.overflow = "hidden"),
    addClass(s, "open")),
    "close" == e &&
      ((document.getElementsByTagName("body")[0].style.overflow = "auto"),
      removeClass(s, "open"));
}
document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("btn-search");
  e &&
    (e.addEventListener("click", (e) => {
      toggleSearch();
    }),
    document
      .getElementById("btn-closesearch")
      .addEventListener("click", (e) => {
        toggleSearch();
      }),
    document.getElementById("btn-show-nav").addEventListener("click", (e) => {
      toggleNavTop();
    }),
    document.getElementById("btn-hide-nav").addEventListener("click", (e) => {
      toggleNavTop();
    })),
    (window.onclick = (e) => {
      if (
        e.target.matches(".btn.btn-white.btn-close-modal.btn-sm.fas.fa-times")
      ) {
        let { id: t } = e.target.parentNode.parentNode;
        t || (t = e.target.parentNode.parentNode.parentNode.id),
          modal("close", t);
      }
      const t = document.getElementsByClassName("dropdown-items");
      for (let e = 0; e < t.length; e++) {
        let s = t[e];
        s.classList.contains("show") && s.classList.remove("show");
      }
      const s = e.target.getAttribute("data-target");
      s && document.getElementById(s).classList.toggle("show");
    });
});

// initial service worker
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    const swRegistration = await navigator.serviceWorker.register(
      "/sw.1.0.0.js",
      {
        scope: "/",
      }
    );

    return swRegistration;
  } else {
    return null;
  }
};

const main = async () => {
  // make it simple, test purpose
  await registerServiceWorker();
};

main();
