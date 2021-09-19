import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
// import 'jquery/dist/jquery.slim.js';
import Test from './components/Test';
import JustTestingHooks from './components/JustTestingHooks';
import AddtoCart from './components/AddtoCart';
import PostCommentLikeUsers from './components/PostCommentLikeUsers';
import UseEffectTest1 from './components/UseEffectTest/UseEffectTest1';
import UseEffectTest2 from './components/UseEffectTest/UseEffectTest2';
import UseEffectTimer from './components/UseEffectTest/UseEffectTimer';
import APIwithuseEffect from './components/UseEffectTest/APIwithuseEffect';
import APIdetailFetch from './components/UseEffectTest/APIdetailFetch';
import Main from './components/UseContext/Main';
import UseReducereMain from './components/useReducer/UseReducereMain';

function App() {
  return (
    <div className="App">
      {/* for crud app */}
      {/* <Test name="component" /> */}
      {/* for testing */}
      {/* <JustTestingHooks /> */}
      {/* for add to cart */}
      {/* <AddtoCart /> */}
      {/* for post comment like and user */}
      {/* <PostCommentLikeUsers /> */}
      {/* ........................................................ */}
      {/* //Use Effect Test */}
      {/* <UseEffectTest1 /> */}
      {/* < UseEffectTest2/>
      <APIdetailFetch /> */}
      {/* < UseEffectTimer/> */}
      {/* <APIwithuseEffect /> */}
      {/* ............................... .............*/}
      {/* Use Context The whole Test */}
      {/* <Main /> */}
      <UseReducereMain />



    </div>
  );
}

export default App;
