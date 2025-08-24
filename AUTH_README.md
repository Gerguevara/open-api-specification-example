# Authentication Endpoint

Se ha agregado un endpoint dummy para autenticación de usuarios con JWT.

## Endpoint de Autenticación

### POST /v1/auth/login

Autentica un usuario y retorna un token JWT.

#### Request Body:
```json
{
  "email": "demo@gmail.com",
  "password": "password123"
}
```

#### Response (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "demo@gmail.com",
    "age": 30
  }
}
```

## Usuarios de Prueba

Puedes usar estos usuarios para probar la autenticación:

1. **Email:** `demo@gmail.com` - **Password:** `password123`
2. **Email:** `jane@example.com` - **Password:** `secret456`

## Uso del Token JWT

Para acceder a endpoints protegidos, incluye el token en el header Authorization:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## Endpoints Protegidos

Los siguientes endpoints requieren autenticación JWT:

- `GET /v1/users/:id` - Obtener usuario por ID (ahora requiere autenticación)

## Ejemplo de Uso

### 1. Autenticar usuario
```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "demo@gmail.com", "password": "password123"}'
```

### 2. Usar el token para acceder a endpoint protegido
```bash
curl -X GET http://localhost:3000/v1/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Implementación

- **Archivo de rutas:** `src/routes/v1/auth.js`
- **Middleware de autenticación:** `src/middleware/auth.js`
- **OpenAPI spec actualizado:** `openapi.yaml`

## Nota Importante

Esta es una implementación dummy para propósitos de demostración. En un entorno de producción:

1. Usa una librería JWT apropiada como `jsonwebtoken`
2. Implementa un sistema de hash de contraseñas seguro (bcrypt)
3. Usa variables de entorno para claves secretas
4. Implementa manejo adecuado de errores y logs
5. Considera refresh tokens para mayor seguridad
