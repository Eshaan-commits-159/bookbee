import Results from './Results';
import axios from 'axios';
import { useState, useEffect } from 'react';
let recommend = '';

const Recommend = ({ user }) => {
  const [books, setBooks] = useState([]);
  const requestBooks = () => {
    if (user) {
      if (localStorage.getItem('token')) {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        };
        axios.get(`http://localhost:3000/bookbee/books/${user._id}/getRecs`, config).then((res) => {
          const myBooks = res.data;
          console.log(myBooks);
          if (myBooks.length) {
            setBooks(myBooks);
          } else {
            console.log('Tere liye Recommendation nahi hai');
            recommend = '<h2> No Books Found</h2>';
          }
          // console.log('Book tho review de phele chutiye');
        });
      }
    } else {
      axios.get(`http://localhost:3000/bookbee/books/?semester=`).then((res) => {
        const myBooks = res.data;
        setBooks(myBooks);
        // console.log(myBooks);
      });
    }
  };
  useEffect(() => requestBooks(), []);
  return (
    <div className="recommend">
      <Results books={books} />
    </div>
  );
};

export default Recommend;
