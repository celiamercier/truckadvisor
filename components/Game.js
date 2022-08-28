import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import PlayerView from "./PlayerView";
import ResetModal from "./ResetModal";
import { selectAllPlayers } from "../store/gameSlice";

export default function Game() {

    const players = useSelector(selectAllPlayers);

    const [isModalOpened, setIsModalOpened] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.playersContainer}>
                { players.map(player => (
                    <PlayerView key={player.id} player={player} />
                )) }
            </View>
            <View>
                <Button
                    title="Nouvelle partie"
                    onPress={() => setIsModalOpened(true)}
                />
            </View>
            <ResetModal
                isVisible={isModalOpened}
                onClose={() => setIsModalOpened(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    playersContainer: {
        flex: 1,
        flexDirection: 'column',
    }
});
