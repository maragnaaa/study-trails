# Notes: Docker para iniciantes

## 1. O que é Docker / contêineres (conceitos)
- Docker é uma plataforma que empacota aplicações em contêineres, garantindo que rodem de forma consistente em diferentes ambientes. [S1]
- Um contêiner é uma unidade isolada que inclui a aplicação e todas as dependências necessárias para executá-la. [S1]
- Contêineres são mais leves que máquinas virtuais porque compartilham o kernel do sistema operacional host. [S1]

## 2. Instalação do Docker CE no Linux (Ubuntu/Debian)
- Sistema alvo: Linux (Ubuntu 24.04 e derivados, apt). [S1]
- Passo 1: atualizar índices e instalar dependências base: `sudo apt update` e `sudo apt install ca-certificates curl`. [S1]
- Passo 2: criar pasta para a chave GPG: `sudo install -m 0755 -d /etc/apt/keyrings`. [S1]
- Passo 3: baixar a chave GPG oficial do Docker: `sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc`. [S1]
- Passo 4: tornar a chave legível: `sudo chmod a+r /etc/apt/keyrings/docker.asc`. [S1]
- Passo 5: adicionar o repositório apt via arquivo `/etc/apt/sources.list.d/docker.sources` (formato deb, URIs https://download.docker.com/linux/ubuntu, suite pelo código de versão do Ubuntu, componente stable, arquitetura via `dpkg --print-architecture`, assinado por /etc/apt/keyrings/docker.asc). [S1]
- Passo 6: atualizar índices novamente: `sudo apt update`. [S1]
- Passo 7: instalar os pacotes: `sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`. [S1]
- Resultado esperado: o comando `docker --version` exibe a versão instalada sem erro. [S1]

## 3. Comandos CLI essenciais (ciclo de vida do contêiner)
- `docker run <imagem>`: cria e inicia um contêiner a partir de uma imagem. [S1]
- `docker run -d <imagem>`: executa o contêiner em segundo plano (modo detached). [S1]
- `docker run --rm <imagem>`: remove o contêiner automaticamente quando ele para. [S1]
- `docker run -p <porta_host>:<porta_container> <imagem>`: publica uma porta do contêiner no host. Exemplo: `docker run -d -p 8080:80 nginx` expõe a porta 80 do contêiner na porta 8080 do host. [S1]
- `docker ps`: lista apenas contêineres em execução. [S1]
- `docker ps -a`: lista todos os contêineres, incluindo os parados. [S1]
- `docker stop <id_ou_nome>`: para um contêiner em execução pelo ID ou nome obtido com `docker ps`. [S1]
- `docker rm <id_ou_nome>`: remove um contêiner parado. Usar `docker ps -q` para gerar lista de IDs e passar como argumento. [S1]
- `docker container prune`: remove todos os contêineres parados (pede confirmação; usar `-f` para forçar). [S1]

## 4. Imagens (baixar, listar, remover)
- `docker images`: lista as imagens locais. Colunas de saída: REPOSITORY, TAG, IMAGE ID, CREATED, SIZE. [S1]
- `docker images <repositorio[:tag]>`: filtra imagens por repositório e/ou tag. [S1]
- `docker rmi <imagem>`: remove uma imagem pelo ID ou nome:tag. O Docker avisa se houver contêineres usando a imagem. [S1]
- `docker rmi $(docker images -f "dangling=true" -q)`: remove todas as imagens órfãs (dangling). [S1]

## 5. Dockerfile e build de imagem
- Um Dockerfile é um arquivo de texto com instruções que o Docker usa para construir uma imagem. [S1]
- `FROM <imagem>`: define a imagem base (obrigatório, primeira instrução). [S1]
- `RUN <comando>`: executa um comando durante o build (ex.: instalar pacotes). Cada RUN cria uma camada da imagem. [S1]
- `WORKDIR <diretorio>`: define o diretório de trabalho dentro do contêiner para instruções subsequentes. [S1]
- `COPY <origem> <destino>`: copia arquivos do host para dentro da imagem. [S1]
- `CMD <comando>`: define o comando padrão executado quando o contêiner inicia. Apenas um CMD é efetivo por Dockerfile. [S1]
- `EXPOSE <porta>`: documenta a porta em que o contêiner escuta (não publica a porta no host por si só). [S1]
- `ENV <chave>=<valor>`: define uma variável de ambiente dentro da imagem. [S1]
- `docker build -t <nome>:<tag> .`: constrói uma imagem a partir do Dockerfile no diretório atual, aplicando nome e tag. [S1]
- `docker buildx build -f <caminho/Dockerfile> -t <nome>:<tag> .`: especifica um caminho alternativo para o Dockerfile. [S1]
- Resultado esperado: após o build, `docker images` lista a nova imagem com o nome e tag informados. [S1]

## 6. Executar um servidor web (nginx) em contêiner
- `docker run -d -p 8080:80 nginx`: inicia o nginx em segundo plano, expondo a porta 80 do contêiner na porta 8080 do host. [S1]
- `docker run -d --name nginx -p 80:80 nginx`: inicia o nginx com nome fixo, expondo a porta 80 do contêiner na porta 80 do host. [S1]
- Resultado esperado: acessar `http://localhost:8080` (ou porta configurada) no navegador exibe a página padrão do nginx. [S1]

## 7. Limpeza e manutenção
- `docker system prune`: remove contêineres parados, redes não usadas e imagens sem uso (dangling). Pede confirmação; usar `-f` para forçar. [S1]
- `docker system prune -a`: remove também imagens não usadas (não apenas dangling). [S1]
- `docker system prune --volumes`: inclui volumes anônimos não usados na limpeza. [S1]
- `docker system prune --filter "until=24h"`: remove recursos criados há mais de 24 horas. [S1]
- Resultado esperado: o comando exibe quanto espaço em disco foi liberado. [S1]

## Open questions
- Nenhuma. Todos os comandos e passos de instalação foram verificados na documentação oficial do Docker.
