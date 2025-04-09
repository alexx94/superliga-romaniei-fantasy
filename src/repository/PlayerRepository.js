import supabase from '../config/supabase.js';

const playerTable = 'superliga_ro';


// TODO: I can make different criterias to perform searches, after nations, goals etc. to filter results even further
//       and provide more detailed analytics for users

// TODO: Position criteria, for those with multiple position, just check if it contains the desired position instead
const playerRepository = {
    async findAll() {
        let { data: superliga_ro, error } = await supabase
            .from(playerTable)
            .select();
        return superliga_ro;
    },

    async findPlayerByName(name) {
        let { data: superliga_ro, error} = await supabase
            .from(playerTable)
            .select()
            .eq('player', name);
        return superliga_ro;
    },

    async findPlayersByTeam(team) {
        let { data: superliga_ro, error} = await supabase
            .from(playerTable)
            .select()
            .eq('team', team);
        return superliga_ro;
    },

    async findPlayersByPosition(position) {
        let { data: superliga_ro, error} = await supabase
            .from(playerTable)
            .select()
            .eq('position', position);
        return superliga_ro;
    },

    async findPlayersByNation(nation) {
        let { data: superliga_ro, error} = await supabase
            .from(playerTable)
            .select()
            .eq('nation', nation);
        return superliga_ro;
    },

    async findPlayersByTeamAndPosition(team, position) {
        let { data: superliga_ro, error} = await supabase
            .from(playerTable)
            .select()
            .eq('team', team)
            .eq('position', position);
        return superliga_ro;
    },

    //TODO: Adding other functions to INSERT, UPDATE, DELETE players, which will be used by auth users with admin role
    //      only after verification by the backend that they have admin role, otherwise you can't perform those actions,
    //      or even access the /admin/ route in frontent, restricting entire use
    //TODO: UPSERT, if i wish to include in bulk multiple players later on, maybe via a file too etc.
    async save(player) {
        console.log(player);
        let { data, error} = await supabase
            .from(playerTable)
            .insert([
                {
                    player: player.player,
                    team: player.team,
                    position: player.position,        
                    age: player.age,
                    games: player.games,
                    games_starts: player.games_starts,
                    minutes: player.minutes,
                    goals: player.goals,
                    assists: player.assists,
                    goals_pens: player.goals_pens,
                    pens_made: player.pens_made,
                    cards_yellow: player.cards_yellow,
                    cards_red: player.cards_red,
                    nation: player.nation
                }
            ])
            .select();
        
        console.log('DATA: ', data);
        return {data, error};
    }
};

export default playerRepository;