let contiene = document.getElementById('contenedor');
let paginacion = document.getElementById('paginacion');
let p;
let siguiente;
let anterior;
let centro;
let boton , boton2;
let botonC;
let pokebola;
let pokeid;



function traepoke(linkea) {
  contiene.innerHTML = ``;
    fetch(linkea)
        .then(function (response) {
        return response.json();
        })
    .then(function (pokemon) {
        siguiente = pokemon.next;
        anterior = pokemon.previous;
        // console.log(anterior);
      if (anterior == null) {
          paginacion.innerHTML = `
          <button id="siguiente"  onClick="traepoke('${siguiente}')"><img src="der.svg" alt="" width="100"></button>`;
        
      } else if (siguiente == null) {
          paginacion.innerHTML = `
          <button id="anterior"  onClick="traepoke('${anterior}')"><img src="izq.svg" alt="" width="100"></button>`;
      } else {
          paginacion.innerHTML = `
          <button id="anterior" onclick="traepoke('${anterior}')"><img src="izq.svg" alt="" width="100"></button>
          <button id="siguiente"  onClick="traepoke('${siguiente}')"><img src="der.svg" alt="" width="100"></button>`;
      }
    
        p = pokemon.results;
        // console.log(p);
        return p.map(function (poke) {
              fetch(poke.url)
              .then(function (pokeResponse) {
              return pokeResponse.json();
              })
              .then(function (pokeRe) {
              // console.log(pokeRe);
                    contiene.innerHTML += `
                    <div  class="ball centra" id='${pokeRe.id}'>
                      <div class="mitad-roja centra"> <h2>${pokeRe.name}</h2></div>
                        <button id='${pokeRe.name}' 
                        onClick="eligeCambio('${pokeRe.name}','${pokeRe.sprites.front_shiny}','${pokeRe.sprites.back_shiny}')" class="centro-ball" 
                        style="background-image:url(${pokeRe.sprites.front_shiny})">
                      </button>
                      <h3>#${pokeRe.id}</h3>
                    </div>`;
                    agregaEvento(pokeRe.id , pokeRe.name);
              })
        })
    });
}

function agregaEvento(ballid , botonid){
  pokebola = document.getElementById(ballid);
  boton2 = document.getElementById(botonid);
  pokebola.addEventListener('click', function(){
  boton2.style.animationPlayState = "running";
  });
}



function eligeCambio(ident, frente, espalda) {
  boton = document.getElementById(ident);
  
  botonC = boton.style.backgroundImage.toString();
  if (botonC.slice(5, -2) == frente) {
    final = espalda;
  } else {
    final = frente;
  }
  cambia(ident, final)
}

function cambia(identifica, liga) {
  boton = document.getElementById(identifica).style.backgroundImage = "url(" + liga + ")";
}
traepoke('https://pokeapi.co/api/v2/pokemon');