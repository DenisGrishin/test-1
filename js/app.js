/******/ (() => {
  // webpackBootstrap
  /******/ "use strict"; // ./src/js/files/script.js

  addEventListener("DOMContentLoaded", (event) => {
    // переключатель слайд
    const switchSlide = (cuurentSlide = 0) => {
      const slides = document.querySelectorAll(".slider__item");

      if (slides.length !== 0) {
        if (cuurentSlide === 0) {
          slides[cuurentSlide].classList.add("_current");
          slides[slides.length - 1].classList.remove("_current");
          return;
        }

        slides[cuurentSlide].classList.add("_current");
        slides[cuurentSlide - 1].classList.remove("_current");
      }
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
          clock.children[0].textContent = hours;

          let minutes = date.getMinutes();
          if (minutes < 10) minutes = "0" + minutes;
          clock.children[1].textContent = minutes;

          let seconds = date.getSeconds();
          if (seconds < 10) seconds = "0" + seconds;
          clock.children[2].textContent = seconds;

          if (Number(hours) < 6 && Number(hours) >= 0) {
            switchSlide(0);
            return;
          }
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
      currentDate.textContent = `${day} ${monthArr[month]}, ${weekDayArr[weekDay - 1]}`;
    };

    //  получаем ГЕО
    const getGeoLocation = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        if (latitude && longitude) {
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`,
            );

            const { city } = await res.json();
            document.querySelector(".info-block__city").textContent = city;
          } catch (error) {
            console.error(error);
          }
        }
      });
    };
    // показываеи результат API
    const setResultWeather = (dataWeather) => {
      const infoWeather = document.getElementById("infoweather");
      const now = new Date();
      const hours = now.getHours();
      const timeOfDay = hours >= 21 && hours > 6;

      const definitionWeather = {
        clear: timeOfDay ? "Ясная ночь" : "Ясный день",
        pcloudy: "Переменная облачность",
        mcloudy: "Пасмурно",
        cloudy: "Облачно",
        humid: "Высокая влажность",
        lightrain: "Мелкий дождь, облочно",
        oshower: "Мелкий дождь, частично облочно",
        ishower: "Мелкий дождь, преимущественно ясно",
        lightsnow: "Небольшой снег",
        rain: "Дождь ",
        snow: "Снег",
        rainsnow: "Дождь со снегом",
        ts: "Мелкий дождь,вероятно гроза",
        tsrain: "Дождь, с грозой",
      };

      if (infoWeather) {
        infoWeather.textContent = `${timeOfDay ? dataWeather[0].temp2m.min : dataWeather[0].temp2m.max}°C,  ${definitionWeather[dataWeather[0].weather]}`;
      }
    };

    // получаем данные погоды
    const getWeather = () => {
      const lon = localStorage.getItem("longitudea") || "38.59";
      const lat = localStorage.getItem("latitudea") || "45.02";
      const infoWeather = document.getElementById("infoweather");
      infoWeather.classList.add("_preloader");

      fetch(
        `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`,
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setResultWeather(data.dataseries);
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
      let listTask = document.querySelector(".todo__list");
      const taskBody = document.querySelector(".todo__body");

      // получаем Value c input
      const addTask = () => {
        if (input) {
          input.addEventListener("keyup", (e) => {
            toggleError("#fff", "Какае ваши цели на сегодня?");

            if (input.value === "" && e.key === "Enter") {
              toggleError("red", "Напишите задачу");

              return;
            }
            if (e.key === "Enter") {
              tasksListHieht();

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
            `<li class="todo__item" data-id="${randomId}"><label class="todo__label"><input class="todo__check" type="checkbox"><span
									class="todo__text">${value}</span></label><button class="todo__del" type="button"><img
									src="img/del.svg" alt="Удалить"></button></li>`,
          );
          toggleTasksList();
        }
      }
      // удалить задачу
      function delTask() {
        if (document.querySelectorAll(".todo__item")) {
          listTask.addEventListener("click", (e) => {
            let target = e.target;

            if (target.closest(".todo__del")) {
              let idTask =
                target.closest(".todo__del").parentElement.dataset.id;

              document.querySelectorAll(".todo__item").forEach((task) => {
                if (idTask === task.dataset.id) {
                  listTask.removeChild(task);
                  tasksListHieht();
                  toggleTasksList();
                }
              });
            }
          });
        }
      }
      // удалить выполненные задачи
      const removeCheckedTasks = () => {
        const btnRemoveCheckeds = document.querySelector(".todo__checked-del");
        if (document.querySelectorAll(".todo__item")) {
          btnRemoveCheckeds.addEventListener("click", function (e) {
            const tasks = document.querySelectorAll(".todo__item");

            tasks.forEach((task) => {
              if (task.querySelector(".todo__check").checked) {
                listTask.removeChild(task);
                tasksListHieht();
                toggleTasksList();
              }
            });
          });
        }
      };
      // фильтра задач
      const filterTasks = () => {
        const btnFilter = document.querySelector(".todo__filter");
        if (btnFilter) {
          btnFilter.addEventListener("click", function (e) {
            const tasks = document.querySelectorAll(".todo__item");

            let checekdTasks = [];
            let notChecekdTasks = [];

            for (let i = 0; i < tasks.length; i++) {
              const task = tasks[i];

              if (task.querySelector(".todo__check").checked) {
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
        }
      };
      // регултрует высоту  списка, от кол-во задач
      const tasksListHieht = () => {
        if (taskBody.offsetHeight >= window.innerHeight - 50) {
          listTask.style.overFlowY = "auto";
          listTask.style.maxHeight = window.innerHeight - 213 + "px";
          return;
        }

        listTask.style.minHeight = 100 + "%";
        const heightList = listTask.offsetHeight;

        listTask.style.minHeight = heightList + "px";
      };
      // скрыть/показать список задач
      const toggleTasksList = () => {
        if (listTask.children.length === 0) {
          taskBody.classList.remove("_show");
          return;
        }
        taskBody.classList.add("_show");
      };

      filterTasks();
      removeCheckedTasks();
      delTask();
      addTask();
    };

    initTodo();
    initDate();
    initOclock();
    getGeoLocation();
    getWeather();
  }); // ./src/js/app.js

  //============================================================================================================================================================================================================================================

  /******/
})();
