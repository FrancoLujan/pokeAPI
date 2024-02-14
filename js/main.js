const pokemon = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#botonBuscar");
const habilidades = document.querySelector("#habilidades");
const imagenPokemon = document.querySelector("#cajaImagen img");

async function BuscarPokemon(Pokemon) {
  let sombraAnterior = pokemon.style.boxShadow;
  try {
    let promesa = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`);
    let resolucion = await promesa.json();

    imagenPokemon.setAttribute("src", resolucion.sprites["front_default"]);
    habilidades.innerHTML = "";
    
    let listaHabilidades = resolucion["abilities"];

    listaHabilidades.forEach((poder) => {
      habilidades.innerHTML += `<p>Habilidad: <strong>${poder.ability.name}</strong></p>`;
    });
    let tipo = resolucion["types"];
    habilidades.innerHTML += `<p>experiencia: <strong>${resolucion["base_experience"]}</strong> </p>\
    <p>Altura: <strong>${resolucion["height"]}</strong></p>\
    <p>Peso: <strong>${resolucion["weight"]} </strong>\
    <p>Tipo: <strong>${tipo[0].type.name}</strong></p>`;
  } catch (error) {
    imagenPokemon.setAttribute("src", "imagenes/zoom-question.png");
        habilidades.innerHTML = `<p> El pokemon "${Pokemon}" no existe</p>`
  }
}

botonBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  let nombrePokemon = pokemon.value;
  if (nombrePokemon != "") {
    BuscarPokemon(nombrePokemon);
  }
});
