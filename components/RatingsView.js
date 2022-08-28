import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from "react-native";
import RatingButton, { STATUS_EMPTY, STATUS_FILLED } from "./RatingButton";
import PropTypes from "prop-types";
import ImageButton from "./ImageButton";
import { useDispatch, useSelector } from "react-redux";
import { addRank, cancelLastRank, selectPlayerSelectedRating, selectRank } from "../store/gameSlice";

const RatingsView = ({ playerId, canCancel }) => {

    const selectedRating = useSelector(selectPlayerSelectedRating(playerId));

    const dispatch = useDispatch();

    const ratings = useMemo(() => {
        return [
            { rank: 1, status: selectedRating ? STATUS_FILLED : STATUS_EMPTY },
            { rank: 2, status: selectedRating && selectedRating >= 2 ? STATUS_FILLED : STATUS_EMPTY },
            { rank: 3, status: selectedRating && selectedRating >= 3 ? STATUS_FILLED : STATUS_EMPTY },
            { rank: 4, status: selectedRating && selectedRating >= 4 ? STATUS_FILLED : STATUS_EMPTY },
            { rank: 5, status: selectedRating && selectedRating === 5 ? STATUS_FILLED : STATUS_EMPTY },
        ];
    }, [selectedRating]) ;

    return (
        <View style={styles.container}>
            <View style={styles.stars}>
                { ratings.map(rating => (
                    <RatingButton
                        key={rating.rank}
                        rank={rating.rank}
                        status={rating.status}
                        onPressed={() => dispatch(selectRank({ playerId, value: rating.rank }))}
                    />
                ))}
            </View>
            <View style={styles.buttons}>
                <ImageButton
                    onPressed={() => dispatch(addRank({ playerId: playerId }))}
                    imageSource={require('../images/bell.png')}
                    isDisabled={!selectedRating}
                    style={{ marginRight: 14 }}
                />
                <ImageButton
                    onPressed={() => dispatch(cancelLastRank({ playerId: playerId }))}
                    imageSource={require('../images/cancel.png')}
                    isDisabled={!canCancel}
                />
            </View>
        </View>
    );
}

RatingsView.propTypes = {
    playerId: PropTypes.number,
    canCancel: PropTypes.bool,
}


export default RatingsView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
    },
    buttons: {
        flexDirection: 'row',
    },
});