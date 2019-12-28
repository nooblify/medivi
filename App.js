import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, FlatList, slides } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Text, TopNavigation, Card, Icon, Input, TopNavigationAction} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';

const theme = { ...lightTheme, ...appTheme };

class Language extends Component {
  //state object
  state = { isVietnamese: true };
  render() {
    if (!this.state.isVietnamese) {
      return (
        <Card button onPress={() => this.setState({isVietnamese: true})} style={styles.engcard}>
          <Text>{this.props.EnText}</Text>
        </Card>
      );
    }

    return (
      <Card button onPress={() => this.setState({isVietnamese: false})} style={styles.vicard}>
        <Text>{this.props.VnText}</Text>
      </Card>
    );
  }
}

const category = [
  {
    imageUrl: "./airport.svg",
    title: "Basic"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Airport"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Restaurant"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Theme Parks"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Transportation"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Navigation"
  }
];

class CategoryCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: category
    };
    global.slides = slides;
  }
  onPressLearnMore() {
    alert('Hello');
  }
  render() {
    return (
      <FlatList
      style={styles.categorylist}
      horizontal
      data={this.state.data}
      renderItem={({ item: category }) => {
        return (
          <Card style={styles.categorycard} image={{ uri: category.imageUrl }}>
             <Image source={require('./assets/airplane.png')} style={{width: 50, height: 50, alignSelf: 'center'}}/>
            <Text style={styles.categorytitle}>{category.title}</Text>
          </Card>
          
        );
      }}
      keyExtractor={(item, index) => index}
    />
    )
  }
}

const ConvertIcon = (style) => (
  <Icon {...style} name='flip-2-outline' />
);

const ConvertAction = () => (
  <TopNavigationAction icon={ConvertIcon}/>
);

const SettingIcon = (style) => (
  <Icon {...style} name='settings-outline' />
);

const SettingAction = () => (
  <TopNavigationAction icon={SettingIcon}/>
);

const TopNav =() => (
  <TopNavigation
    leftControl={ConvertAction()}
    rightControls={SettingAction()}
    title='ALODI'
    alignment='center'
    style={styles.topnav}
    titleStyle={{fontSize: 30, fontWeight: '700', color: '#333e6c', paddingTop: 10,}}
  />
);

const renderIcon = (style) => (
  <Icon {...style} name={'search-outline'}/>
);


const SearchBar =() => (
  [value, setValue] = React.useState(''),
  <Input style={styles.searchinput} size='large' placeholder='Search Terms' value={value} onChangeText={setValue} icon={renderIcon}/>
);

const HomeScreen = () => (
  <Layout style={styles.home}>
      
      <ScrollView>
      
        <CategoryCards />
        <Language VnText='Vietnamese 1' EnText='English 1' />
        <Language VnText='Vietnamese 2' EnText='English 2' />
        <Language VnText='Vietnamese 3' EnText='English 3' />
        <Language VnText='Vietnamese 4' EnText='English 4' />
        <Language VnText='Vietnamese 5' EnText='English 5' />
        <Language VnText='Vietnamese 6' EnText='English 6' />
        <Language VnText='Vietnamese 5' EnText='English 5' />
        <Language VnText='Vietnamese 6' EnText='English 6' />
        <Language VnText='Vietnamese 3' EnText='English 3' />
        <Language VnText='Vietnamese 4' EnText='English 4' />
        <Language VnText='Vietnamese 5' EnText='English 5' />
        <Language VnText='Vietnamese 6' EnText='English 6' />
        <Language VnText='Vietnamese 5' EnText='English 5' />
        <Language VnText='Vietnamese 6' EnText='English 6' />
        <Language VnText='Vietnamese 3' EnText='English 3' />
        <Language VnText='Vietnamese 4' EnText='English 4' />
        <Language VnText='Vietnamese 5' EnText='English 5' />
        <Language VnText='Vietnamese 6' EnText='English 6' />
        <Language VnText='Vietnamese 5' EnText='English 5' />
        <Language VnText='Vietnamese 6' EnText='English 6' />
      </ScrollView>
  </Layout>
);

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Layout style={styles.container}>
        <TopNav />
        <SearchBar />
        <HomeScreen />
      </Layout>
    </ApplicationProvider>
  </React.Fragment>
);

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#eff3fc',
  },
  container: {
    padding: 0,
    backgroundColor: '#eff3fc',
  },
  topnav: {
    backgroundColor: '#eff3fc',
    height: 20,
    marginTop: 20,
  },
  searchinput: {
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0,
    paddingHorizontal: 15,
  },
  categorylist: {
    marginHorizontal: 15,
  },
  categorycard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 10,
    height: 100,
    width: 200,
    borderWidth: 0,
  },
  engcard: {
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowOpacity: 1,
    borderWidth: 0,
    color: 'red',
  },
  vicard: {
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowOpacity: 1,
    borderWidth: 0,
    color: '#5d87d3',
  },
});


export default App;