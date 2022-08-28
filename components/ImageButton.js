import PropTypes from "prop-types";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const ImageButton = ({ onPressed, imageSource, isDisabled = false, style }) => {
    return (
        <TouchableOpacity
            style={{
                ...style,
                opacity: isDisabled ? 0.2 : 1,
            }}
            onPress={onPressed}
            disabled={isDisabled}
        >
            <Image style={styles.img} source={imageSource} />
        </TouchableOpacity>
    );
}

ImageButton.propTypes = {
    onPressed: PropTypes.func,
    imageSource: PropTypes.any,
    isDisabled: PropTypes.bool,
    style: PropTypes.object,
}

const styles = StyleSheet.create({
    img: {
        width: 32,
        height: 32,
    }
});

export default ImageButton;