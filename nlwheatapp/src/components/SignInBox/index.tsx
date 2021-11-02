import React from "react";
import { View } from "react-native";
import { useAuth } from '../../Hooks/auth';

import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth();

  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoading={isSigningIn}
      >
        Enviar
      </Button>
    </View>
  );
}