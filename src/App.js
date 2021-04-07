import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import SearchAttractions from './components/attraction/SearchAttractions';
import Favorites from './components/favorites/Favorites';
import DisplayFlights from './components/flight/DisplayFlights';
import SearchFlight from './components/flight/SearchFlight';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import DisplayHotels from './components/hotel/DisplayHotels';
import SearchHotels from './components/hotel/SearchHotels';
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
          <Route path="/hotels" exact component={SearchHotels} />
          <Route path="/hotels-data" exact component={DisplayHotels} />
          <Route path="/attractions" exact component={SearchAttractions} />
          <Route path="/favorites" exact component={Favorites} />
        </div>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
