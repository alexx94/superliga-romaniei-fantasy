import playerRepository from "../repository/PlayerRepository.js";


// Modify this file as I continue building the Repository file
const playerService = {
    async getPlayers() {
        return await playerRepository.findAll();
    },

    async getPlayerById(id) {
        return await playerRepository.findById(id);
    },

    async getPlayerByName(name) {
        return await playerRepository.findPlayerByName(name);
    },

    async getPlayersByTeam(team) {
        return await playerRepository.findPlayersByTeam(team);
    },

    async getPlayersByPosition(position) {
        return await playerRepository.findPlayersByPosition(position);
    },

    async getPlayersByNation(nation) {
        return await playerRepository.findPlayersByNation(nation);
    },

    async getPlayersByTeamAndPosition(team, position) {
        return await playerRepository.findPlayersByTeamAndPosition(team, position);
    },

    async addPlayer(player) {
        return await playerRepository.save(player);
    },

    async updatePlayer(id, updatedPlayer) {
        const existingPlayer = await playerRepository.findById(id);

        if (existingPlayer) {
            return await playerRepository.update(id, updatedPlayer);
        }
        return null;
    }
};

export default playerService;