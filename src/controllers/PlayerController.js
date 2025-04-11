import playerService from "../services/PlayerService.js";

// TODO: A cleaner approach to filtering searches by different criterias
export const playerController = {
    async getPlayers(req, res) {
        const { id, team, name, position, nation} = req.query;
        let players = [];

        if (id) {
            players = await playerService.getPlayerById(id);
        } else if (name) {
            players = await playerService.getPlayerByName(name);
        } else if (team && position) {
            players = await playerService.getPlayersByTeamAndPosition(team, position); 
        } else if (team) {
            players = await playerService.getPlayersByTeam(team); 
        } else if (position) {
            players = await playerService.getPlayersByPosition(position);
        } else if (nation) {
            players = await playerService.getPlayersByNation(nation);
        } else {
            players = await playerService.getPlayers();
        }

        if (players && players.length > 0) {
            return res.status(200).json({
                data: players
            });
        } else {
            return res.status(404).json({
                message: 'No players found matching the criteria.'
            })
        }
    },

    async addPlayer(req, res) {
        const playerDTO = req.body;
        const {data, error} = await playerService.addPlayer(playerDTO);
        if (data) {
            return res.status(201).json({
                message: 'Player added successfully.',
                data: data
            })
        } else {
            return res.status(400).json({
                message: 'Failed to add player.',
                error: error
            })
        }
    },

    async updatePlayer(req, res) {
        const updatedPlayerDTO = req.body;
        const playerId = req.params.id;

        const { data, error} = await playerService.updatePlayer(playerId, updatedPlayerDTO);
        if (data) {
            return res.status(200).json({
                message: 'Player updated successfully.',
                data: data
            })
        } else {
            return res.status(400).json({
                message: 'Failed to add player.',
                error: error
            })
        }
    }

    // TODO: Creating for DELETE the requests

};

export default playerController;