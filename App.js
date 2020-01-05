import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, FlatList, slides, TouchableOpacity, Animated, View, SafeAreaView } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Text, TopNavigation, Card, Icon, Input, TopNavigationAction} from '@ui-kitten/components';
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
        <Card button onPress={() => this.setState({isVietnamese: true})} style={styles.engcard}>
          <Text>{this.props.EnText}</Text>
        </Card>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity>
      <Card button onPress={() => this.setState({isVietnamese: false})} style={styles.vicard}>
        <Text>{this.props.VnText}</Text>
      </Card>
      </TouchableOpacity>
    );
  }
}
var Texts = [
  {
    id: '1',
    entext: 'English 1',
    vitext: 'Vietnamese 1',
    side : "en"
  },
  {
    id: '2',
    entext: 'English 2',
    vitext: 'Vietnamese 2',
    side : "en"
  },
  {
    id: '3',
    entext: 'English 3',
    vitext: 'Vietnamese 3',
    side : "en"
  },
];

class AnimatedBasic extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard(item) {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }
  

  constructor(props) {
    super(props);
    this.state = {
      data: Texts
    };
    global.slides = slides;
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    return (
      <View style={styles.container}>
        <FlatList data={Texts} renderItem={({ item : Item }) => { return (
          <TouchableOpacity onPress={() => this.flipCard(Item)}>
            <View>


              <Animated.View button style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                <Text style={styles.flipText}>
                  {Item.entext} {Item.side}
                </Text>
              </Animated.View>

              
              <Animated.View button style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                <Text style={styles.flipText}>
                  {Item.vitext}
                </Text>
              </Animated.View>


              
            </View>
          </TouchableOpacity>

          );
          }} keyExtractor={(item, index) => index.toString} /> 
        

      </View>
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
      keyExtractor={(item, index) => index.toString}
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
        <AnimatedBasic />
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
  flipCard: {
    flex:1,
    alignItems: 'stretch',
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    flex:1,
    alignItems: 'stretch',
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  flipText: {
    fontSize: 20,
  }
});


export default App;