console.log("Portal do Professor Leonardo iniciado.");

function pesquisarConteudo(){

    let input = document.getElementById("pesquisa");

    let filtro = input.value.toUpperCase();

    let cards = document.getElementsByClassName("conteudo-card");

    for(let i=0;i<cards.length;i++){

        let titulo = cards[i].getElementsByTagName("h2")[0];

        if(titulo.innerHTML.toUpperCase().indexOf(filtro)>-1){

            cards[i].style.display="block";

        }else{

            cards[i].style.display="none";

        }

    }

}