const pokemon = document.querySelector("#buscador");
const botonBuscar = document.querySelector("#botonBuscar");

let cajaCarta = document.querySelector(".cajaCarta");
const copia = cajaCarta.innerHTML;


async function BuscarPokemon(Pokemon, copia) {
  let devolver = "error"
  try {
    let promesa = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Pokemon.toLowerCase()}`
    );
    let resolucion = await promesa.json();
    devolver = resolucion
   
    return devolver;
  } catch (error) {
    

    return devolver;
  }
}

function muestraPokemon(resolucion, nombrePokemon) {
  cajaCarta.innerHTML = copia;
  const imagenPokemon = document.querySelector("#cajaImagen img");
  const habilidades = document.querySelector("#habilidades");

  try {
    if (resolucion != "error") {
      imagenPokemon.setAttribute("src", resolucion.sprites["front_default"]);
      habilidades.innerHTML = "";

      let listaHabilidades = resolucion["abilities"];

      listaHabilidades.forEach((poder, i) => {
        habilidades.innerHTML += `<p>Habilidad ${i}: <strong>${poder.ability.name}</strong></p>`;
      });
      let tipo = resolucion["types"];
      habilidades.innerHTML += `<p>Experiencia: <strong>${resolucion["base_experience"]}</strong> </p>\
    <p>Altura: <strong>${resolucion["height"]}</strong></p>\
    <p>Peso: <strong>${resolucion["weight"]} </strong>\
    <p>Tipo: <strong>${tipo[0].type.name}</strong></p>`;
    }else{
      imagenPokemon.setAttribute("src", "imagenes/zoom-question.png");
      habilidades.innerHTML = `<p> El pokemon "${nombrePokemon}" no existe</p>`
    }
  } catch (error) {}
}

botonBuscar.addEventListener("click", async (e) => {
  e.preventDefault();
  let nombrePokemon = pokemon.value;
  if (nombrePokemon != "") {
    cajaCarta.innerHTML = "<div class=spinner ></div>";
    let resultado = await BuscarPokemon(nombrePokemon, copia);


    muestraPokemon(resultado, nombrePokemon);
  }
});
