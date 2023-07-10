// const buttons = document.querySelectorAll("[data-carousel-btn]");
// const slides = document.querySelector("[data-slides");

// console.log(buttons);

// const fetchPokemon = () => {
//   const promises = [];
//   for (let i = 1; i <= 21; i++) {
//     //Fecth url(request)
//     const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//     //Promise convert request to response and get the body of that response
//     promises.push(fetch(url).then((res) => res.json()));
//   }
//   Promise.all(promises).then((results) => {
//     const pokemon = results.map((data) => ({
//       name: data.name,
//       id: data.id,
//       image: data.sprites.front_default,
//       type: data.types.map((type) => type.type.name).join(""),
//     }));
//     displayPokemon(pokemon);

//     buttons.forEach((button) => {
//       button.addEventListener("click", function () {
//         console.log("click me!");
//         const offset = button.dataset.carouselButton === "next" ? 1 : -1;
//         //   const slides = button.closest('[data-carousel]').querySelectorAll('[data-slides]')
//         const activeSlide = slides.querySelector(`[data-active]`);
//         //   const newIndex = indexOf(activeSlide) + offset
//         let newIndex =
//           Array.from(slides.children).indexOf(activeSlide) + offset;

//         //   if(newIndex < 0) newIndex = slides.length - 1;
//         if (newIndex < 0) newIndex = slides.children.length - 1;
//         //   if(newIndex > slides.length ) newIndex = 0;
//         if (newIndex >= slides.children.length) newIndex = 0;

//         setActiveSlide(newIndex);
//       });
//     });
//   });
// };

// const displayPokemon = (pokemon) => {
//   const pokemonHTMLString = pokemon
//     .map(
//       (pokee) => `
//                 <li class="slide">
//                 <h2 class="carousel-elements">
//                 <img class="carousel-img" src="${pokee.image}" />
//                 </h2>
//                 <p class="carousel-title">${pokee.id}. ${pokee.name}</p>
//                 <p class="carousel-subtitle">Type: ${pokee.type}</p>
//                 </li>
//                 `
//     )
//     .join("");

//   slides.innerHTML = pokemonHTMLString;
//   setActiveSlide(0);
// };

// const setActiveSlide = (index) => {
//   const slidesList = slides.querySelectorAll(".slide");
//   slidesList.forEach((slide, i) => {
//     slide.removeAttribute("data-active");
//     if (i === index) {
//       slide.setAttribute("data-active", "");
//     }
//   });
// };

// fetchPokemon();

$(document).ready(function() {
  const buttons = $("[data-carousel-btn]");
  const slides = $("[data-slides]");

  console.log(buttons);

  const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 21; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(
        fetch(url).then((res) => res.json())
      );
    }
    Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        type: data.types.map((type) => type.type.name).join(""),
      }));
      displayPokemon(pokemon);

      buttons.each(function() {
        $(this).on("click", function() {
          console.log("click me!");
          const offset = $(this).data("carouselButton") === "next" ? 1 : -1;
          const activeSlide = slides.find("[data-active]");
          let newIndex = slides.children().index(activeSlide) + offset;
          if (newIndex < 0) newIndex = slides.children().length - 1;
          if (newIndex >= slides.children().length) newIndex = 0;
          setActiveSlide(newIndex);
        });
      });
    });
  };

  const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
      .map(
        (pokee) => `
          <li class="slide">
            <h2 class="carousel-elements">
              <img class="carousel-img" src="${pokee.image}" />
            </h2>
            <p class="carousel-title">${pokee.id}. ${pokee.name}</p>
            <p class="carousel-subtitle">Type: ${pokee.type}</p>
          </li>
        `
      )
      .join("");
    slides.html(pokemonHTMLString);
    setActiveSlide(0);
  };

  const setActiveSlide = (index) => {
    const slidesList = slides.find(".slide");
    slidesList.each(function(i) {
      $(this).removeAttr("data-active");
      if (i === index) {
        $(this).attr("data-active", "");
      }
    });
  };

  fetchPokemon();
});

  