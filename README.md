
## Billetera Electrónica API
Esta es una API RESTful desarrollada en NestJS y PostgreSQL utilizando TypeORM, que permite a los usuarios realizar operaciones básicas de una billetera electrónica para el manejo de criptomonedas, según requerimiento de prueba técnica.

## Tecnologías utilizadas
Lenguaje de programación: TypeScript
Base de datos: PostgreSQL
Framework: NestJS (Node.js)

## Requerimientos previos
Asegúrate de tener instalado lo siguiente:

Node.js / npm
PostgreSQL

## Configuración del proyecto
1. Clona el repositorio o descarga el código fuente del proyecto.
git clone https://github.com/SergioArr/CryptoWallet.git

2. Instala las dependencias del proyecto.
npm install

3. Configura las variables de ambiente y base de datos en el .ENV


## Correr app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Probar la app
Puedes ir al enlace: http://localhost:3000/crypto (swagger)
o utilizando postman puedes importar la colleción: Wallet-API incluida dentro del proyecto.

## Endpoints de la API
A continuación se detallan los endpoints disponibles en la API:

GET /cryptocurrency/{id}: Obtiene información de una criptomoneda específica.
POST /transaction: Persiste una transacción.
GET /transaction/sender/{sender}: Obtiene el historial de transacciones del remitente especificado.
GET /transaction/receiver/{receiver}: Obtiene el historial de transacciones del receptor especificado.

