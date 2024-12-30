/*
Legacy PVP Titles: A TSwow Mod by NateB-n8b

Files Needed
livescripts/titles/legacy-pvp.ts
Register the livescript path and events in livescripts/livescripts.ts

Use
1. Update the total number of kills for each rank, if needed. 
2. Run "build livescripts"
*/

//Define a constant dictionary to map the number of kills required to the respective Alliance & Horde title IDs.
//Each key is the number of kills, and the value is an array: [Alliance Title ID, Horde Title ID, Alliance].
const LEGACY_PVP_TITLES = CreateDictionary<number, TSArray<number>>({
    10: [1, 15], //Private (Alliance), Scout (Horde)
    100: [2, 16], //Corporal (Alliance), Grunt (Horde)
    250: [3, 17], //Sergeant (Alliance), Sergeant (Horde)
    500: [4, 18], //Master Sergeant (Alliance), Senior Sergeant (Horde)
    1000: [5, 19], //Sergeant Major (Alliance), First Sergeant (Horde)
    2000: [6, 20], //Knight (Alliance), Stone Guard (Horde)
    4500: [7, 21], //Knight-Lieutenant (Alliance), Blood Guard (Horde)
    7500: [8, 22], //Knight-Captain (Alliance), Legionnaire (Horde)
    12500: [9, 23], //Knight-Champion (Alliance), Centurion (Horde)
    20000: [10, 24], //Lieutenant Commander (Alliance), Champion (Horde)
    30000: [11, 25], //Commander (Alliance), Lieutenant General (Horde)
    45000: [12, 26], //Marshal (Alliance), General (Horde)
    65000: [13, 27], //Field Marshal (Alliance), Warlord (Horde)
    100000: [14, 28], //Grand Marshal (Alliance), High Warlord (Horde)
});

//Export a function that registers an event for handling player total honor kills.
export function RegisterPlayerTotalHonerKills(events: TSEvents) {
    //Register an event listener for when a player makes a PvP kill.
    events.Player.OnPVPKill((killer) => {
        //Get the total lifetime PvP kills of the player who made the kill.
        let kills = killer.GetLifetimeKills();

        //Check if there is a title associated with the player's total kills.
        if (LEGACY_PVP_TITLES[kills]) {
            //If the player is from the Alliance faction:
            if (killer.IsAlliance()) {
                //Retrieve the Alliance title ID for the given number of kills.
                let titleID = LEGACY_PVP_TITLES[kills];
                //Set the player's known title to the retrieved Alliance title ID.
                killer.SetKnownTitle(titleID[0]);
            }
            //If the player is from the Horde faction:
            else {
                //Retrieve the Horde title ID for the given number of kills.
                let titleID = LEGACY_PVP_TITLES[kills];
                //Set the player's known title to the retrieved Horde title ID.
                killer.SetKnownTitle(titleID[1]);
            }
        }
    });
}