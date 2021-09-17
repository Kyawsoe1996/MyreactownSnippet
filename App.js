import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
// import 'jquery/dist/jquery.slim.js';
import Test from './components/Test';
import JustTestingHooks from './components/JustTestingHooks';
import AddtoCart from './components/AddtoCart';
import PostCommentLikeUsers from './components/PostCommentLikeUsers';

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
      <PostCommentLikeUsers />

    </div>
  );
}

export default App;
