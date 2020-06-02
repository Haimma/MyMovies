/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
Image,
Text,
View
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { MoviesListFetch } from "../actions";
import {styles} from './LoginStyles';
import MoviesScreen from './MoviesScreen';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            user: undefined, // user has not logged in yet
            name: undefined, // user has not logged in yet,
            usetType: undefined,
        };
    }

componentDidMount() {
    NetInfo.addEventListener((state) => {
        if (state.isConnected) {
            this.setState({ isConnected: true }, () => {
                this.props.MoviesListFetch();
            });
            GoogleSignin.configure({
                webClientId: '504497731834-94cnq9j0iekrd24q6gn2vc4580d4874v.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
                forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
                accountName: '', // [Android] specifies an account name on the device that should be used
                   });
        }
    });
}
  
signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      this.setState({
        user: info.user.photo,
        name:info.user.name,
        userType: 'google',
    });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('SIGN_IN_CANCELLED');
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('IN_PROGRESS');
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
        console.log(error);
      } else {
        // some other error happened
        console.log('other error happened');
        console.log(error);
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({
        user: undefined,
        name: undefined,
        userType: undefined,
    });
    } catch (error) {
      console.error(error);
    }
  };

render() {
    const { user, name, userType } = this.state;
    if (!this.state.isConnected) {
        return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>
            Please Check your Internet Connection...
            </Text>
        </View>
        );
    }
    return (
    <View style={styles.container}>
        { user && name
        ? // Show user info if already logged in
            <View style={styles.content}>
                <Text style={styles.header}>
                    Welcome {this.state.name}!
                </Text>
                <View style={styles.avatar}>
                    <Image source={{ uri: this.state.user }} style={styles.avatarImage} />
                </View>
                <MoviesScreen/>
            </View>
        : // Show Please log in message if not
            <View style={styles.content}>
                <Text style={styles.header}>
                    Welcome Stranger!
                </Text>
                <View style={styles.avatar}>
                    <Icon name= 'user-circle' size={100} color= 'rgba(0,0,0,.09)' />
                </View>
                <Text style={styles.text}>
                    Please log in to continue {'\n'}
                    to the awesomness
                </Text>
            </View>
        }         
        {/* Login buttons */}
        <View style={styles.buttons}>
            {userType !== 'google'
                ?
                <LoginButton
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log('login has error: ' + result.error);
                        } else if (result.isCancelled) {
                            console.log('login is cancelled.');
                        } else {
                            console.log('login');
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + data.accessToken)
                                    .then((response) => response.json())
                                    .then((json) => {
                                        this.setState({
                                            user:'https://graph.facebook.com/' + user.userID + '/picture?type=large',
                                            name:json.name,
                                            userType: 'facebook',
                                        });
                                    })
                                    .catch(() => {
                                        console.log('ERROR GETTING DATA FROM FACEBOOK');
                                    })
                                    console.log(data.accessToken.toString());
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => {
                    console.log('logout.');
                    this.setState({
                        user: undefined,
                        name: undefined,
                        userType: undefined,
                    })
                }}/>
                : null
            }
            {userType !== 'facebook'
                ?
                <Icon.Button
                    name='google'
                    backgroundColor='#DD4B39'
                    onPress={user? this.signOut : this.signIn}
                    {...iconStyles}
                >
                    {user ? 'Google Logout' : 'Google Sign in'}
                </Icon.Button>
                : null
            }

        </View>
    </View>
    );
}
}

const mapStateToProps = (state) => {
    return {
      moviesLists: state.moviesLists,
    };
  };

export default connect(mapStateToProps, {
    MoviesListFetch,
  })(Login);

const iconStyles = {
borderRadius: 10,
iconStyle: { paddingVertical: 5 },
}