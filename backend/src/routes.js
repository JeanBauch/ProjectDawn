const express = require('express'); // Importa o express
const { celebrate, Segments, Joi } = require('celebrate'); 

const TeamController = require('./controllers/TeamControllers');
const ProjectController = require('./controllers/ProjectControllers');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();    // Desacoplando as rotas do express, em uma nova variavel

routes.post('/sessions', SessionController.create);

routes.get('/teams', TeamController.index);

routes.post('/teams', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , TeamController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index);

routes.get('/projects', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number(),
    })
}),ProjectController.index);

// Fazer do novo projeto...
routes.post('/projects', ProjectController.create);


routes.delete('/projects/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProjectController.delete);

module.exports = routes;