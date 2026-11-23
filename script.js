const ICONES = {
  apostila: '<svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
  exercicio: '<svg viewBox="0 0 24 24"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 7l3 3"/></svg>',
  video: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
};
const TIPOS = {
  apostila:  { nome: "Apostila",  acao: "Abrir PDF" },
  exercicio: { nome: "Exercícios", acao: "Abrir PDF" },
  video:     { nome: "Vídeo",     acao: "Assistir" },
};

function lerSerieSalva() {
  try { return localStorage.getItem("serie"); } catch (e) { return null; }
}
function salvarSerie(s) {
  try { localStorage.setItem("serie", s); } catch (e) {}
}
function serieDoLink() {
  return (location.hash.match(/^#([123])ano$/) || [])[1];
}

let serie = serieDoLink() || lerSerieSalva() || "1";
let tipo = "";
let busca = "";

const lista = document.getElementById("lista");
const aviso = document.getElementById("aviso");

const semAcento = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function idYoutube(url) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function contar(s) {
  return MATERIAIS.filter(m => m.serie === s).length;
}

function desenhar() {
  document.querySelectorAll(".series button").forEach(b => {
    const ativo = b.dataset.serie === serie;
    b.classList.toggle("ativo", ativo);
    b.setAttribute("aria-pressed", ativo);
    const n = contar(b.dataset.serie);
    b.querySelector("small").textContent = n === 1 ? "1 material" : `${n} materiais`;
  });

  const daSerie = MATERIAIS.filter(m => m.serie === serie);
  document.querySelectorAll(".tipos button").forEach(b => {
    const ativo = b.dataset.tipo === tipo;
    b.classList.toggle("ativo", ativo);
    b.setAttribute("aria-pressed", ativo);
    const n = b.dataset.tipo ? daSerie.filter(m => m.tipo === b.dataset.tipo).length : daSerie.length;
    b.dataset.n = n;
  });

  const textoAviso = (AVISOS[serie] || "").trim();
  aviso.hidden = !textoAviso;
  aviso.textContent = textoAviso;

  const termo = semAcento(busca.trim());
  const itens = daSerie.filter(m =>
    (!tipo || m.tipo === tipo) &&
    (!termo || semAcento(m.titulo + " " + m.conteudo).includes(termo)));

  lista.innerHTML = "";

  if (!itens.length) {
    const p = document.createElement("div");
    p.className = "vazio";
    if (!daSerie.length) {
      p.innerHTML = "<strong>Ainda não há materiais do " + serie + "º ano.</strong><span>Os arquivos aparecem aqui assim que o professor publicar.</span>";
    } else {
      p.innerHTML = "<strong>Nada encontrado com esse filtro.</strong><span>Tente outra palavra ou mostre tudo.</span><button type=\"button\">Mostrar tudo</button>";
      p.querySelector("button").addEventListener("click", () => {
        tipo = ""; busca = ""; document.getElementById("busca").value = ""; desenhar();
      });
    }
    lista.appendChild(p);
    return;
  }

  const grupos = new Map();
  itens.forEach(m => {
    if (!grupos.has(m.conteudo)) grupos.set(m.conteudo, []);
    grupos.get(m.conteudo).push(m);
  });

  grupos.forEach((mats, conteudo) => {
    const secao = document.createElement("section");
    secao.className = "conteudo";
    const h2 = document.createElement("h2");
    h2.textContent = conteudo;
    secao.appendChild(h2);

    const ul = document.createElement("ul");
    mats.forEach(m => {
      const t = TIPOS[m.tipo] ? m.tipo : "apostila";
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "item tipo-" + t;
      a.href = m.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `<span class="icone">${ICONES[t]}</span>
        <span class="texto"><strong></strong><small>${TIPOS[t].nome}</small></span>
        <span class="acao">${TIPOS[t].acao}</span>`;
      a.querySelector("strong").textContent = m.titulo;
      const id = t === "video" && idYoutube(m.link);
      if (id) a.addEventListener("click", e => { e.preventDefault(); abrirVideo(id, m.titulo); });
      li.appendChild(a);
      ul.appendChild(li);
    });
    secao.appendChild(ul);
    lista.appendChild(secao);
  });
}

// vídeo dentro do site
const player = document.getElementById("player");
const frame = document.getElementById("player-frame");
function abrirVideo(id, titulo) {
  document.getElementById("player-titulo").textContent = titulo;
  frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  player.showModal();
}
player.addEventListener("close", () => { frame.src = ""; });
document.getElementById("fechar").addEventListener("click", () => player.close());
player.addEventListener("click", e => { if (e.target === player) player.close(); });

// controles
function trocarSerie(s) {
  serie = s;
  salvarSerie(s);
  history.replaceState(null, "", "#" + s + "ano");
  desenhar();
}
document.querySelectorAll(".series button").forEach(b =>
  b.addEventListener("click", () => trocarSerie(b.dataset.serie)));
document.querySelectorAll(".tipos button").forEach(b =>
  b.addEventListener("click", () => { tipo = b.dataset.tipo; desenhar(); }));
document.getElementById("busca").addEventListener("input", e => { busca = e.target.value; desenhar(); });
window.addEventListener("hashchange", () => { const s = serieDoLink(); if (s) trocarSerie(s); });

// sombra na barra das séries quando ela gruda no topo
const barra = document.getElementById("barra");
new IntersectionObserver(([e]) => barra.classList.toggle("grudada", e.intersectionRatio < 1),
  { threshold: [1], rootMargin: "-1px 0px 0px 0px" }).observe(barra);

// quem prefere menos movimento vê a trajetória já pronta
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const svg = document.getElementById("trajetoria");
  svg.pauseAnimations();
  svg.setCurrentTime(5);
}

salvarSerie(serie);
desenhar();
