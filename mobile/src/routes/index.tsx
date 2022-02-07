import React, {useContext} from 'react';

import AuthRoutes from './auth.routes'; //Rotas para autenticação (abertas - login )
import AppRoutes from './app.routes'; //Rotas fechadas
import AuthContext from '@contexts/auth';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Routes: React.FC = () => {
  const {signed, loading} = useContext(AuthContext);

  if (loading) {
    const styles = StyleSheet.create({
      loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
