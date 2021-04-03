import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import DisplayFlights from './components/flight/DisplayFlights';
import SearchFlight from './components/flight/SearchFlight';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div>
          <Route path="/" exact component={Main} />
          <Route path="/flight" exact component={SearchFlight} />
          <Route path="/flights-data" exact component={DisplayFlights} />
        </div>
        <Footer />
      </BrowserRouter>

      {/* <Main /> */}
    </div>
  );
}

export default App;
