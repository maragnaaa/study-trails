# Plan: Docker para iniciantes
- Kind: build
- Language: pt-BR
- Level: iniciante em Docker (sabe Linux e linha de comando)

## Stack
- **Docker Engine** → roda e gerencia contêineres no Linux
- **Docker CLI** → comandos para interagir com o Docker (run, ps, images, build, etc.)
- **Dockerfile** → receita de texto para construir imagens
- **Imagem nginx** → servidor web de exemplo para rodar em contêiner

## Steps
| No. | Step | Block | Sub-guide | What the learner does or learns |
|-----|------|-------|-----------|---------------------------------|
| 1 | Preparar o sistema e adicionar a chave GPG do Docker | 1 | - | Instala dependências base, cria pasta de chaves e baixa a chave GPG oficial do Docker |
| 2 | Adicionar o repositório apt do Docker | 1 | - | Cria o arquivo /etc/apt/sources.list.d/docker.sources com o repositório oficial |
| 3 | Instalar os pacotes do Docker Engine | 1 | - | Instala docker-ce, docker-ce-cli, containerd.io, docker-buildx-plugin, docker-compose-plugin |
| 4 | Verificar a instalação | 1 | - | Executa docker --version e docker run hello-world para confirmar que o Docker funciona |
| 5 | Listar e baixar imagens | 2 | - | Usa docker images e docker pull para buscar uma imagem do Docker Hub |
| 6 | Rodar um contêiner e listar contêineres | 2 | - | Executa docker run e usa docker ps / docker ps -a para ver os contêineres |
| 7 | Parar e remover um contêiner | 2 | - | Usa docker stop e docker rm para encerrar e remover um contêiner |
| 8 | Remover imagens | 2 | - | Usa docker rmi para excluir imagens locais |
| 9 | Limpar recursos não usados | 2 | - | Usa docker system prune para remover contêineres, redes e imagens paradas |
| 10 | Criar o Dockerfile com FROM, WORKDIR, COPY, CMD | 3 | Dockerfile.md | Escreve o Dockerfile base para uma imagem própria |
| 11 | Adicionar EXPOSE e ENV ao Dockerfile | 3 | Dockerfile.md | Acrescenta porta exposta e variáveis de ambiente ao Dockerfile |
| 12 | Construir a imagem com docker build | 3 | - | Executa docker build -t nome:tag . para gerar a imagem |
| 13 | Rodar a imagem construída | 3 | - | Executa docker run na imagem recém-construída |
| 14 | Rodar o servidor nginx em contêiner | 4 | - | Usa docker run -d -p 8080:80 nginx com mapeamento de porta |
| 15 | Verificar o servidor no navegador | 4 | - | Acessa http://localhost:8080 e confirma a página padrão do nginx |
| 16 | Parar e remover o contêiner nginx | 4 | - | Para e remove o contêiner do nginx, encerrando o guia |

## Closing
- build: planned final folder structure (tree)
  - Dockerfile.md (sub-guide, passo 10-11)
  - Nenhuma pasta de projeto fixa; o aprendiz cria um Dockerfile em um diretório de trabalho próprio.
