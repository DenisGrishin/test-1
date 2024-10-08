(() => {
  "use strict";
  let e = !1;
  setTimeout(() => {
    if (e) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (n) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    addEventListener("DOMContentLoaded", (e) => {
      const n = (e = 0) => {
        const n = document.querySelectorAll(".slider__item");
        0 !== n.length &&
          (n[e].classList.add("_current"),
          e - 1 < 0 || n[e - 1].classList.remove("_current"));
      };
      (() => {
        const e = document.getElementById("currentDate"),
          n = new Date();
        let t = n.getDate(),
          o = n.getMonth(),
          r = n.getDay();
        t < 10 && (t = "0" + t),
          (e.children[0].innerHTML = t),
          (e.children[1].innerHTML = `${["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"][o]},`),
          (e.children[2].innerHTML = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
          ][r]);
      })(),
        (() => {
          let e;
          function t() {
            let e = document.getElementById("clock");
            if (e) {
              let t = new Date(),
                o = t.getHours();
              o < 10 && (o = "0" + o), (e.children[0].innerHTML = o);
              let r = t.getMinutes();
              r < 10 && (r = "0" + r), (e.children[1].innerHTML = r);
              let i = t.getSeconds();
              if (
                (i < 10 && (i = "0" + i),
                (e.children[2].innerHTML = i),
                Number(o) >= 6 && Number(o) < 12)
              )
                return void n(1);
              if (Number(o) >= 12 && Number(o) < 18) return void n(2);
              if (Number(o) >= 18 && Number(o) > 0) return void n(3);
              if (Number(o) < 6 && Number(o) >= 0) return void n(0);
            }
          }
          e || (e = setInterval(t, 1e3)), t();
        })(),
        navigator.geolocation,
        console.log(navigator.geolocation);
    }),
    (window.FLS = !0),
    (function (e) {
      let n = new Image();
      (n.onload = n.onerror =
        function () {
          e(2 == n.height);
        }),
        (n.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let n = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(n);
    });
})();
