import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { validateAll } from 'indicative/validator';
import Axios from 'axios';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            userData: '',
            error: {}
        };
    }

    registerUser = async(data)=>{
        const url = ''

        const rules = {
          name: 'required|string',
          email: 'required|email',
          password: 'required|string|min:8|confirmed'
        }
    
        const messages = {
          required: (field) => `${field} is required`,
          'email.email': 'The email syntax is example@example.com',
          'password.confirmed': 'The password did not match',
          'password.min': 'Password is too short'
        }
    
        try{
            await validateAll(data, rules, messages);
        //   const response = await Axios.post(url, {
        //     name: data.name,
        //     emain: data.email,
        //     password: data.password            
        //   })

        //   this.setState({ userData: response })
        }catch(errors){
            const formattedErrors = {}
            errors.forEach(err => formattedErrors[err.field] = err.message);
            this.setState({error : formattedErrors})
        }
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                {/* <StatusBar style="auto" /> */}
                <View style={{backgroundColor:'black', padding:10, marginBottom:20}}>
                    <Text style={{fontSize: 25, color:'white', alignSelf:'center'}}> Register Form </Text>
                </View>

                <Hoshi
                    label={'Name'}
                    style={{marginBottom:20}}
                    backgroundColor={'#fff'}
                    borderColor={'#b76c94'}
                    borderHeight={3}
                    inputPadding={16}
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                />
                {
                    this.state.error['name'] && <Text style={{fontSize:25, color:'red'}}> { this.state.error['name'] } </Text>
                }
                
                <Hoshi
                    label={'E-mail'}
                    style={{marginBottom:20}}
                    backgroundColor={'#fff'}
                    borderColor={'#b76c94'}
                    borderHeight={3}
                    inputPadding={16}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                />
                {
                    this.state.error['email'] && <Text style={{fontSize:25, color:'red'}}> { this.state.error['email'] } </Text>
                }

                <Hoshi
                    label={'Password'}
                    style={{marginBottom:20}}
                    secureTextEntry
                    backgroundColor={'#fff'}
                    borderColor={'#b76c94'}
                    borderHeight={3}
                    inputPadding={16}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                />
                {
                    this.state.error['password'] && <Text style={{fontSize:25, color:'red'}}> { this.state.error['password'] } </Text>
                }

                <Hoshi
                    label={'Confirm password'}
                    secureTextEntry
                    backgroundColor={'#fff'}
                    borderColor={'#b76c94'}
                    borderHeight={3}
                    inputPadding={16}
                    style={{marginBottom:45}}
                    value={this.state.password_confirm}
                    onChangeText={password_confirm => this.setState({password_confirm})}
                />

                <Button title="Register" onPress={() => this.registerUser(this.state)}/>
            </ScrollView>
        );
    }    
}

const styles = StyleSheet.create({
    container: {
      padding: 10
    },
});

export default Register