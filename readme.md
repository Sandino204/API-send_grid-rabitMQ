# Documentação Envio de Inventarios

# Recursos

**API de search da VTEX e, utilizando conceitos de processamento em fila, enviar um email usando o Send_Grid com a quantidade de produtos disponíveis na loja**

(Editar o .env)

**SENDGRID_API_KEY = (chave da API do Send_Grid)**
**SENDER = (email cadastrado no Send_Grid)**
**DEFAULT_ACOUNT_NAME = (accountName default do VTEX)**
**DEFAULT_ENVIROMENT = (enviromen default do VTEX)**

# **Subescrever na loja default**

```
/post api/subscribeDefault
```

**Body Required:**

```
{
    "email": "email@email.com"
}
```

**Retorno**
```

{
    "success": true,
    "message": "Your email is subscribed"
}
```

# **Subescrever dinamicamente**

```
/post api/subscribe
```

**Body Required:**

```
{
    "email": "email@email.com",
    "acountName": "acountName",
    "enviroment": "enviroment"
}
```

**Retorno**
```

{
    "success": true,
    "message": "Your email is subscribed"
}
```