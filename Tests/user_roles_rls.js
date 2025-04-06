import supabase from '../src/config/supabase.js';

// testing if RLS policy is working properly, it shouldn't return anything if it was set up correctly, 
// but permisison denied. In SQL Editor it runs, but here it shouldn't because we dont't have permission

async function getUserRoles() {
    let { data, error } = await supabase
        .from('user_roles')
        .select();
    
    if (error) {
        console.log(error);
    }
    else console.log(data);
}

getUserRoles();