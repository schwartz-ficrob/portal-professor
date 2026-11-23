# Portal do Professor — versão simples

O site tem uma página só (`index.html`). Os alunos escolhem a série (1º, 2º ou 3º ano) e veem os materiais separados por conteúdo. Dá para filtrar por Apostilas, Exercícios ou Vídeos e buscar pelo nome.

## Arquivos

| Arquivo | Para que serve | Precisa editar? |
|---|---|---|
| `materiais.js` | lista de todos os materiais e os avisos | **Sim, só este** |
| `index.html` | a página | Não |
| `script.js` | faz a página funcionar | Não |
| `style.css` | aparência | Não |
| `pdf/` | onde ficam os PDFs | Coloque os arquivos aqui |

## Como adicionar uma apostila ou lista

1. Coloque o PDF na pasta `pdf/` (por exemplo `pdf/2ano/termologia/lista01.pdf`).
2. Abra `materiais.js` e acrescente uma linha:

```js
{ serie: "2", conteudo: "Termologia", tipo: "exercicio", titulo: "Lista 01", link: "pdf/2ano/termologia/lista01.pdf" },
```

## Como adicionar um vídeo

Copie o link do YouTube e acrescente:

```js
{ serie: "2", conteudo: "Termologia", tipo: "video", titulo: "Aula 1 – Calor", link: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
```

O vídeo abre numa janela dentro do próprio site.

## Avisos

No final de `materiais.js`, escreva o texto em `AVISOS` (ex.: `"2": "Prova dia 20/06"`). Para tirar o aviso, deixe `""`.

## Link direto para uma turma

Você pode mandar aos alunos o link já na série certa: `.../index.html#2ano`.

## Dicas

- Evite espaços e acentos nos nomes dos PDFs (`lista-01.pdf` em vez de `Lista 01 Óptica.pdf`).
- O GitHub não aceita arquivos acima de 100 MB, e acima de 50 MB ele avisa. PDFs com fotos escaneadas ficam pesados, então vale comprimir antes de subir.
