import Entypo from "@expo/vector-icons/Entypo";
import { ReactNode, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputChangeEvent,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

type IconInputProps = {
  icon?: ReactNode;
  placeholder?: string;
  inputStyles?: StyleProp<TextStyle>;
  isPassword?: boolean;
  value?: string | undefined;
  onChange?: (e: TextInputChangeEvent) => void;
};

const coral = "#fe696e";

const IconInput = ({
  icon,
  placeholder,
  inputStyles,
  isPassword,
  value,
  onChange,
}: IconInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      {icon}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPassword && !show}
        autoCorrect={!isPassword}
        value={value}
        onChange={onChange}
        style={{
          ...styles.input,
          ...inputStyles,
        }}
      />
      {isPassword ? (
        <TouchableOpacity
          onPress={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <Entypo name="eye" size={24} color="black" />
          ) : (
            <Entypo name="eye-with-line" size={24} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 5,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: coral,
  },
  input: {
    // width: "100%",
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
  },
});

export default IconInput;
