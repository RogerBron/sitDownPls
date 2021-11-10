window.addEventListener('DOMContentLoaded', function() {
  // функция добавления ярлыков
  function elementCreator(classArray, type, text) {
    const element = document.createElement(type);
    element.classList.add(...classArray);
    element.innerText = text;
    return element;
  };

  // Выбор города
  const element = document.querySelector('.city__selector');
  const choices1 = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
    placeholder: true,
    itemSelectText: '',
  });

  // стилизация поиска в header
  const searchInput = document.querySelector('.search__input');
  const searchButton = document.querySelector('.search__button');
  searchInput.addEventListener('input', function() {
    if (searchInput.value.trim().length > 0) {
      searchInput.classList.add('search__input_active');
      searchButton.classList.remove('search__button_disabled');
      searchButton.removeAttribute('disabled');
    } else {
      searchInput.classList.remove('search__input_active');
      searchButton.classList.add('search__button_disabled');
      searchButton.setAttribute('disabled', '');
    };
  });

  // выбор в поиске
  const element2 = document.querySelector('.search__selector');
  const choices2 = new Choices(element2, {
    searchEnabled: false,
    shouldSort: false,
    placeholder: true,
    itemSelectText: '',
  });

  // бургер
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const close = document.querySelector('.menu__close');
  burger.addEventListener('click', function() {
    menu.classList.add('header__menu_active');
  });
  close.addEventListener('click', function() {
    menu.classList.remove('header__menu_active');
  });

  // слайдер Hero
  if (document.querySelector('.hero__swiper')) {
    // задаем длительность задержки
    const delayTime = 3000
    let root = document.documentElement;
    root.style.setProperty('--animationTime', `${delayTime}ms`);
    root.style.setProperty('--animationDelay', `${delayTime/2}ms`);
    const swiper = new Swiper('.hero__swiper', {
      loop: true,
      autoplay: {
        delay: delayTime,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  };

  // слайдер Special
  if (document.querySelector('.special__slider')) {
    const swiper1 = new Swiper('.special__slider', {
      loop: false,
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 32,

      wrapperClass: 'slider__wrapper',
      navigation: {
        nextEl: '.slider__next',
        prevEl: '.slider__prev',
      },

      breakpoints: {
        722: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 0,
        },
        981: {
          slidesPerGroup: 3,
          slidesPerView: 'auto',
          slidesPerGroupAuto: true,
          spaceBetween: 0,
        }
      },
    });
  };

  // переписывание атрибута кнопок на русский язык для доступности
  if (document.querySelector('.slider__next')) {
    const nextBtnSpecial = document.querySelector('.slider__next');
    nextBtnSpecial.setAttribute('aria-label', 'Следующий слайд');
  };

  if (document.querySelector('.slider__prev')) {
    const prevBtnSpecial = document.querySelector('.slider__prev');
    prevBtnSpecial.setAttribute('aria-label', 'Предыдущий слайд');
  };

  // Кнопка смотреть больше
  if (document.querySelector('.rate__button')) {
    const rateBtn = document.querySelector('.rate__button');
    rateBtn.addEventListener('click', function() {
      document.querySelectorAll('.grid__item').forEach(function(deletion) {
        deletion.style.display = "list-item";
      });
      rateBtn.remove();
    });
  };

  // слайдер Полезное
  if (document.querySelector('.useful__swiper')) {
    const swiper3 = new Swiper('.useful__swiper', {
      loop: false,
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 32,

      wrapperClass: 'notes__wrapper',
      navigation: {
        nextEl: '.notes__next',
        prevEl: '.notes__prev',
      },

      breakpoints: {
        722: {
          slidesPerGroup: 1,
          slidesPerView: 2,
          spaceBetween: 32,
        },
        981: {
          slidesPerGroup: 1,
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1353: {
          slidesPerGroup: 1,
          slidesPerView: 2,
          spaceBetween: 32,
        }
      },
    });
  };


  // переписывание атрибута кнопок на русский язык для доступности
  if (document.querySelector('.notes__next')) {
    const nextBtnUseful = document.querySelector('.notes__next');
    nextBtnUseful.setAttribute('aria-label', 'Следующий слайд');
  };

  if (document.querySelector('.notes__prev')) {
    const prevBtnUseful = document.querySelector('.notes__prev');
    prevBtnUseful.setAttribute('aria-label', 'Предыдущий слайд');
  };


  // TOOLTIP
  if (document.getElementById("tt1")) {
    tippy('#tt1', {
      content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
      interactive: true,
      maxWidth: 157,
    });
  };

  // маскирование телефона]
  if (document.getElementById("user_phone")) {
    var selector = document.getElementById("user_phone");
    var im = new Inputmask("+7(999) 999-99-99");
    im.mask(selector);
  };

  // валидация формы обратной связи
  if (document.querySelector('.feedback')) {
    new JustValidate('.feedback', {
      rules: {
        name: {
          required: true,
          minLength: 3,
          maxLength: 30,
          strength: {
            custom: '[А-Яа-яЁё ]'
          },
        },

        tel: {
          required: true,
          function: (name, value) => {
            const phone = selector.inputmask.unmaskedvalue()

            return Number(phone) && phone.length ===10
          },
        },

        email: {
          required: true,
          email: true,
        },

        checkbox: {
          required: true,
        },
      },
      messages: {
        name: {
          minLength: 'Имя должно содержать от 3 до 30 символов',
          maxLength: 'Имя не должно превышать 30 символов',
          required: 'Введите имя',
          strength: 'Недопустимый формат'
        },
        tel: 'Введите корректный номер телефона',
        email: 'Введите корректный e-mail',
        checkbox: 'Необходимо принять пользовательское соглашение'
      },
      colorWrong: '#FF6972',

      submitHandler: function(form) {
        // отправка с главной страницы
        if (document.querySelector('.we__modal')) {
          let formData = new FormData(form);
          let xhr = new XMLHttpRequest();

          xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
          xhr.send(formData);
          xhr.onload = function() {
            if (xhr.status === 201) {
              $('#success').modal();
            } else {
              alert('Что-то пошло не так!');
            };
          };
        };

        // отправка из модального окна "купить в один клик" с карточки товара
        if (document.querySelector('.buy')) {
          let formData = new FormData(form);
          let xhr = new XMLHttpRequest();

          xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
          xhr.send(formData);
          xhr.onload = function() {
            if (xhr.status === 201) {
              // вызов новой модалки, что сообщение успешно отправлено
              $('#success').modal();
            } else {
              alert('Что-то пошло не так!');
            };
          };
        };
      },
    });
  };

  // подсветка инпута
  if (document.querySelector('.feedback__input')) {
    const userName = document.querySelector('.feedback__input_name');
    userName.addEventListener('input', function() {
      if (userName.value.trim().length < 2 && userName.value.trim().length > 30 || userName.value.trim().match(/[^а-яА-Я ]/)) {
        userName.classList.add('feedback__input_invalid');
        userName.classList.remove('feedback__input_valid');
      } else if(userName.value.trim().length > 2 && userName.value.trim().length < 30 && userName.value.trim().match(/[а-яА-Я ]/)) {
        userName.classList.add('feedback__input_valid');
        userName.classList.remove('feedback__input_invalid');
      };
    });

    const userPhone = document.querySelector('.feedback__input_phone');
    userPhone.addEventListener('input', function() {
      if (userPhone.value.match(/_/)) {
        userPhone.classList.add('feedback__input_invalid');
        userPhone.classList.remove('feedback__input_valid');
      } else {
        userPhone.classList.add('feedback__input_valid');
        userPhone.classList.remove('feedback__input_invalid');
      }
    });

    if (document.querySelector('.feedback__input_mail')) {
      const userEmail = document.querySelector('.feedback__input_mail');
      userEmail.addEventListener('input', function() {
        if (userEmail.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
          userEmail.classList.add('feedback__input_valid');
          userEmail.classList.remove('feedback__input_invalid');
        } else {
          userEmail.classList.add('feedback__input_invalid');
          userEmail.classList.remove('feedback__input_valid');
        }
      });
    }
  };

  // свайпер каталога
  if (document.querySelector('.catalog__swiper')) {
    const swiperCatalog = new Swiper('.catalog__swiper', {
      slidesPerView: 2,
      slidesPerColumn: 3,
      slidesPerGroup: 2,
      spaceBetween: 16,
      grid: {
        rows: 3,
        fill: 'row',
      },
      pagination: {
        el:  ".catalog__pagination",
        clickable: true,
      },
      breakpoints: {
        722: {
          slidesPerView: 2,
          slidesPerColumn: 3,
          slidesPerGroup: 2,
          spaceBetween: 32,
          grid: {
            rows: 3,
            fill: 'row',
          },
        },
        981: {
          slidesPerView: 3,
          slidesPerColumn: 3,
          slidesPerGroup: 3,
          spaceBetween: 32,
          grid: {
            rows: 3,
            fill: 'row',
          },
        }
      },
    });
  };

  // стилизация пагинации
  if (document.querySelector('.catalog__swiper')) {
    let pages = document.querySelectorAll('.swiper-pagination-bullet');
    for (let i = 0; i < pages.length; ++i) {
      pages[i].innerHTML = i+1;
    };
  };

  // работа кнопок ещё и свернуть
  if (document.querySelector('.sidebar')) {
    document.querySelectorAll('.filter').forEach(function(filter) {
      const filterWrapper = filter.querySelector('.filter__wrapper');
      const items = filter.querySelectorAll('.filter__item');
      if (items.length > 9) {
        items[8].classList.add('filter__item_nine');
        for (let i = 9; i < items.length; ++i) {
          items[i].classList.add('filter__item_hidden');
        };
        const moreBtn = elementCreator(['btn', 'filter__btn', 'filter__btn_more'], 'button', `+ ещё ${items.length - 9}`);
        moreBtn.setAttribute('type', 'button');
        const lessBtn = elementCreator(['btn', 'filter__btn', 'filter__btn_less'], 'button', 'свернуть');
        lessBtn.setAttribute('type', 'button');
        moreBtn.addEventListener('click', function() {
          items[8].classList.remove('filter__item_nine');
          for (let i = 9; i < items.length; ++i) {
            items[i].classList.remove('filter__item_hidden');
          };
          moreBtn.remove();
          filterWrapper.append(lessBtn);
        });
        lessBtn.addEventListener('click', function() {
          items[8].classList.add('filter__item_nine');
          for (let i = 9; i < items.length; ++i) {
            items[i].classList.add('filter__item_hidden');
          };
          lessBtn.remove();
          filterWrapper.append(moreBtn);
        });
        filterWrapper.append(moreBtn);
      };

      // изменение подзаголовка фильтра
      const sidebarHeading = document.querySelector('.sidebar__heading');
      function resizeSidebarHeading() {
        if (document.documentElement.clientWidth < 1353) {
          sidebarHeading.innerHTML = 'Фильтры:'
        } else {
          sidebarHeading.innerHTML = 'Фильтровать по:'
        };
      };

      window.addEventListener(`resize`, event => {
        resizeSidebarHeading();
      }, false);

      resizeSidebarHeading();

      // работа выпадающих фильтров
      const downButton = filter.querySelector('.filter__down');
      downButton.addEventListener('click', function() {
        downButton.classList.toggle('filter__down_unwrapped');
        filterWrapper.classList.toggle('filter__wrapper_shown');
        document.querySelectorAll('.filter__wrapper').forEach(function(wrap) {
          if (wrap.dataset.wrapper != downButton.dataset.down) {
            wrap.classList.remove('filter__wrapper_shown');
          };
        });
        document.querySelectorAll('.filter__down').forEach(function(btn) {
          if (btn.dataset.down != downButton.dataset.down) {
            btn.classList.remove('filter__down_unwrapped');
          };
        });
      });
    });

    // работа чекбоксов и ярлыков
    // чекбоксы
    const top = document.querySelector('.tags');
    document.querySelectorAll('.filter').forEach(function(filter) {
      filter.querySelectorAll('.filter__input').forEach(function(inpt) {
        const classArrayTag = [`tags__tag_${filter.dataset.filter}`, 'tags__tag', 'tag'];
        inpt.addEventListener('change', function() {
          if (inpt.checked) {
            if (inpt.type == "radio" && top.querySelector('.tags__tag_sale')) {
              const saleTag = document.querySelector('.tags__tag_sale');
              saleTag.remove();
            }
            const filterLabel = elementCreator(classArrayTag, 'div', `${inpt.dataset.name}`);
            filterLabel.dataset.label = inpt.dataset.name;
            const labelClose = elementCreator(['tag__close', 'btn'], 'button', '');
            labelClose.addEventListener('click', function(event) {
              event.preventDefault();
              inpt.checked = false;
              filterLabel.remove();
            });
            filterLabel.append(labelClose);
            top.append(filterLabel);
          } else {
            const label = top.querySelector(`[data-label="${inpt.dataset.name}"]`);
            label.remove();
          };
        });
      });
    });
  };

  // ползунок
  if (document.querySelector('.price__slider')) {

    const slider = document.querySelector('.price__slider');
    const fromInput = document.querySelector('.price__input_from');
    const toInput = document.querySelector('.price__input_to');
    const top = document.querySelector('.tags');
    const min = 0;
    const max = 220000

    noUiSlider.create(slider, {
      start: [min, max],
      connect: true,
      step: 500,
      range: {
        'min': min,
        'max': max
      },
    });

    slider.noUiSlider.on('update', function (values, handle) {
      let value = values[handle];

      if (handle) {
        toInput.value = Math.round(value);

        // ярлык До
        if (document.querySelector('.tags__tag_to')) {
          const filterLabel = document.querySelector('.tags__tag_to');
          filterLabel.innerHTML = `До ${String(toInput.value).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`;
          if (toInput.value == max) {
            filterLabel.remove();
          };
          const labelClose = elementCreator(['tag__close', 'btn'], 'button', '');
          filterLabel.append(labelClose);
          labelClose.addEventListener('click', function(event) {
            event.preventDefault();
            slider.noUiSlider.set([fromInput.value, 220000])
            filterLabel.remove();
          });
        } else {
          const filterLabel = elementCreator(['tags__tag', 'tags__tag_price', 'tag', 'tags__tag_to'], 'div', `До ${String(toInput.value).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`);
          const labelClose = elementCreator(['tag__close', 'btn'], 'button', '');
          filterLabel.append(labelClose);
          labelClose.addEventListener('click', function(event) {
            event.preventDefault();
            slider.noUiSlider.set([fromInput.value, 220000])
            filterLabel.remove();
          });
          top.append(filterLabel);
          if (toInput.value == max) {
            filterLabel.remove();
          };
        };
      } else {
        fromInput.value = Math.round(value);

        // ярлык От
        if (document.querySelector('.tags__tag_from')) {
          const filterLabel = document.querySelector('.tags__tag_from');
          filterLabel.innerHTML = `От ${String(fromInput.value).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`;
          const labelClose = elementCreator(['tag__close', 'btn'], 'button', '');
          filterLabel.append(labelClose);
          if (fromInput.value == min) {
            filterLabel.remove();
          };
          labelClose.addEventListener('click', function(event) {
            event.preventDefault();
            slider.noUiSlider.set([0, toInput.value])
            filterLabel.remove();
          });
        } else {
          const filterLabel = elementCreator(['tags__tag', 'tags__tag_price', 'tag', 'tags__tag_from'], 'div', `От ${String(fromInput.value).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`);
          const labelClose = elementCreator(['tag__close', 'btn'], 'button', '');
          filterLabel.append(labelClose);
          labelClose.addEventListener('click', function(event) {
            event.preventDefault();
            slider.noUiSlider.set([0, toInput.value])
            filterLabel.remove();
          });
          top.append(filterLabel);
          if (fromInput.value == min) {
            filterLabel.remove();
          };
        };
      };
    });

    fromInput.addEventListener('change', function () {
      slider.noUiSlider.set([this.value, null]);
    });

    toInput.addEventListener('change', function () {
      slider.noUiSlider.set([null, this.value]);
    });

    // стилизация ползунка
    document.querySelectorAll('.noUi-handle').forEach(function(el) {
      const sliderBar = document.querySelector('.noUi-connect');
      el.addEventListener('focus', function() {
        sliderBar.classList.add('noUi-connect-focused');
      });
      el.addEventListener('blur', function() {
        sliderBar.classList.remove('noUi-connect-focused');
      });
    });
  };

  // свайперы карточки товара
  if (document.querySelector('.merch')) {
    const thumbsSwiper = new Swiper('.thumbs', {
      slidesPerView: 'auto',
      slidesPerGroupAuto: true,
      initialSlide: 1,
      spaceBetween: 38,
      direction: 'horizontal',
      breakpoints: {
        722: {
          direction: 'vertical',
          spaceBetween: 13,
        },
        981: {
          direction: 'horizontal',
          spaceBetween: 38,
        },
      },
    });

    const merchSwiper = new Swiper('.merch__swiper', {
      thumbs: {
        swiper: thumbsSwiper
      },
      spaceBetween: 32,
    });

    // свайперы модалки
    const controlSwiper = new Swiper('.controller', {
      slidesPerView: 1,
      spaceBetween: 78,
      slidesPerGroupAuto: true,
      spaceBetween: 78,
      initialSlide: 1,
      navigation: {
        nextEl: '.view__next',
        prevEl: '.view__prev',
      },
      breakpoints: {
        722: {
          slidesPerView: 2,
          navigation: {
            nextEl: '.view__next',
            prevEl: '.view__prev',
          },
        },
        981: {
          slidesPerView: 3,
          navigation: {
            nextEl: '.view__next',
            prevEl: '.view__prev',
          },
        },
        1353: {
          slidesPerView: 4,
          navigation: false,
        }
      },
    });

    document.querySelectorAll('.photos__link').forEach(function(link) {
      link.addEventListener('click', function() {
        const slideIndex = link.dataset.number - 1;
        const modalSwiper = new Swiper('.view__swiper', {
          thumbs: {
            swiper: controlSwiper
          },
          initialSlide: slideIndex,
          spaceBetween: 32,
        });
      });
    });

    // свайпер "похожие товары"
    const similarSwiper = new Swiper('.similar__swiper', {
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: {
        nextEl: '.slider__next',
        prevEl: '.slider__prev',
      },
      breakpoints: {
        722: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        981: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1353: {
          slidesPerView: 4,
          spaceBetween: 32,
        }
      },
    });
  };

  // поиск магазинов на странице "Контакты"
  if (document.querySelector('.shops__input')) {
    const shopsForm = document.querySelector('.shops');
    const contactInput = document.querySelector('.shops__input');
    const options = document.querySelectorAll('.shops__item');
    const mapPlug = document.querySelector('.map__plug');
    options.forEach(function(optionElement) {
      optionElement.addEventListener('click', function() {
        contactInput.value = optionElement.dataset.address;
        contactInput.focus();
        shopsForm.dataset.point = optionElement.dataset.address;
        options.forEach(function(optionElement) {
          optionElement.classList.remove('shops__item_visible');
        });
      });
      optionElement.addEventListener('keydown', function() {
        if (event.code == 'Enter') {
          event.preventDefault();
          contactInput.value = optionElement.dataset.address;
          contactInput.focus();
          shopsForm.dataset.point = optionElement.dataset.address;
          options.forEach(function(optionElement) {
            optionElement.classList.remove('shops__item_visible');
          });
        };
      });
    });
    contactInput.addEventListener('input', function() {
      shopsForm.dataset.point = '';
      mapPlug.classList.remove('map__plug_visible');
      if (contactInput.value.length > 0) {
        contactInput.classList.add('shops__input_typing');
      } else {
        contactInput.classList.remove('shops__input_typing');
      };
      options.forEach(function(optionElement) {
        if (optionElement.innerText.toLowerCase().includes(contactInput.value.toLowerCase()) && contactInput.value.length > 0) {
          optionElement.classList.add('shops__item_visible');
          optionElement.classList.remove('shops__item_first');
          optionElement.classList.remove('shops__item_last');
        } else {
          optionElement.classList.remove('shops__item_visible');
          optionElement.classList.remove('shops__item_first');
          optionElement.classList.remove('shops__item_last');
        };
      });
      if (document.querySelector('.shops__item_visible')) {
        const visibleOptions = document.querySelectorAll('.shops__item_visible');
        visibleOptions[0].classList.add('shops__item_first');
        visibleOptions[visibleOptions.length - 1].classList.add('shops__item_last');
      };
    });
  };

  // карта
  if (document.querySelector('.contacts__map')) {
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        center: [55.755834, 37.623097],
        zoom: 15,
        controls: []
      }, {
        yandexMapDisablePoiInteractivity: true
      });

      // Добавление меток
      let myPlacemark1 = new ymaps.Placemark([55.751055, 37.642651], {
        balloonContent: '<div class="balloon"> <h3 class="balloon__heading heading3">SitDownPls на Солянке</h3> <p class="paragraph balloon__address"> м. Китай-город, ул. Солянка, д.24 </p> <a href="tel:+74958854547" class="balloon__phone phone link"> <svg class="phone__img" height="17" width="23"> <use xlink:href="./img/sprite.svg#phone"></use> </svg> +7 (495) 885-45-47</a> <div class="balloon__line"></div> <p class="balloon__time paragraph"><span class="balloon__span">Часы работы: </span>с 10:00 до 21:00</p> <div class="balloon__line"></div> <p class="balloon__description paragraph"><span class="balloon__span">Что здесь: </span>шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p> </div>',
      }, {
        iconLayout: 'default#image',
        iconImageHref: './img/sprite.svg#elephant',
        iconImageSize: [32, 22],
        hideIconOnBalloonOpen: false,
        balloonPanelMaxMapArea: 0,
      });

      let myPlacemark2 = new ymaps.Placemark([55.759091, 37.644980], {
        balloonContent: '<div class="balloon"> <h3 class="balloon__heading heading3">SitDownPls на Покровке</h3> <p class="paragraph balloon__address"> м. Курская, ул. Покровка, д.14 </p> <a href="tel:+74958854547" class="balloon__phone phone link"> <svg class="phone__img" height="17" width="23"> <use xlink:href="./img/sprite.svg#phone"></use> </svg> +7 (495) 885-45-47</a> <div class="balloon__line"></div> <p class="balloon__time paragraph"><span class="balloon__span">Часы работы: </span>с 10:00 до 21:00</p> <div class="balloon__line"></div> <p class="balloon__description paragraph"><span class="balloon__span">Что здесь: </span>шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</p> </div>',
      }, {
        iconLayout: 'default#image',
        iconImageHref: './img/sprite.svg#elephant',
        iconImageSize: [32, 22],
        hideIconOnBalloonOpen: false,
        balloonPanelMaxMapArea: 0,
      });

      // брейкпойнты для стилей балуна (сдвиг)
      if (document.documentElement.clientWidth > 721) {
        myPlacemark1.options.set({balloonOffset: [-100, -34]});
        myPlacemark2.options.set({balloonOffset: [-100, -34]});
      } else {
        myPlacemark1.options.set({balloonOffset: [-55, -34]});
        myPlacemark2.options.set({balloonOffset: [-55, -34]});
      };

      // добавляем на карту
      myMap.geoObjects.add(myPlacemark1);
      myMap.geoObjects.add(myPlacemark2);

      // открываем балуны по запросу
      const shopsForm = document.querySelector('.shops');
      const mapPlug = document.querySelector('.map__plug');
      shopsForm.addEventListener('submit', function() {
        event.preventDefault();
        switch (shopsForm.dataset.point) {
          case 'Москва, SitDownPls на Солянке':
            mapPlug.classList.remove('map__plug_visible');
            myPlacemark1.balloon.open();
            break;
          case 'Москва, SitDownPls на Покровке':
            mapPlug.classList.remove('map__plug_visible');
            myPlacemark2.balloon.open();
            break;
          default:
            mapPlug.classList.add('map__plug_visible')
            break;
        };
      });
    };
  };

});
