import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import RatingsView from "./RatingsView";
import { useDispatch, useSelector } from "react-redux";
import { addRank, cancelLastRank, selectLastPlayerRating } from "../store/gameSlice";

const PlayerView = ({ player }) => {

    const lastRating = useSelector(selectLastPlayerRating(player.id));

    return (
        <View style={{
            ...styles.container,
            backgroundColor: player.color,
        }}>
            <View style={{ flexDirection: 'column' }}>
                <View>
                    <Text style={styles.title}>{player.name}</Text>
                </View>
                <RatingsView
                    playerId={player.id}
                    canCancel={!!lastRating}
                />
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.text}>Moyenne: {lastRating ? lastRating.averageRating : '...'}/5</Text>
                <Text style={styles.text}>Nombre de clients: {lastRating ? lastRating.numberOfClients : 0}</Text>
            </View>
        </View>
    );
};

PlayerView.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
    })
};

export default PlayerView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10
    },
    title: {
        fontFamily: 'normal',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontFamily: 'monospace',
        fontSize: 20,
        marginTop: 10
    },
});