import React, { Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { getMyUserInfo, editUserInfo } from '../actions';

import EditInfoForm from '../components/forms/EditInfoForm';

const background = require('../assets/background/background-2.jpg');

class EditInfoScreen extends Component {
  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(values) {
    const {
      auth: { token, _id: userId },
      getMyUserInfoConnect,
      editUserInfoConnect,
      clearForm,
      navigation
    } = this.props;

    await editUserInfoConnect(token, userId, values);
    await getMyUserInfoConnect(token);

    clearForm();
    navigation.navigate('Home');
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={background} style={styles.imageBackgroundStyle}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.titleStyle}>Edit Info</Text>
          <KeyboardAvoidingView behavior="padding">
            <EditInfoForm onSubmit={this.onSubmitForm} navigation={navigation} />
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    marginVertical: 50,
    fontSize: 40,
    color: '#03A9F4',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
});

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  getMyUserInfoConnect: token => dispatch(getMyUserInfo(token)),
  editUserInfoConnect: values => dispatch(editUserInfo(values)),
  clearForm: () => dispatch(reset('editInfo'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInfoScreen);