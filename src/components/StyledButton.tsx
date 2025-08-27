import { Pressable, Text, StyleSheet, PressableProps, DimensionValue, ColorValue, ViewStyle, TextStyle } from 'react-native';
import { GlobalTheme, ThemeColor } from "../constants/global-themes";

type StyledButtonProps = PressableProps & {
  text: string; 
  color?: ThemeColor; 
  rounded?: boolean;          
  width?: DimensionValue;     
  buttonStyles?: ViewStyle;      
  textStyle?: TextStyle;  
};

function StyledButton(props: StyledButtonProps) {
  const {
    text,
    color = 'primary',
    rounded = false,
    width = '100%',
    buttonStyles,
    textStyle,
    ...rest
  } = props;

  const borderStyles = rounded ? styles.rounded : styles.box;

  const allButtonStyles: ViewStyle = {
    width, 
    ...styles.button,
    ...borderStyles,
    backgroundColor: GlobalTheme.colors[color],
    ...buttonStyles,       
  };

  return (
    <Pressable style={allButtonStyles} {...rest}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 11,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounded: {
    borderRadius: GlobalTheme.radius.lg,
  },
  box: {
    borderRadius: GlobalTheme.radius.sm,
  },
  text: {
    color: GlobalTheme.colors.white,
    ...GlobalTheme.typography.medium,
    fontWeight: 'bold',
  },
});