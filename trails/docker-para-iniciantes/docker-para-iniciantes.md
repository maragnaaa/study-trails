---
topic: Docker para iniciantes
language: pt-BR
level: iniciante em Docker (sabe Linux e linha de comando)
kind: build
---
# Docker para iniciantes

Este guia ensina a instalar o Docker no Linux, usar os comandos essenciais da CLI, escrever um Dockerfile, construir uma imagem e rodar um servidor nginx em contêiner. É para quem já conhece Linux e linha de comando, mas não conhece Docker.

## Stack
- **Docker Engine** → roda e gerencia contêineres no Linux
- **Docker CLI** → comandos para interagir com o Docker (run, ps, images, build, etc.)
- **Dockerfile** → receita de texto para construir imagens
- **Imagem nginx** → servidor web de exemplo para rodar em contêiner

## Antes de começar
- Conhecimento de Linux e linha de comando (navegar pastas, criar e editar arquivos de texto).
- Um sistema Linux com acesso ao terminal e privilégios de sudo.
- Conexão à internet para baixar a chave GPG, o repositório apt e as imagens do Docker.
- Nenhuma instalação prévia de Docker é necessária.

---
### 1. Preparar o sistema e adicionar a chave GPG do Docker

Atualize os índices dos pacotes e instale as ferramentas base necessárias para baixar a chave GPG.

```
sudo apt update
sudo apt install ca-certificates curl
```

Crie a pasta que guardará a chave GPG do Docker e defina as permissões corretas.

```
sudo install -m 0755 -d /etc/apt/keyrings
```

Baixe a chave GPG oficial do Docker e torne-a legível.

```
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

> [!tip] Por quê?
> A chave GPG permite que o apt verifique a assinatura dos pacotes do Docker, garantindo que eles vieram da fonte oficial.

### 2. Adicionar o repositório apt do Docker

Crie o arquivo de fontes do apt que aponta para o repositório oficial do Docker.

```
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-\$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

Atualize os índices novamente para que o apt enxergue o novo repositório.

```
sudo apt update
```

Resultado esperado: nenhum erro e o apt lista o repositório do Docker entre as fontes disponíveis.

### 3. Instalar os pacotes do Docker Engine

Instale o Docker Engine, a CLI, o containerd e os plugins de build e compose.

