import React from 'react';
import logo from './logo.svg';
import { Header, Icon } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivity</Header.Content>
      </Header>
      <List>
        <List.Item>Apples</List.Item>
        <List.Item>Pears</List.Item>
        <List.Item>Oranges</List.Item>
      </List>
    </div>
  );
}

export default App;
