/* =========================================================
   LISTA DE MATERIAIS — é só este arquivo que você edita.
   =========================================================

   Para adicionar um material, copie uma linha e troque os dados:

   { serie: "1", conteudo: "Cinemática", tipo: "apostila", titulo: "Resumo de MU", link: "pdf/1ano/resumo-mu.pdf" },

   serie    → "1", "2" ou "3"
   conteudo → nome do conteúdo (materiais com o mesmo nome ficam juntos)
   tipo     → "apostila", "exercicio" ou "video"
   titulo   → o que o aluno vai ler na tela
   link     → caminho do PDF dentro da pasta do site
              ou o endereço do vídeo no YouTube (ex.: https://www.youtube.com/watch?v=XXXXXXXXXXX)

   Os materiais aparecem na ordem desta lista.
*/

const MATERIAIS = [

  // ---------- 1º ANO ----------
  { serie: "1", conteudo: "Cinemática", tipo: "apostila", titulo: "Resumo de Cinemática", link: "pdf/1ano/resumo-cinematica.pdf" },

  // ---------- 2º ANO ----------
  { serie: "2", conteudo: "Termologia", tipo: "apostila", titulo: "Prova", link: "pdf/1ano/prova1-termologia.pdf" },

  // ---------- 3º ANO ----------
  { serie: "3", conteudo: "Eletrodinâmica", tipo: "exercicio", titulo: "Lista – Tema 24", link: "pdf/3ano/eletrodinamica/LISTA.TEMA24.ADC.3ANO.pdf" },

  // Exemplo de vídeo (apague as duas barras do começo e troque o link):
  // { serie: "3", conteudo: "Eletrodinâmica", tipo: "video", titulo: "Aula: corrente elétrica", link: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },

];

/* Avisos que aparecem no topo de cada série (deixe "" para não mostrar nada). */
const AVISOS = {
  "1": "",
  "2": "",
  "3": "",
};
