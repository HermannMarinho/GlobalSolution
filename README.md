# Como Executar a Aplicação Completa - Global Solution

Este guia fornece as instruções passo a passo para configurar e executar a aplicação completa, incluindo o back-end (Java/Jersey) e o front-end (React).

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados e configurados em sua máquina:

- **Java 17 ou superior:** Para executar o back-end.
- **Maven 3.8 ou superior:** Para compilar o projeto Java.
- **Node.js 18 ou superior:** (que inclui o `npm`) para executar o front-end.
- **Acesso a um banco de dados Oracle:** As credenciais de acesso devem ser configuradas.

---

## Passo 1: Configurar o Banco de Dados

A aplicação precisa de tabelas específicas no banco de dados Oracle para funcionar.

1.  **Acesse seu banco de dados Oracle.**
2.  **Execute o script SQL** que está no arquivo: `server/schema_gs.sql`.

Isso criará as tabelas `abrigo`, `ocorrencia` e `pessoa` com a estrutura correta.

---

## Passo 2: Rodar o Back-end (Servidor Java)

O back-end é responsável por toda a lógica de negócio e comunicação com o banco de dados. Após a nossa última alteração, ele roda de forma independente, sem precisar de um servidor externo como o Tomcat.

Existem duas maneiras de iniciá-lo:

### Método A: Via Terminal (Recomendado)

1.  **Abra um terminal** e navegue até a pasta `server`:
    ```bash
    cd server
    ```
2.  **Compile e empacote o projeto** com o Maven. Este comando irá baixar as dependências e criar um arquivo `.jar` executável.
    ```bash
    mvn clean install
    ```
3.  Após a conclusão, navegue até a pasta `target` que foi criada:
    ```bash
    cd target
    ```
4.  **Execute o servidor** com o comando `java -jar`:
    ```bash
    java -jar gs-backend-1.0-SNAPSHOT.jar
    ```

O terminal deverá exibir a mensagem: `Jersey app started with endpoints available at http://localhost:8080/api`. **Deixe este terminal aberto** enquanto estiver usando a aplicação.

### Método B: Via IntelliJ IDEA

1.  **Abra o IntelliJ** e vá em `File > Open...`.
2.  Selecione a pasta `server` para importá-la como um projeto Maven.
3.  Aguarde o IntelliJ sincronizar as dependências.
4.  Navegue até o arquivo `Main.java` (`src/main/java/br/com/projeto/Main.java`).
5.  **Clique com o botão direito** dentro do arquivo e selecione **`Run 'Main.main()'`**.

O servidor será iniciado, e você verá a mesma mensagem de confirmação no console do IntelliJ.

---

## Passo 3: Rodar o Front-end (Aplicação React)

Com o back-end rodando, você pode iniciar a interface do usuário.

1.  **Abra um novo terminal** (deixe o terminal do back-end rodando).
2.  Navegue até a pasta `client`:
    ```bash
    cd client
    ```
3.  **Instale as dependências** do projeto (só é necessário na primeira vez):
    ```bash
    npm install
    ```
4.  **Inicie o servidor de desenvolvimento** do React:
    ```bash
    npm run dev
    ```

O terminal irá indicar que a aplicação está disponível, geralmente em `http://localhost:5173`. Abra este endereço no seu navegador.

---

## Conclusão

Com ambos os servidores (back-end e front-end) rodando, a aplicação estará totalmente funcional e pronta para uso.
