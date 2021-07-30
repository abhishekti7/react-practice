import React from 'react';
import Content from './components/Calendar/Content';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import AppContextProvider from './store/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <div id="overlays"></div>
      <Header />
      <main>
        <Content />
      </main>
      <Footer />
    </AppContextProvider>
  );
}

export default App;
