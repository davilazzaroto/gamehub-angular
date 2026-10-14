# GameHub

O GameHub é um catálogo de jogos desenvolvido como atividade acadêmica da disciplina de Programação Web, no curso de Ciência da Computação. O objetivo do projeto é praticar componentes, rotas, services, interfaces TypeScript e formulários no Angular.

## Funcionalidades

- Página inicial com total de jogos cadastrados, quantidade de jogos gratuitos e quatro jogos em destaque.
- Catálogo com oito jogos iniciais e cards com imagem, descrição, categoria, preço, avaliação e disponibilidade.
- Busca por nome e filtro por categoria, que podem ser utilizados juntos.
- Página de detalhes de cada jogo, acessada pelo ID na URL, com tratamento para jogos não encontrados.
- Cadastro de jogos com validação do nome, preço e avaliação, geração automática de ID e retorno ao catálogo após salvar.
- Página Sobre com informações do projeto e identificação do aluno.
- Menu de navegação e layout dark com responsividade básica.

Os dados ficam centralizados no `JogoService`, em um array em memória. Não há backend ou banco de dados. Os jogos adicionados pelo formulário são perdidos ao recarregar a aplicação.

## Tecnologias

- Angular 22, com componentes standalone, Angular Router e FormsModule.
- TypeScript.
- HTML e CSS.
- Node.js e npm para executar as ferramentas e gerenciar as dependências.
- Angular CLI para desenvolvimento e build.

## Estrutura das pastas

```text
gamehub/
├── public/
│   └── images/          # Imagens dos jogos, imagem provisória e ícone
├── src/
│   ├── app/
│   │   ├── components/  # Menu e jogo-card
│   │   ├── models/      # Interface Jogo
│   │   ├── pages/       # Home, jogos, detalhes, cadastro e Sobre
│   │   ├── services/    # JogoService e dados em memória
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css       # Estilos globais
├── angular.json
├── package.json
└── README.md
```

Os componentes mantêm TypeScript, HTML e CSS em arquivos separados. Os testes ficam em arquivos com a extensão `.spec.ts`, próximos ao código que verificam.

## Instalação

Com Node.js e npm instalados, abra um terminal na pasta `gamehub`, onde está o arquivo `package.json`, e instale as dependências:

```bash
npm install
```

## Executar o projeto

Na pasta `gamehub`, inicie o servidor de desenvolvimento:

```bash
ng serve
```

Acesse `http://localhost:4200/` no navegador. O servidor atualiza a aplicação quando os arquivos são alterados.

Se o comando `ng` não estiver disponível no terminal, utilize a CLI instalada no próprio projeto:

```bash
npx ng serve
```

## Gerar o build

Para gerar a versão de produção:

```bash
ng build
```

Também é possível executar `npx ng build`. Os arquivos gerados ficam em `dist/gamehub/`, com os arquivos da aplicação para o navegador em `dist/gamehub/browser/`.

## Autor

Davi Antônio Galeano Lazzaroto.

Projeto acadêmico de Ciência da Computação, desenvolvido para a disciplina de Programação Web.
