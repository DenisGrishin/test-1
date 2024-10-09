/******/ (() => {
  // webpackBootstrap
  /******/ "use strict"; // ./src/js/files/script.js

  addEventListener("DOMContentLoaded", (event) => {
    // переключатель слайд
    const switchSlide = (cuurentSlide = 0) => {
      const slides = document.querySelectorAll(".slider__item");

      if (slides.length === 0) return;

      slides[cuurentSlide].classList.add("_current");

      if (cuurentSlide - 1 < 0) {
        return;
      }
      slides[cuurentSlide - 1].classList.remove("_current");
    };
    // часы
    const initOclock = () => {
      let timerId;
      // обновялем каждую секунду
      function update() {
        let clock = document.getElementById("clock");
        if (clock) {
          let date = new Date();

          let hours = date.getHours();
          if (hours < 10) hours = "0" + hours;
          clock.children[0].innerHTML = hours;

          let minutes = date.getMinutes();
          if (minutes < 10) minutes = "0" + minutes;
          clock.children[1].innerHTML = minutes;

          let seconds = date.getSeconds();
          if (seconds < 10) seconds = "0" + seconds;
          clock.children[2].innerHTML = seconds;

          if (Number(hours) >= 6 && Number(hours) < 12) {
            switchSlide(1);
            return;
          }
          if (Number(hours) >= 12 && Number(hours) < 18) {
            switchSlide(2);
            return;
          }
          if (Number(hours) >= 18 && Number(hours) > 0) {
            switchSlide(3);
            return;
          }
          if (Number(hours) < 6 && Number(hours) >= 0) {
            switchSlide(0);
            return;
          }
        }
      }
      // старт часы
      function clockStart() {
        if (!timerId) {
          timerId = setInterval(update, 1000);
        }
        update();
      }

      clockStart();
    };
    // Дата
    const initDate = () => {
      const monthArr = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];

      const weekDayArr = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
      ];
      const currentDate = document.getElementById("currentDate");
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let weekDay = date.getDay();

      if (day < 10) day = "0" + day;
      currentDate.innerHTML = `${day} ${monthArr[month]}, ${weekDayArr[weekDay - 1]}`;
    };
    //  получаем ГЕО
    const getGeoLocation = () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
        }
      });
    };
    // показываеи результат API
    const setResult = (dataWeather) => {
      const definitionWeather = {
        clear: "Ясный",
        partlyCloudy: "Переменная облачность",
        cloudy: "Облачный",
        rain: "Дождь",
        snow: "Снег",
        thunderstorm: "Гроза ",
        thunderstormWithRain: "Гроза с дождем",
      };
      const infoWeather = document.getElementById("infoweather");

      if (infoWeather) {
        infoWeather.innerHTML = `${dataWeather[0].temp2m.max}°C,  ${definitionWeather[dataWeather[0].weather]}`;
      }
    };
    // получаем данные погоды
    const getWeatherCity = () => {
      const lon = localStorage.getItem("longitudea") || "38.59";
      const lat = localStorage.getItem("latitudea") || "45.02";
      const infoWeather = document.getElementById("infoweather");
      infoWeather.classList.add("_preloader");

      fetch(
        `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`,
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setResult(data.dataseries);
          infoWeather.classList.remove("_preloader");
        })
        .catch((err) => {
          infoWeather.classList.remove("_preloader");
          console.error(err);
        });
    };
    // список задач
    const initTodo = () => {
      const input = document.getElementById("inputTask");
      const labaleInput = document.querySelector(".input-task__label");
      let listTask = document.querySelector(".tasks__list");

      // получаем Value
      const getValueInput = () => {
        if (input) {
          input.addEventListener("keyup", (e) => {
            toggleError("#fff", "Какае ваши цели на сегодня?");

            if (input.value === "" && e.key === "Enter") {
              toggleError("red", "Напишите задачу");
              return;
            }
            if (e.key === "Enter") {
              createTask(input.value.trim());
              input.value = "";
            }
          });
        }
        // вкл/выкл ошибка
        const toggleError = (color, text) => {
          input.style.borderColor = color;
          labaleInput.innerText = text;
          labaleInput.style.color = color;
        };
      };
      // создаем задачу
      function createTask(value) {
        const randomId = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;

        if (listTask) {
          listTask.insertAdjacentHTML(
            "beforeend",
            `<li class="tasks__item" data-id="${randomId}"><label class="tasks__label"><input class="tasks__check" type="checkbox"><span
									class="tasks__text">${value}</span></label><button class="tasks__del" type="button"><img
									src="img/del.svg" alt="Удалить"></button></li>`,
          );
        }
      }
      // удалить задачу
      function delTask() {
        if (document.querySelectorAll(".tasks__item")) {
          listTask.addEventListener("click", (e) => {
            let target = e.target;

            if (target.closest(".tasks__del")) {
              let idTask =
                target.closest(".tasks__del").parentElement.dataset.id;

              document.querySelectorAll(".tasks__item").forEach((task) => {
                if (idTask === task.dataset.id) {
                  listTask.removeChild(task);
                }
              });
            }
          });
        }
      }
      // удалить выполненные задачи
      const removeCheckedTasks = () => {
        const btnRemoveCheckeds = document.querySelector(".tasks__checked-del");
        if (document.querySelectorAll(".tasks__item")) {
          btnRemoveCheckeds.addEventListener("click", function (e) {
            const tasks = document.querySelectorAll(".tasks__item");

            tasks.forEach((task) => {
              if (task.querySelector(".tasks__check").checked) {
                listTask.removeChild(task);
              }
            });
          });
        }
      };
      // фильтра задач
      const filterTasks = () => {
        const btnFilter = document.querySelector(".task__filter");
        btnFilter.addEventListener("click", function (e) {
          const tasks = document.querySelectorAll(".tasks__item");

          let checekdTasks = [];
          let notChecekdTasks = [];

          for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (task.querySelector(".tasks__check").checked) {
              checekdTasks.push(task);
            } else {
              notChecekdTasks.push(task);
            }
          }

          let newList = [...checekdTasks, ...notChecekdTasks];

          for (const element of newList) {
            listTask.appendChild(element);
          }
        });
      };

      filterTasks();
      removeCheckedTasks();
      delTask();
      getValueInput();
    };

    initTodo();
    initDate();
    initOclock();
    getGeoLocation();
    getWeatherCity();
  }); // ./src/js/app.js

  //============================================================================================================================================================================================================================================

  /******/
})();
