const { Service: ServiceModel } = require("../models/Service");
const mongoose = require("mongoose");

const serviceController = {

    create: async(req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            const response = await ServiceModel.create(service);

            res
             .status(201)
             .json({
                response, msg: "Serviço criado com sucesso!"
             });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        };
    },

    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find();

            res
             .json(services);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    },

    getService: async (req, res) => {
        try {
            // Obtenha o ID da URL
            const id = req.params.id;
    
            // Verifique se o ID é um formato válido de ObjectId >ERRO CHATO<
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res
                 .status(400)
                 .json({ msg: 'ID inválido' });
                return;
            }
    
            // Busque o documento pelo ID >função própria do Mongoose sem o {_id: id}<
            const service = await ServiceModel.findById(id);
    
            // Verifique se o serviço foi encontrado
            if (!service) {
                res
                 .status(404)
                 .json({ msg: 'Serviço não encontrado' });
                return;
            }
    
            // Responda com o documento encontrado em formato JSON
            res
             .json(service);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    },

    deleteService: async (req, res) => {
        try {
            // Obtenha o ID da URL
            const id = req.params.id;
    
            // Verifique se o ID é um formato válido de ObjectId >ERRO CHATO<
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res
                 .status(400)
                 .json({ msg: 'ID inválido' });
                return;
            }
    
            // Busque o documento pelo ID >função própria do Mongoose sem o {_id: id}<
            const service = await ServiceModel.findById(id);
    
            // Verifique se o serviço foi encontrado
            if (!service) {
                res
                 .status(404)
                 .json({ msg: 'Serviço não encontrado' });
                return;
            }

           const deletedService = await ServiceModel.findByIdAndDelete(id); 

            // Responda com o documento encontrado em formato JSON
            res
              .status(200)
              .json({ deletedService, message: 'Serviço removido com sucesso!' })

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    },

    updateService: async (req, res) => {
        try {
            const id = req.params.id;
    
            // Verifique se o ID é um formato válido de ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res
                .status(400)
                .json({ msg: 'ID inválido' });
                return;
            }
    
            const { name, description, price, image } = req.body;
    
            // Validações -> usando o patch é talvez não fosse necessario, mas para evitar qualquer problema:
            if (!name) {
                res
                  .status(422)
                  .json({ message: 'O nome é obrigatório!' });
                return;
            }
    
            if (!description) {
                res
                  .status(422)
                  .json({ message: 'A descrição é obrigatória!' });
                return;
            }
    
            if (!price) {
                res
                  .status(422)
                  .json({ message: 'O preço é obrigatório!' });
                return;
            }
    
            if (!image) {
                res
                  .status(422)
                  .json({ message: 'A imagem é obrigatória!' });
                return;
            }
    
            const updateData = {
                name,
                description,
                price,
                image,
            };
    
            // Busque o documento pelo ID e atualize-o
            const updatedService = await ServiceModel.findByIdAndUpdate(id, updateData);
    
            // Verifique se o serviço foi encontrado
            if (!updatedService) {
                res
                  .status(404)
                  .json({ msg: 'Serviço não encontrado' });
                return;
            }

            // Responda com o documento atualizado em formato JSON
            res
              .status(200)
              .json({ updatedService, message: 'Serviço atualizado com sucesso!' });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        }
    },
};

module.exports = serviceController;
