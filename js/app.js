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
          r = n.getMonth(),
          i = n.getDay();
        t < 10 && (t = "0" + t),
          (e.children[0].innerHTML = t),
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
          function t() {
            let e = document.getElementById("clock");
            if (e) {
              let t = new Date(),
                r = t.getHours();
              r < 10 && (r = "0" + r), (e.children[0].innerHTML = r);
              let i = t.getMinutes();
              i < 10 && (i = "0" + i), (e.children[1].innerHTML = i);
              let o = t.getSeconds();
              if (
                (o < 10 && (o = "0" + o),
                (e.children[2].innerHTML = o),
                Number(r) >= 6 && Number(r) < 12)
              )
                return void n(1);
              if (Number(r) >= 12 && Number(r) < 18) return void n(2);
              if (Number(r) >= 18 && Number(r) > 0) return void n(3);
              if (Number(r) < 6 && Number(r) >= 0) return void n(0);
            }
          }
          e || (e = setInterval(t, 1e3)), t();
        })(),
        navigator.geolocation.getCurrentPosition(function (e) {
          console.log(e);
        });
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
