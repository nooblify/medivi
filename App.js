import React, { Component } from 'react';
import { StyleSheet, FlatList,TouchableOpacity, View, ActivityIndicator, SafeAreaView} from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Text, Card, Input, Icon , TopNavigation} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import Constants from 'expo-constants';

const theme = { ...lightTheme, ...appTheme };

class Language extends Component {
  //state object
  
  state = { isVietnamese: true };
  render() {
    
    if (!this.state.isVietnamese) {
      return (
        <TouchableOpacity>
        <Card button onPress={() => this.setState({isVietnamese: true})} style={styles.card}>
          <Text style={styles.text}>
            <Text style={{color:'#f95f93', fontSize: 20}}>EN | </Text> {this.props.EnText}
          </Text>
        </Card>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity>
      <Card button onPress={() => this.setState({isVietnamese: false})} style={styles.card}>
      <Text style={styles.text}>
            <Text style={{color:'#f95f93', fontSize: 20}}>VI | </Text> {this.props.VnText}
          </Text>
      </Card>
      </TouchableOpacity>
    );
  }
}

class SearchTexts extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var responseJson = require("./src/dictionary.json");
    this.setState(
      {
        isLoading: false,
        dataSource: responseJson
      },
      function() {
        this.arrayholder = responseJson;
      }
    );

  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar

      var enitemData = item.entext ? item.entext.toUpperCase() : ''.toUpperCase();
      var entextData = text.toUpperCase();

      var viitemData = item.vitext ? item.vitext.toUpperCase() : ''.toUpperCase();
      var vitextData = text.toUpperCase();

      return enitemData.indexOf(entextData) > -1 || viitemData.indexOf(vitextData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
    
  }
  renderHeader = () => {
    const renderIcon = (style) => (
      <Icon {...style} name='search'/>
    );
    return (
      
      <Input
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder='Search Here...'
          icon={renderIcon}
          style={styles.searchbar}
          size='large'
        />
    );
  }; 
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <SafeAreaView > 
        
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => ( 
            <Language EnText={item.entext} VnText={item.vitext} />
          )}
          enableEmptySections={true}
          ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={[0]}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      </SafeAreaView >
    );
  }
}


const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Layout style={styles.container}>
      <View>
    <View style={styles.statusBar} />
      <TopNavigation
      title='ALODI'
      alignment='center'
      titleStyle={styles.topnav}
    />
        <SearchTexts />
        </View>
      </Layout>
      
    </ApplicationProvider>
  </React.Fragment>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topnav: {
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: 'bold',
    fontSize: 30,
  },
  statusBar: {
    backgroundColor: "#eaf4fe",
    height: Constants.statusBarHeight,
  },
  searchbar: {
    marginHorizontal: 15,
    borderRadius: 50,
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
  list: {
    borderRadius: 20,
    marginBottom: 30,
  },
  card: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
  }
});


export default App;