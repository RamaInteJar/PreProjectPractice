const pokedex = document.getElementById('pokedex')
console.log(pokedex);

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
            <li class="card">
            <img class="card-img" src="${pokee.image}"/>
            <h2 class="card-title">${pokee.id}. ${pokee.name}</h2>
            <p class="card-subtitle">Type: ${pokee.type}</p>
            </li>
            `).join('')
            pokedex.innerHTML = pokemonHTMLString;
          }
            
            //anything under data should be refereced first using data in order to access data
            //extracting data from the API into an object
      
            //Initialization method
      
          //   const pokemon = {};
          //   pokemon["name"] = data.name;
          //   pokemon["id"] = data.id;
          //   pokemon["image"] = data.sprites["front_default"];
      
            //iterate throught each types using .forEach or map
            //using forEach
            // pokemon['type']= data.types.forEach(type =>{
            //     pokemon['type']=pokemon['type'] + ' , ' + type.type.name
            // })
      
            //using .map
      
          //   pokemon["type"] = data.types
          //     .map((type) => {
          //       return type.type.name;
          //     })
          //     .join(", ");
      
            //Direct Method
            //   const pokemon = {
                  
            //   }
            
};
fetchPokemon();
