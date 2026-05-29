export default {

    JWT_SECRET: process.env.JWT_SECRET ?? "SECRET",

    PORT: Number(process.env.PORT ?? 3000),

};