# Guia para o Dockerfile

- Crie um arquivo chamado `Dockerfile` em um diretório de trabalho vazio.
- Na primeira linha, escreva `FROM nginx` para usar o servidor web nginx como imagem base.
- Adicione `WORKDIR /usr/share/nginx/html` para definir o diretório de trabalho dentro do contêiner.
- Copie os arquivos do host para a imagem com `COPY . /usr/share/nginx/html`.
- Defina o comando padrão com `CMD ["nginx", "-g", "daemon off;"]` para que o nginx rode em primeiro plano quando o contêiner iniciar.
- Opcionalmente, adicione `EXPOSE 80` para documentar que o contêiner escuta na porta 80.
- Opcionalmente, adicione `ENV AMBIENTE=producao` para definir uma variável de ambiente dentro da imagem.
- O Dockerfile resultante fica assim (exemplo, não testado):
```
FROM nginx
WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html
EXPOSE 80
ENV AMBIENTE=producao
CMD ["nginx", "-g", "daemon off;"]
```
- Confirme que o arquivo se chama exatamente `Dockerfile`, com D maiúsculo e sem extensão.
- Para construir a imagem a partir deste Dockerfile, siga as instruções do passo 12 do guia principal.
- Após o build, rode a imagem com `docker run` conforme o passo 13.