```
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

> [!warning] Atenção
> Estes comandos são para Ubuntu. Em outra distribuição Linux, o caminho do repositório e o nome do pacote podem mudar.

### 4. Verificar a instalação

Confirme que o Docker está instalado e funciona executando o comando de versão e um contêiner de teste.

```
docker --version
docker run hello-world
```

Resultado esperado: `docker --version` exibe a versão instalada e `docker run hello-world` baixa a imagem de teste, a executa e mostra uma mensagem de confirmação.


---
### 5. Listar e baixar imagens

Liste as imagens já presentes no seu sistema.

```
docker images
```

Resultado esperado: uma tabela com as colunas REPOSITORY, TAG, IMAGE ID, CREATED e SIZE. Se não houver imagens, a tabela fica vazia.

Baixe uma imagem do Docker Hub sem criar um contêiner ainda.

```
docker pull nginx
```

Resultado esperado: o Docker mostra o progresso do download e termina com a mensagem "Status: Downloaded newer image for nginx:latest".

### 6. Rodar um contêiner e listar contêineres

Inicie um contêiner a partir da imagem nginx, executando em segundo plano e expondo a porta 80 do contêiner na porta 8080 do host.

```
docker run -d -p 8080:80 nginx
```

Resultado esperado: o Docker imprime o ID do contêiner.

Liste apenas os contêineres em execução.

```
docker ps
```

Resultado esperado: uma tabela mostrando o contêiner nginx com status "Up".

Liste todos os contêineres, incluindo os que pararam.

```
docker ps -a
```

> [!tip] Por quê?
> O `docker ps` mostra só os contêineres rodando. O `docker ps -a` mostra também os parados, úteis quando você precisa recriar ou remover um contêiner que não está mais ativo.

### 7. Parar e remover um contêiner

Pare o contêiner nginx usando o nome ou o ID obtido com `docker ps`.

```
docker stop nginx
```

Remova o contêiner parado.

```
docker rm nginx
```

Resultado esperado: o contêiner não aparece mais em `docker ps -a`.

### 8. Remover imagens

Liste as imagens locais para confirmar o nome e o ID da imagem nginx.

```
docker images
```

Remova a imagem nginx pelo nome ou ID.

```
docker rmi nginx
```

> [!warning] Atenção
> O Docker avisa e não remove a imagem se houver um contêiner (mesmo parado) que a esteja usando. Remova o contêiner primeiro com `docker rm`.

### 9. Limpar recursos não usados

Remova contêineres parados, redes não usadas e imagens órfãs (dangling) de uma só vez.

```
docker system prune
```

Confirme a remoção quando solicitado. Para pular a confirmação, use:

```
docker system prune -f
```

Resultado esperado: o Docker exibe quantos recursos foram removidos e quanto espaço em disco foi liberado.


---
### 10. Criar o Dockerfile com FROM, WORKDIR, COPY, CMD

Crie o arquivo `Dockerfile` seguindo as instruções em [[Dockerfile]]. Este passo cria a receita base da sua imagem própria.

> [!tip] Por quê?
> O Dockerfile é um arquivo de texto que o Docker lê para construir uma imagem automaticamente, sem criar o contêiner à mão.

### 11. Adicionar EXPOSE e ENV ao Dockerfile

Abra o arquivo `Dockerfile` e acrescente as instruções `EXPOSE` e `ENV`, conforme mostrado em [[Dockerfile]]. Isso documenta a porta exposta e define variáveis de ambiente dentro da imagem.

### 12. Construir a imagem com docker build

No diretório que contém o `Dockerfile`, execute o build passando um nome e uma tag para a imagem.

```
docker build -t minha-app:1.0 .
```

Resultado esperado: o Docker executa cada instrução do Dockerfile, cria camadas da imagem e termina com a mensagem "Successfully built" seguida do ID da imagem.

Confirme que a imagem apareceu na lista local.

```
docker images
```

Resultado esperado: a imagem `minha-app` com tag `1.0` aparece na tabela.

### 13. Rodar a imagem construída

Inicie um contêiner a partir da imagem que você acabou de construir, expondo a porta 80 do contêiner na porta 8080 do host.

```
docker run -d -p 8080:80 minha-app:1.0
```

Resultado esperado: o Docker imprime o ID do contêiner. Acesse `http://localhost:8080` no navegador para confirmar que o servidor está respondendo.

> [!warning] Atenção
> Se a porta 8080 já estiver em uso por outro programa, o comando falha. Escolha outra porta do host, por exemplo `docker run -d -p 8081:80 minha-app:1.0`.


---
### 14. Rodar o servidor nginx em contêiner

Inicie o nginx em segundo plano, expondo a porta 80 do contêiner na porta 8080 do host e dando um nome ao contêiner.

```
docker run -d --name meu-nginx -p 8080:80 nginx
```

Resultado esperado: o Docker imprime o ID do contêiner chamado `meu-nginx`.

### 15. Verificar o servidor no navegador

Acesse `http://localhost:8080` no navegador.

Resultado esperado: a página padrão de boas-vindas do nginx é exibida, confirmando que o servidor web está rodando dentro do contêiner e que o mapeamento de porta funciona.

### 16. Parar e remover o contêiner nginx

Pare o contêiner nginx.

```
docker stop meu-nginx
```

Remova o contêiner parado.

```
docker rm meu-nginx
```

Confirme que ele não aparece mais na lista.

```
docker ps -a
```

Resultado esperado: o contêiner `meu-nginx` não aparece mais, encerrando o guia.


---
## Estrutura final

```
meu-projeto/
├── Dockerfile   # receita de texto para construir a imagem própria (passos 10-11)
```

O resultado prático do guia é uma imagem Docker construída localmente (passo 12) e um contêiner nginx rodando e acessível em `http://localhost:8080` (passos 14-15). Nenhuma pasta de projeto fixa é exigida: você cria o `Dockerfile` em qualquer diretório de trabalho.

## Referências

- [Docker Documentation](https://docs.docker.com): documentação oficial do Docker, abrangendo instalação no Linux, referência da CLI (docker run, ps, images, stop, rm, rmi, system prune, build) e referência do Dockerfile (FROM, RUN, COPY, CMD, EXPOSE, ENV). Fonte verificada, idioma inglês.

