import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

const ImageButton = ({onPress, onBlur, buttonStyle, imagePath, imageStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} onBlur={onBlur} style={buttonStyle}>
      <Image source={imagePath} style={imageStyle} />
    </TouchableOpacity>
  );
};

export default ImageButton;
