import { View, StyleSheet } from "react-native";
import { LabeledTextInput } from "@components/LabledTextInput";
import StyledButton from "@components/StyledButton";
import { StyledText } from "@components/StyledText";
import { useUpdateSignUpState } from "@db/hooks/auth";

//TODO: Revamp generated layout and implement signup step logic

export default function CreateProfile() {
  const { mutate: mutateSignUpState } = useUpdateSignUpState();
  const handleFinish = () => {
    mutateSignUpState("complete");
  };

  return (
    <View style={styles.container}>
      <StyledText text="Tell us a bit more about you" font="large" />
      <LabeledTextInput label="Address" placeholder="Enter your address" />
      <LabeledTextInput label="Bio" placeholder="Short bio" multiline />
      <LabeledTextInput label="Contact Info" placeholder="Phone or email" />
      <StyledButton text="Upload Picture" onPress={() => {}} />
      <StyledButton text="Finish" onPress={handleFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
