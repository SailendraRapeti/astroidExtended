import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, {Component} from 'react';

const {width, height} = Dimensions.get('window');

interface IState {
  astreoidId: string;
  name: string;
  url: string;
  isPotential: string;
  isModel: boolean;
}

interface IProps {}

class Home extends Component<IProps, IState> {
  state = {
    astreoidId: '',
    name: '',
    url: '',
    isPotential: '',
    isModel: false,
  };

  getAstreoidData = async () => {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${this.state.astreoidId}?api_key=xjpOqBJW5nnrcC6adqRxokdY6vhmhAz6xPiHL3cL`;
    fetch(url)
      .then(response => response.json())
      .then(response =>
        this.setState({
          name: response.name,
          url: response.nasa_jpl_url,
          isPotential: response.is_potentially_hazardous_asteroid,
        }),
      );
  };

  getRandomAstreoidData = () => {
    const number = Math.ceil(Math.random() * 10);
    const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=NFvkCYXLvlaWBjgfMdKC6prmea8cVEHZNBahJ9QB`;
    fetch(url)
      .then(response => response.json())
      .then(response =>
        this.setState({astreoidId: response.near_earth_objects[number].id}),
      );
  };

  render() {
    const {astreoidId, url, isPotential, name} = this.state;
    console.log(astreoidId);

    console.log(this.state.name, this.state.url, this.state.isPotential);
    return (
      <View
        style={{
          height: height,
          backgroundColor: '#A59692',
         
        }}>
        <View style={{height: 60}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 26,
              paddingTop: 10,
              fontWeight: '800',
            }}>
            Astreoid App
          </Text>
        </View>

        <TextInput
          value={this.state.astreoidId}
          onChangeText={(value: string) => this.setState({astreoidId: value})}
          style={{
            backgroundColor: '#BCC6CC',

            borderRadius: 9,

            padding: 10,
            marginTop: 180,
            marginHorizontal: 20,
          }}
          placeholder="Enter Astreoid Id"
          placeholderTextColor="#ffffff"
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 29,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.getAstreoidData();
              this.setState({astreoidId: '', isModel: true});
            }}
            disabled={this.state.astreoidId === '' ? true : false}
            style={{
              backgroundColor: '#7d7770',
              height: 40,
              width: 120,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
              marginBottom:20,
            }}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.getRandomAstreoidData()}
            style={{
              backgroundColor: '#7d7770',
              height: 40,
              width: 190,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              Random Astreoid
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={this.state.isModel}
          animationType="slide"
          onRequestClose={() => {
            Alert.alert('back to home page');
            this.setState({isModel: !this.state.isModel});
          }}>
        <View style={{backgroundColor:"#A59692",flex:1}}>

    
          <View
            style={{
              height: 300,
              width: '90%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              backgroundColor: '#F5F5F5',
              alignSelf: 'center',
              top: 100,
              borderRadius: 9,
              flexDirection: 'column',
              padding: 12,
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: 20,
                fontWeight: '700',
                paddingBottom: 5,
              }}>
              Name :
              <Text style={{color: '#3A3B3C', fontSize: 18, fontWeight: '500'}}>
                {' '}
                {name}
              </Text>
            </Text>
            <Text
              style={{
                color: 'blue',
                fontSize: 20,
                fontWeight: '700',
                paddingBottom: 5,
              }}>
              URL :{' '}
              <Text style={{color: '#3A3B3C', fontSize: 18, fontWeight: '500'}}>
                {url}
              </Text>
            </Text>
            <Text
              style={{
                color: 'blue',
                fontSize: 20,
                fontWeight: '700',
                paddingBottom: 5,
              }}>
              Is hazardious :{' '}
              <Text style={{color: '#3A3B3C', fontSize: 18, fontWeight: '500'}}>
                {isPotential !== '' ? JSON.stringify(isPotential) : ''}
              </Text>
            </Text>
          </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;
