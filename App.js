import React from 'react';
import { ApplicationProvider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';


const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <Layout>
      <TopNavigation title='abc' />
    </Layout>
    
  </ApplicationProvider>
);

export default App;