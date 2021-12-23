# Autenticação JWT

É estritamente necessário alguma forma de autenticação entre a API do SBT e da Stayfilm, visando a segurança para as APIs.
Dito isso, precisamos usar uma forma de autenticação. Neste projeto, usamos um exemplo com Passport e JWT (JSON Web Token).

Para que o SBT comunique com a API da Stayfilm, ele precisará requisitar um token utilizando um usuário e senha.
Com esse token, ele conseguira requisitar os outros endpoints enviando o mesmo pelo header Authentication.
Esse token também possui um tempo de expiração, após o token expirar, um novo deve ser requisitado.

## Passo a passo:

- 1. [Criando entidade User](https://github.com/deyvidholz/ts-express-typeorm-boilerplate/blob/main/src/modules/user/user.entity.ts) (usando TypeORM)
- 2. [Método para criptografar a senha do usuário](https://github.com/deyvidholz/ts-express-typeorm-boilerplate/blob/main/src/helpers/crypt.helper.ts)
- 3. [Configurando Passport e JWT](https://github.com/deyvidholz/ts-express-typeorm-boilerplate/blob/main/src/app.ts) (Método setupPassport, linha 33)
- 4. [Criando e autenticando usuário](https://github.com/deyvidholz/ts-express-typeorm-boilerplate/blob/main/src/modules/user/user.service.ts) (métodos: create e auth)

## 1. Criando entidade User

Utilizando TypeORM, criamos o schema para o usuário com os campos necessários.

## 2. Método para criptografar a senha do usuário

Com `bcryptjs`, podemos criptografar a senha do usuário e quando o mesmo fizer login, verificar se a senha é válida.

## 3. Configurando Passport e JWT

O código abaixo, configura o Passport/JWT utilizando uma Secret Key e criando um middleware para o `Express`.

```
const extractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWTOptions = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
};

let strategy = new JWTStrategy(JWTOptions, async function (
  JWTPayload,
  next
) {
  const id = JWTPayload.id;
  const user = await userRepository().findOne(id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
this.express.use(passport.initialize());
```

## 4. Criando e autenticando usuário

Para criar o usuário é simples, basta criar um registro no banco de dados criptografando a senha.
Já para autenticar, é preciso verificar se a senha do usuário está correta (`bcryptjs`) e caso esteja, criar um token JWT para que as requisições possam ser feitas.
