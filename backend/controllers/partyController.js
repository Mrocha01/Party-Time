const PartyModel = require('../models/Party');
const mongoose = require("mongoose");

const checkPartyBudget = (budget, services) => {
    
    const priceSum = services.reduce((sum, service) => sum + service.price, 0);

    if(priceSum > budget) {
        return false;
    };

    return true;
};

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            if(party.services && !checkPartyBudget(party.budget, party.services)) {
                res
                 .status(406)
                 .json({ msg: 'O seu Budget é insuficiente para todos os serviços!' });
                return;
            };

            const response = await PartyModel.create(party);

            res
             .status(201)
             .json({
                response, msg: "Festa criada com sucesso!"
             });
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        };
    },

    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();

            res
             .json(parties);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        };
    },

    getParty: async (req, res) => {
        try {
            // Obtenha o ID da URL
            const id = req.params.id;
    
            // Verifique se o ID é um formato válido de ObjectId >ERRO CHATO<
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res
                 .status(400)
                 .json({ msg: 'ID inválido' });
                return;
            };
    
            // Busque o documento pelo ID >função própria do Mongoose sem o {_id: id}<
            const party = await PartyModel.findById(id);
    
            // Verifique se o serviço foi encontrado
            if (!party) {
                res
                 .status(404)
                 .json({ msg: 'Festa não encontrada' });
                return;
            };
    
            // Responda com o documento encontrado em formato JSON
            res
             .json(party);

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        };
    },

    deleteParty: async (req, res) => {
        try {
            // Obtenha o ID da URL
            const id = req.params.id;
    
            // Verifique se o ID é um formato válido de ObjectId >ERRO CHATO<
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res
                 .status(400)
                 .json({ msg: 'ID inválido' });
                return;
            };
    
            // Busque o documento pelo ID >função própria do Mongoose sem o {_id: id}<
            const party = await PartyModel.findById(id);
    
            // Verifique se o serviço foi encontrado
            if (!party) {
                res
                 .status(404)
                 .json({ msg: 'Festa não encontrada' });
                return;
            };

           const deletedParty = await PartyModel.findByIdAndDelete(id);

            // Responda com o documento encontrado em formato JSON
            res
              .status(200)
              .json({ deletedParty, message: 'Festa removida com sucesso!' })

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        };
    },

    updateParty: async (req, res) => {
        try {
             // Obtenha o ID da URL
             const id = req.params.id;

              // Verifique se o ID é um formato válido de ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res
                .status(400)
                .json({ msg: 'ID inválido' });
                return;
            };

             const { title,
                author,
                description,
                budget,
                image,
                services } = req.body;
    
            // Validações -> usando o patch é talvez não fosse necessario, mas para evitar qualquer problema:
            if (!title) {
                res
                  .status(422)
                  .json({ message: 'O titulo da festa é obrigatório!' });
                return;
            };

            if (!author) {
                res
                  .status(422)
                  .json({ message: 'O Dono da festa é obrigatório!' });
                return;
            };
    
            if (!description) {
                res
                  .status(422)
                  .json({ message: 'A descrição é obrigatória!' });
                return;
            };
    
            if (budget <= 0) {
                res
                  .status(422)
                  .json({ message: 'O orçamento da festa é obrigatório!' });
                return;
            };
    
            if (!image) {
                res
                  .status(422)
                  .json({ message: 'A imagem é obrigatória!' });
                return;
            };

            if (services.length <= 0) {
                res
                  .status(422)
                  .json({ message: 'A escolha dos serviços é obrigatória!' });
                return;
            };

             const updateData = {
                title,
                author,
                description,
                budget,
                image,
                services
            };

            if(updateData.services && !checkPartyBudget(updateData.budget, updateData.services)) {
                res
                 .status(406)
                 .json({ msg: 'O seu Budget é insuficiente para todos os serviços!' });
                return;
            };

             // Busque o documento pelo ID e atualize-o
             const updateParty = await PartyModel.findByIdAndUpdate(id, updateData);
    
             // Verifique se a festa foi encontrada
             if (!updateParty) {
                 res
                   .status(404)
                   .json({ msg: 'Festa não encontrada!' });
                 return;
             }
 
             // Responda com o documento atualizado em formato JSON
             res
               .status(200)
               .json({ updateParty, message: 'Festa atualizada com sucesso!' });
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Erro interno do servidor' });
        };
    },

}

module.exports = partyController;