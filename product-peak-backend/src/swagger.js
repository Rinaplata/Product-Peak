const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Product Peak",
      description:
        "Product Peak es un clon de Product Hunt, la cual es una plataforma que permite a los usuarios descubrir y compartir nuevos productos y startups.",
      contact: {
        name: "Rina Plata y Andres de la hoz",
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
        },
      ],
    },
    apis: [
      `${__dirname}/routes/UserRoutes.js`,
      `${__dirname}/routes/ProductRoutes.js`,
      `${__dirname}/routes/CommentRoutes.js`,
      `${__dirname}/routes/RatingRoutes.js`,
    ],
  },
};

module.exports = swaggerOptions;
