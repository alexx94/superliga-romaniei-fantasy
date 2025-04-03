import playerService from "../services/PlayerService.js";

// TODO: A cleaner approach to filtering searches by different criterias
export const playerController = {
    async getPlayers(req, res) {
        const { team, name, position, nation} = req.query;
        let players = [];

        if (name) {
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
    }

    // TODO: Creating for POST, PUT, DELETE the requests
};

export default playerController;