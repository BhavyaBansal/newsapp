import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="News"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
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
