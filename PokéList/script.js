const buttons = document.querySelectorAll("[data-carousel-btn]")
console.log(buttons);

const fetchPokemon = () => {
    const promises = [];
    for(let i = 1; i <= 21; i++){
        //Fecth url(request)
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        //Promise convert request to response and get the body of that response
        promises.push(fetch(url).then((res) =>res.json()))
    }
        Promise.all(promises).then(results =>{
            const pokemon = results.map(data => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map(type => type.type.name).join(' ')
            }))
            displayPokemon(pokemon)
        })

        //function to display pokemon
        const displayPokemon = (pokemon)=>{
            console.log(pokemon);
            const pokemonHTMLString = pokemon.map(pokee => `
            <li class="slide">
            <img class="carousel-img" src="${pokee.image}"/>
            <h2 class="carousel-title">${pokee.id}. ${pokee.name}</h2>
            <p class="carousel-subtitle">Type: ${pokee.type}</p>
            </li>
            `).join('')
            slides.innerHTML = pokemonHTMLString;
          }

          buttons.forEach(button => {
            button.addEventListener('click', function(){
              console.log("click me!")
              const offset = button.dataset.carouselButton === "next" ? 1 : -1
              const slides = button.closest("[data-carousel]").querySelectorAll("[data-slides]")
              const activeSlide = slides[0].querySelector('[data-active]')
              const newIndex = indexOf(activeSlide) + offset
              if(newIndex < 0) newIndex = slides.length - 1;
              if(newIndex > slides.length ) newIndex = 0;
            })
          })
            
            
};
fetchPokemon();
