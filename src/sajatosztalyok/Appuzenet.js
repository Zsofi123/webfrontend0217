
import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';


export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      szo:""
    }
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
    return fetch('http://nodejs.dszcbaross.edu.hu:22006/emlek')
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
  keres=( )=>{
    //alert("hello")
    var bemenet={
        bevitel1:this.state.szo
      }
  
    fetch("http://nodejs.dszcbaross.edu.hu:22006/keres", {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      }
    
    )
    .then(x => x.json())
    .then(y => this.setState({dataSource:y}));
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


<Text   style={{marginLeft: 35, fontWeight:"bold" }} >Add meg a keresendő szót!</Text>

<TextInput
        style={{height: 50, marginLeft: 35, fontWeight:"bold", width:300, fontSize:15,  textAlign:"auto"  }}
        placeholder="Szó megadása:"
        onChangeText={(beirtszoveg)=>this.setState({szo:beirtszoveg})}
        value={this.state.szo}/>

        
        
<TouchableOpacity
        style={styles.kekgomb}
        onPress={()=>this.keres()}>
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Keresés</Text>
      </TouchableOpacity>

{/*  ***************************************************  textinput */}


        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5,fontWeight:"bold"}}  Kattintok >{item.emlek_alkalom} </Text>
          <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}  Kattintok >{item.emlek_datum} </Text>
          <Image  source={{uri: 'http://nodejs.dszcbaross.edu.hu:22006/'+item.emlek_kepek}} style={{width:500,height:250,marginLeft:"auto",marginRight:"auto"}} />  



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
    backgroundColor: "blue",
    padding: 10,
    width:150,
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:50
  }
})
