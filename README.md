<h1 align="center">
	:computer: TCC Projeto
</h1>

<h3 align="center">
   Melhorando a eficiência e eficácia da gestão de doações de sangue.
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Felix566/TCC_projeto?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Felix566/TCC_projeto">
  
  <a href="https://github.com/Felix566/TCC_projeto/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Felix566/TCC_projeto">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/Felix566/TCC_projeto/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/Felix566/TCC_projeto?style=social">
  </a>
  <img src="https://komarev.com/ghpvc/?username=Felix566" alt="https://github.com/Felix566" />
</p>

<h4 align="center">
	:construction: Projeto Finalizado :construction:
</h4>

<h3>Índice</h3>

- [Sobre](#computer-sobre-o-projeto)
- [Funcionalidades](#gear-funcionalidades)
- [Layout](#art-layout)
- [Como executar](#rocket-como-executar-o-projeto)
- [Tecnologias](#hammer_and_pick-tecnologias)

---

## :computer: Sobre o projeto

  <p> O Sistema Gerenciador de Estoque Sanguíneo Hemonúcleo Cajazeiras, tem como objetivo permitir que os profissionais do hemonúcleo registrem as doações de sangue, rastreiem a validade dos produtos sanguíneos, monitorem os níveis de estoque, gerenciem a distribuição de sangue para hospitais e outros centros médicos e forneçam relatórios precisos sobre o estoque.</p>
  
---

## :gear: Funcionalidades

- [x] Cadastrar funcionários responsáveis por utilizar o sistema
- [x] Visualizar informações cadastrais
- [x] Visualização das bolsas em estoque
- [x] Adicionar bolsas sanguíneas ao estoque
- [x] Controle de entrada e saída no estoque
- [x] Visualização de relatório com informações de entradas e saídas

---

## :art: Layout

### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="" title="" src="https://github.com/Felix566/TCC_projeto/blob/main/frontend/src/assets/img/sisDoacoes.png" width="400px">

  <img alt="" title="" src="https://github.com/Felix566/TCC_projeto/blob/main/frontend/src/assets/img/sisHome.png" width="400px">

  <img alt="" title="" src="https://github.com/Felix566/TCC_projeto/blob/main/frontend/src/assets/img/sisLogin.png" width="400px">
</p>

---

## :rocket: Como executar o projeto

Este projeto é divido em duas partes:

1. Backend (pasta backend)
2. Frontend (pasta frontend)

:bulb:Para o Frontend funcionar, é preciso que o Backend esteja sendo executado.

---

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### :game_die: Rodando o Backend (servidor)

Clone o repositório do projeto:

```bash
  git clone https://github.com/Felix566/TCC_projeto
```

Crie um termimal e entre na pasta backend do projeto:

```bash
  cd TCC_projeto\backend
```

Instale as dependencias do projeto:

```bash
  npm install ou yarn add
```

Execute o servidor:

```bash
  npm run start
```

O servidor estará rodando em:

```bash
http://localhost:5000
```

#### :dart: Rodando a aplicação web (Frontend)

Crie um novo terminal e entre na pasta do frontend:

```bash
  cd TCC_projeto\frontend
```

Instale as dependências necessárias para o funcionamento correto do frontend:

```bash
  npm install ou yarn add
```

Inicie o projeto:

```bash
  npm run start
```

---

## :hammer_and_pick: Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js]() - Para desenvolvimento do backend
- [Express]() - Para construção da API
- [Mongoose]() - ODM
- [ReactJs]() - Para o desenvolvimento do frontend
- [Axios]() - Para realizar a comunicação do frontend com a API

---

[⬆ Voltar ao topo](#computer-tcc-projeto)<br>
