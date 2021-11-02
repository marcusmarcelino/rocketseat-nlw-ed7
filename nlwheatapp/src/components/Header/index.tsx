import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { UserFoto } from '../UserFoto';
import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../Hooks/auth';


export function Header() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        {user &&
          <TouchableOpacity onPress={signOut} >
            <Text style={styles.logoutText}>
              Sair
            </Text>
          </TouchableOpacity>
        }

        <UserFoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}