import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import routes from "./src/routes/index.js";
import errorHandler from "./src/middlewares/error-handler.js";
import logRequest from "./src/middlewares/log-request.js";

dotenv.config();

var app = express();

app.use(express.json());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Proiect NodeJs",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        }
    },
    apis: ["./src/routes/**.js", "./swagger/schemas.yaml"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

if (process.env.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

app.use(logRequest);

app.use(routes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
    console.log(
        `REST API server with env => ${process.env.NODE_ENV} ready at: ${process.env.HOST}:${process.env.PORT}`
    )
);

export default app;
