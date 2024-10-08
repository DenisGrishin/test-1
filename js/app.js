(() => {
  "use strict";
  let e = !1;
  setTimeout(() => {
    if (e) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    addEventListener("DOMContentLoaded", (e) => {
      const t = (e = 0) => {
        const t = document.querySelectorAll(".slider__item");
        0 !== t.length &&
          (t[e].classList.add("_current"),
          e - 1 < 0 || t[e - 1].classList.remove("_current"));
      };
      (() => {
        const e = document.getElementById("currentDate"),
          t = new Date();
        let n = t.getDate(),
          r = t.getMonth(),
          i = t.getDay();
        n < 10 && (n = "0" + n),
          (e.children[0].innerHTML = n),
          (e.children[1].innerHTML = `${["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"][r]},`),
          (e.children[2].innerHTML = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
          ][i]);
      })(),
        (() => {
          let e;
          function n() {
            let e = document.getElementById("clock");
            if (e) {
              let n = new Date(),
                r = n.getHours();
              r < 10 && (r = "0" + r), (e.children[0].innerHTML = r);
              let i = n.getMinutes();
              i < 10 && (i = "0" + i), (e.children[1].innerHTML = i);
              let o = n.getSeconds();
              if (
                (o < 10 && (o = "0" + o),
                (e.children[2].innerHTML = o),
                Number(r) >= 6 && Number(r) < 12)
              )
                return void t(1);
              if (Number(r) >= 12 && Number(r) < 18) return void t(2);
              if (Number(r) >= 18 && Number(r) > 0) return void t(3);
              if (Number(r) < 6 && Number(r) >= 0) return void t(0);
            }
          }
          e || (e = setInterval(n, 1e3)), n();
        })(),
        navigator.geolocation.getCurrentPosition(function (e) {});
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    });
})();
