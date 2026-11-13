<div align="center">

<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Cheese.png" width="48" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Tomato.png" width="48" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Steak.png" width="48" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/ChickenLeg.png" width="48" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Potato.png" width="48" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Eggs.png" width="48" alt="">

# 🎁 Caixa Surpresa de Receitas

**Um joguinho em pixel art que sorteia o que você vai cozinhar hoje.**

Abra a caixinha, veja as comidinhas girando e descubra uma receita nova, com todos os ingredientes ilustrados.

![HTML](https://img.shields.io/badge/HTML-e34c26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-264de4?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Sem dependências](https://img.shields.io/badge/depend%C3%AAncias-zero-6dbb4a?style=flat-square)
![Receitas](https://img.shields.io/badge/receitas-15-d64545?style=flat-square)

</div>

---

## ✨ Como funciona

| | |
|:---:|---|
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Cookie.png" width="32" alt=""> | **Clique na caixa**: ela treme e um balãozinho começa a sortear as comidinhas, cada vez mais devagar, como uma roleta. |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Tart.png" width="32" alt=""> | **A tampa voa!** A comida escolhida sai da caixa, com raios de luz, confete de sprites e uma fanfarra 8-bit. |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Bread.png" width="32" alt=""> | **Cartão da receita**: nome, proteína, modo de preparo e a lista de ingredientes, cada um com sua fotinho. |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Honey.png" width="32" alt=""> | **Álbum de receitas**: cada receita descoberta é desbloqueada. Tente completar as 15! O progresso fica salvo no navegador. |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/PepperRed.png" width="32" alt=""> | **Filtros**: sorteie entre **Tudo**, só **Carne** ou só **Frango**. |

> 💡 O sorteio prioriza receitas que você ainda não descobriu e nunca repete a última.

---

## 🚀 Como rodar

A página lê o `recepies.json` pelo navegador, então ela precisa ser aberta por um **servidor local**. Abrir o `index.html` com duplo clique não funciona (o navegador bloqueia a leitura do arquivo).

Primeiro, baixe o projeto:

```bash
git clone https://github.com/givasques/app-simple-recepies.git
cd app-simple-recepies
```

Depois escolha **uma** das opções abaixo, rodando o comando dentro da pasta do projeto.

### Opção 1 · VS Code + Live Server (mais fácil)

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server** (de Ritwick Dey).
3. Clique com o botão direito no `index.html` → **Open with Live Server**.

O jogo abre sozinho no navegador. Funciona em Windows, macOS e Linux.

### Opção 2 · Python

| Sistema | Comando |
|---|---|
| 🪟 Windows (PowerShell ou CMD) | `py -m http.server 8000` |
| 🍎 macOS | `python3 -m http.server 8000` |
| 🐧 Linux | `python3 -m http.server 8000` |

> No Windows, se `py` não funcionar, tente `python -m http.server 8000`. Se o Python não estiver instalado, baixe em [python.org](https://www.python.org/downloads/).

### Opção 3 · Node.js

Se você já tem o [Node.js](https://nodejs.org/) instalado (qualquer sistema):

```bash
npx serve -l 8000
```

Em qualquer opção do terminal, abra **http://localhost:8000** no navegador. Para parar o servidor, use **Ctrl+C**.

### Opção 4 · GitHub Codespaces (sem instalar nada)

1. No GitHub, clique em **Code → Codespaces → Create codespace**.
2. No terminal que abrir, rode `python3 -m http.server 8000`.
3. Abra a aba **Portas** (Ports) no painel de baixo e clique no ícone 🌐 da porta **8000**.

> Quer mostrar para alguém? Clique com o botão direito na porta 8000 → **Visibilidade da porta** → **Pública**.

---

## 🍽️ Receitas do jogo

| | Nº | Receita | Proteína | Preparo |
|:---:|:---:|---|---|---|
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Waffles.png" width="32" alt=""> | 01 | Panqueca de carne moída com molho de tomate | Carne moída | Frigideira e forno/micro-ondas |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/PiePumpkin.png" width="32" alt=""> | 02 | Escondidinho de carne moída | Carne moída | Forno ou airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Potato.png" width="32" alt=""> | 03 | Potinho de carne moída recheado com purê de batata | Carne moída | Forno ou airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Tart.png" width="32" alt=""> | 04 | Pastelzinho assado recheado com frango e requeijão | Frango desfiado | Forno ou airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Cheese.png" width="32" alt=""> | 05 | Lasanha de carne moída com molho ao sugo | Carne moída | Forno |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Chicken.png" width="32" alt=""> | 06 | Strogonoff com arroz e batata palha | Frango ou carne em tiras/cubos | Panela |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Tomato.png" width="32" alt=""> | 07 | Macarrão à bolonhesa | Carne moída | Panela |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Bread.png" width="32" alt=""> | 08 | Hambúrguer saudável com patinho e salada | Carne moída (patinho) | Frigideira antiaderente ou airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/PotatoRed.png" width="32" alt=""> | 09 | Batata cozida com casca recheada de frango na airfryer | Frango desfiado | Micro-ondas/panela + Airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Eggplant.png" width="32" alt=""> | 10 | Abobrinha ou berinjela recheada com carne moída | Carne moída | Forno ou airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/PieLemon.png" width="32" alt=""> | 11 | Torta rápida de liquidificador de frango com legumes | Frango desfiado | Forno ou airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Sausages.png" width="32" alt=""> | 12 | Almôndegas de carne moída assadas ao sugo | Carne moída | Airfryer + Panela |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Roll.png" width="32" alt=""> | 13 | Rap10 (wrap) tostado de carne moída ou frango | Carne moída ou frango desfiado | Frigideira ou sanduicheira |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/ChickenLeg.png" width="32" alt=""> | 14 | Fricassê de frango saudável (sem batata palha frita) | Frango desfiado | Liquidificador + Forno/Airfryer |
| <img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Steak.png" width="32" alt=""> | 15 | Rocambole de carne moída recheado com mussarela e legumes | Carne moída | Forno ou airfryer |

---

## ➕ Adicionando uma receita nova

1. Inclua a receita em `recepies.json`, dentro de `pratos_usuario`, seguindo o formato:

   ```json
   {
       "id": 16,
       "nome": "Nome do prato",
       "proteina_principal": "Frango desfiado",
       "preparo": "Forno ou airfryer",
       "ingredientes": ["Ingrediente 1", "Ingrediente 2"]
   }
   ```

2. *(Opcional)* Escolha a fotinho do prato no objeto `HERO`, no começo do `game.js`:

   ```js
   const HERO = { /* ... */ 16: "Pineapple" };
   ```

   Os nomes disponíveis são os arquivos de `FreePixelFood/Assets/FreePixelFood/Sprite/Food/` (sem o `.png`). Sem essa escolha, a receita aparece com um cookie 🍪.

3. Os ícones dos ingredientes são escolhidos automaticamente por palavra-chave ("queijo" → 🧀, "tomate" → 🍅…). Para ajustar, edite `INGREDIENT_RULES` no `game.js`.

> O filtro **Carne** / **Frango** usa o campo `proteina_principal`: basta conter "carne", "patinho" ou "frango".

---

## 📁 Estrutura

```
📦 app-simple-recepies
 ┣ 📄 index.html       → estrutura da página
 ┣ 🎨 style.css        → visual pixel art, animações
 ┣ 🕹️ game.js          → caixa, sorteio, sons, álbum
 ┣ 📋 recepies.json    → as receitas do jogo
 ┗ 🖼️ FreePixelFood/   → pacote de sprites 16×16
```

---

<div align="center">

<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/PieApple.png" width="32" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Strawberry.png" width="32" alt="">
<img src="FreePixelFood/Assets/FreePixelFood/Sprite/Food/Cherry.png" width="32" alt="">

**Créditos:** sprites do pacote **FreePixelFood** (arte por Ben Henry · código por David Henry) · fonte [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans)

*Bom apetite!* 🍳

</div>
