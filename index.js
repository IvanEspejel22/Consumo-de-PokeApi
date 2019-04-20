let contiene = document.getElementById('contenedor');
let paginacion = document.getElementById('paginacion');
let p;
let siguiente;
let anterior;
let centro;


function traepoke(linkea){
  contiene.innerHTML=``;
  fetch(linkea)
    .then(function(response) {
      return response.json();
    })
    .then(function(pokemon) {
      siguiente = pokemon.next;
      console.log(siguiente);
      anterior = pokemon.previous;
      // console.log(anterior);
       if(anterior==null){
        paginacion.innerHTML = `
        <button id="siguiente"  onClick="traepoke('${siguiente}')"><img src="der.svg" alt="" width="100"></button>`;
        // <button id="anterior" onclick=""><img src="izq.svg" alt="" width="100"></button>
        // <button id="siguiente"  onclick=""><img src="der.svg" alt="" width="100"></button>
       } else if(siguiente==null){
        paginacion.innerHTML = `
        <button id="anterior"  onClick="traepoke('${anterior}')"><img src="izq.svg" alt="" width="100"></button>`;
       }
       else{
        paginacion.innerHTML = `
        <button id="anterior" onclick="traepoke('${anterior}')"><img src="izq.svg" alt="" width="100"></button>
        <button id="siguiente"  onClick="traepoke('${siguiente}')"><img src="der.svg" alt="" width="100"></button>`;
       }
      
      p= pokemon.results;
      // console.log(p);
      return p.map(function(poke) {
          fetch(poke.url)
          .then(function(pokeResponse){
           return pokeResponse.json();
          })
          .then(function(pokeRe){
              // console.log(pokeRe);
              
              contiene.innerHTML += `
              <div class="ball centra">
                <div class="mitad-roja centra"> <h2>${pokeRe.name}</h2></div>
                  <button class="centro-ball" style="background-image:url(${pokeRe.sprites.front_shiny})">
                </button>
                <h3>#${pokeRe.id}</h3>
              </div>`
  
             })
      })
       
      } 
  );
  }
  
  traepoke('https://pokeapi.co/api/v2/pokemon');
  
  