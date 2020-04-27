//busca en la api segun lo escrito en el buscador
async function buscarCanciones(textoBuscado){
    let busqueda = await fetch(`https://api.lyrics.ovh/suggest/${textoBuscado}`)
    let resultado = await busqueda.json()
    mostrarResultado(resultado)
}
//muestra el título de las canciones, el autor y un botón para mostrar las letras
function mostrarResultado(resultado){
    let salida = '';

    resultado.data.forEach(cancion => {
        salida += `
        <li>
            <span class="resultado"><strong>${cancion.artist.name}</strong> ${cancion.title}</span><button class="btnLetras" resultado-tituloCancion='${cancion.title}' resultado-artista='${cancion.artist.name}'>Lyrics</button>
        </li>`
    });
    document.getElementById('resultado').innerHTML = `<ul>${salida}</ul>`
    //si existen enlaces para pagina siguiente o aneterior crear boton para accedr a ellas
    if (resultado.prev || resultado.next) {
        document.getElementById('siguiente_previo').innerHTML = `
        ${resultado.prev ? `<button class="btn" onclick=masCanciones('${resultado.prev}')>Anterior</button>` : ''}
        ${resultado.next ? `<button class="btn" onclick=masCanciones('${resultado.next}')>Siguiente</button>` : ''}`
    } else {
        document.getElementById('siguiente_previo').innerHTML = ''
    }
}

async function masCanciones(url){
    let busqueda = await fetch(`https://cors-anywere.herokuapp.com/${url}`)
    let resultado = await busqueda.json()
    mostrarResultado(resultado)
}
//muestra por pantalla la letra de la canción
async function getLetra(artista, tituloCancion){
    let busqueda = await fetch(`https://api.lyrics.ovh/v1/${artista}/${tituloCancion}`)
    let resultado = await busqueda.json()
    let letra = resultado.lyrics
    if(letra == undefined){
        document.getElementById('resultado').innerHTML = `<p class="error">No se ha podido obtener la letra :(</p>`
        document.getElementById('siguiente_previo').innerHTML = ''
    }else{
        document.getElementById('resultado').innerHTML = `<h2>${artista} - ${tituloCancion}</h2>
        <div class="letra"><span>${letra.replace(/(\r\n|\r|\n)/g,'<br>')}</span></div>`
        document.getElementById('siguiente_previo').innerHTML = ''
    }

}
//borra el mensaje de error para cuando no escriben nada en el buscador
function borrarMensajeError(error){
    setTimeout(() => {
        error.style.display = 'none'
    }, 3000);
    error.style.display = 'block'
}
//comprueba si se ha escrito en el buscador si lo ha hecho busca las cancionese sino muestra un mensaje de error
document.getElementById('form').addEventListener('submit', e =>{
    e.preventDefault()

    let textoBuscado = document.getElementById('buscar').value.trim()

    if (!textoBuscado) {
       let error = document.querySelector('#error')
       error.innerHTML = `<p class="error">Debe escribir algo en el buscador :)<p>`
        borrarMensajeError(error)
    } else {
        buscarCanciones(textoBuscado)
    }
})
//al hacer click en el botón muestra la letra de la canción
document.getElementById('resultado').addEventListener('click',e =>{
    let clicado = e.target
    if(clicado.tagName === 'BUTTON'){
        const artista = clicado.getAttribute('resultado-artista')
        const tituloCancion = clicado.getAttribute('resultado-tituloCancion')

        getLetra(artista, tituloCancion)
    }
})