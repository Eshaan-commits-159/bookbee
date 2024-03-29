import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import UserReview from './UserReview';
import Comment from './Comment';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
class Details extends Component {
  state = { loading: true, value: 0 };

  async componentDidMount() {
    const res = await fetch(`http://localhost:3000/bookbee/books/${this.props.match.params.id}`);
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false
        },
        json
      )
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Grid>
          <CircularProgress color="warning" />
        </Grid>
      );
    }
    const {
      _id,
      stream,
      subject,
      bookName,
      publisher,
      authors,
      image,
      rating,
      reviews,
      numRatings,
      numReviews
    } = this.state;
    let sum = 0;
    for (let key in numRatings) {
      sum += numRatings[key];
    }
    let userReview = [''];
    if (this.props.user) {
      userReview = reviews.find((r) => r.user.toString() === this.props.user._id.toString());
    }

    return (
      <div className="main">
        <div className="details">
          <div className="book-img">
            <img src={image} alt={bookName} />
          </div>
          <div className="book-details">
            <div className="book-rating">
              <Rating name="read-only" size="small" value={rating} precision={0.5} readOnly />
              <span>
                {rating.toFixed(1)} Ratings & {numReviews} Reviews
              </span>
            </div>
            <h1>{bookName}</h1>
            <div className="list-group">
              <div className="list">
                <span>Details</span>
                <div className="book-info">
                  <div className="item">
                    <span>Stream</span>
                    <h3 style={{ textTransform: 'capitalize' }}>{stream}</h3>
                  </div>
                  <div className="item">
                    <span>Subject</span>
                    <h3>{subject}</h3>
                  </div>
                  <div className="item">
                    <span>Author</span>
                    <h3>{authors}</h3>
                  </div>
                  <div className="item">
                    <span>Publisher</span>
                    <h3>{publisher}</h3>
                  </div>
                </div>
              </div>
              <div className="list">
                <span>Ratings</span>
                <div className="book-ratings">
                  <div className="total-ratings">
                    <h1>{rating.toFixed(1)} ★</h1>
                    <h3>{sum} Ratings</h3>
                  </div>
                  <div className="star-ratings">
                    <div className="star">
                      <span>5 ★</span>
                      <LinearProgress
                        className="progress"
                        variant="determinate"
                        value={sum ? (numRatings.five / sum) * 100 : 0}
                      />
                      <span>{numRatings.five}</span>
                    </div>
                    <div className="star">
                      <span>4 ★</span>
                      <LinearProgress
                        className="progress"
                        variant="determinate"
                        value={sum ? (numRatings.four / sum) * 100 : 0}
                      />
                      <span>{numRatings.four}</span>
                    </div>
                    <div className="star">
                      <span>3 ★</span>
                      <LinearProgress
                        className="progress"
                        variant="determinate"
                        value={sum ? (numRatings.three / sum) * 100 : 0}
                      />
                      <span>{numRatings.three}</span>
                    </div>
                    <div className="star">
                      <span>2 ★</span>
                      <LinearProgress
                        className="progress"
                        variant="determinate"
                        value={sum ? (numRatings.two / sum) * 100 : 0}
                      />
                      <span>{numRatings.two}</span>
                    </div>
                    <div className="star">
                      <span>1 ★</span>
                      <LinearProgress
                        className="progress"
                        variant="determinate"
                        value={sum ? (numRatings.one / sum) * 100 : 0}
                      />
                      <span>{numRatings.one}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="review-ratings">
          <UserReview user={this.props.user} id={this.state._id} userReview={userReview} />
          <Comment reviews={reviews} />
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
