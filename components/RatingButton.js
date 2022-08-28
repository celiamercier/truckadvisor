import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ImageButton from "./ImageButton";

export const STATUS_EMPTY = 'EMPTY';
export const STATUS_FILLED = 'FILLED';

const RatingButton = ({ rank, status, onPressed }) => {
    return (
        <ImageButton
            onPressed={() => onPressed(rank)}
            imageSource={status === STATUS_FILLED
                ? require('../images/star-fill.png')
                : require('../images/star-empty.png')}
            style={{ marginRight: 6 }}
        />
    );
}

RatingButton.propTypes = {
    rank: PropTypes.number,
    status: PropTypes.string,
    onPressed: PropTypes.func,
}

export default RatingButton;