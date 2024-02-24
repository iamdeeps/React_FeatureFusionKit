import './App.css';
import Accordian from './components/accordian/index'
import { ImageSlider } from './components/image-slider';
import RandomColor from './components/random-color';
import {StarRating} from './components/star-rating';

function App() {
  return (
    <div className="App">
      {/* <Accordian></Accordian> */}
      {/* <RandomColor></RandomColor> */}
      {/* { <StarRating noOfStars={10}></StarRating> } */}
      { <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} page={10}></ImageSlider> }
    </div>
  );
}

export default App;
