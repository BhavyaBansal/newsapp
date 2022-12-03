import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            style={{ height: "200px" }}
            src={
              !imageUrl
                ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
              <small>
                <span class="badge text-bg-success">{source}</span>
              </small>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By <strong>{!author ? "Unknown" : author}</strong> on
                <strong> Date: </strong>
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Real Full News
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem
