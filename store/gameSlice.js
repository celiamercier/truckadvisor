import { createSlice, current } from "@reduxjs/toolkit";
import { round } from "../utils/mathUtils";

const INITIAL_STATE = {
    players: [
        {
            id: 1,
            name: 'Joueur 1',
            color: '#ef9da3',
            ratingHistory: [],
            selectedRating: undefined,
        },
        {
            id: 2,
            name: 'Joueur 2',
            color: '#eecba9',
            ratingHistory: [],
            selectedRating: undefined,
        },
        {
            id: 3,
            name: 'Joueur 3',
            color: '#bae7bd',
            ratingHistory: [],
            selectedRating: undefined,
        },
        {
            id: 4,
            name: 'Joueur 4',
            color: '#ade1da',
            ratingHistory: [],
            selectedRating: undefined,
        }
    ]
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: INITIAL_STATE,
    reducers: {
        addRank: (state, action) => {
            const player = getPlayerFromGameState(state, action.payload.playerId);
            const selectedRank = player.selectedRating;
            const history = player.ratingHistory;
            const lastRating = history.length === 0 ? undefined : history[history.length - 1];

            let newAverageRating;
            if (lastRating) {
                newAverageRating = (lastRating.averageRating * lastRating.numberOfClients + selectedRank) / (lastRating.numberOfClients + 1);
            } else {
                newAverageRating = selectedRank;
            }

            history.push({
                averageRating: round(newAverageRating),
                numberOfClients: lastRating ? lastRating.numberOfClients + 1 : 1,
            });
            player.selectedRating = undefined;
        },
        cancelLastRank: (state, action) => {
            const player = getPlayerFromGameState(state, action.payload.playerId);
            const history = player.ratingHistory;

            if (history.length > 0) {
                history.pop();
            }
            player.selectedRating = undefined;
        },
        selectRank: (state, action) => {
            const player = getPlayerFromGameState(state, action.payload.playerId);
            player.selectedRating = action.payload.value;
        },
        resetGame: (state) => INITIAL_STATE,
    },
});

const getPlayerFromGameState = (state, playerId) => {
    return state.players
        .find(player => player.id === playerId);
}

export const selectAllPlayers = (state) => state.game.players.map(player => ({
        id: player.id,
        name: player.name,
        color: player.color
    }));

export const selectLastPlayerRating = (playerId) =>
    ((state) => {
        const history =  getPlayerFromGameState(state.game, playerId).ratingHistory;
        return history.length === 0
            ? undefined
            : history[history.length - 1]
    });

export const selectPlayerSelectedRating = (playerId) =>
    ((state) => getPlayerFromGameState(state.game, playerId).selectedRating);

export const { addRank, cancelLastRank, selectRank, resetGame } = gameSlice.actions;

export default gameSlice.reducer;