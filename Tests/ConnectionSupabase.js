import supabase from '../src/config/supabase.js';

// testing if supabase connection is working
// general test, just to see if the connection was set up correct, no roles or security measures yet

const playerTable = 'superliga_ro';

async function findPlayers() {
    let { data: superliga_ro, error } = await supabase
        .from('superliga_ro')
        .select();
    
    if (error) {
        console.log(error);
    }
    else console.log(superliga_ro);
}


async function findPlayerByName(name) {
    let { data: superliga_ro, error} = await supabase
        .from('superliga_ro')
        .select()
        .eq('player', name);
    
    if (error) {
      console.log(error);
    }
    else console.log(superliga_ro);
}

findPlayerByName('Denis Alibec');

