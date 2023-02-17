
import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';
const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  komment=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:"hello",
      bevitel2:szam
    }

  fetch("http://nodejs.dszcbaross.edu.hu:22006/kommentfelvitel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }

  componentDidMount(){
    return fetch(IP.ipcim+'emlek_nevnap')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>

{/*  ***************************************************  textinput */}
<TextInput>

  
</TextInput>

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"brown",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}  Kattintok >{item.emlek_alkalom} </Text>
          <Image  source={{uri: IP.ipcim+item.emlek_kepek}} style={{width:500,height:250,marginLeft:"auto",marginRight:"auto"}} />  



          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.komment(item.emlek_id)}
      >

        
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Komment küldése</Text>
       
      </TouchableOpacity>
          </View>
        
        }

          keyExtractor={({emlek_id}, index) => emlek_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:50
  }
})
