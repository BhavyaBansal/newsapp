import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    //console.log("construstor runs first"); //runs first
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  //runs after render
  //ek async functions apne functions k andr wait krskta hai kuch promises k run hone ka
  /*Note : Inside an async function, you can use the await 
  keyword before a call to a function that returns a promise. 
  This makes the code wait at that point until the promise is settled, 
  at which point the fulfilled value of the promise is treated as a 
  return value, or the rejected value is thrown.*/
  async componentDidMount() {
    // console.log("cdm runs last");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=dbd17c82f4814c2f9bc31798ad56d963&page=1&pageSize=9";
    let data = await fetch(url); //returns promise
    let parseddata = await data.json();
    // console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
    });
  }
  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 9)) {
      // document.getElementsByClassName("nextbtn").disabled = true;
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbd17c82f4814c2f9bc31798ad56d963&page=${
        this.state.page + 1
      }&pageSize=9`;
      let data = await fetch(url); //returns promise
      let parseddata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
      });
    }
  };
  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbd17c82f4814c2f9bc31798ad56d963&page=${
      this.state.page - 1
    }&pageSize=9`;
    let data = await fetch(url); //returns promise
    let parseddata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
    });
  };
  render() {
    // console.log("render method runs second");
    return (
      <div className="container my-3">
        <h2>News Updates:</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 60)
                      : "Nothing to show"
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark my-2 mx-2 nextbtn"
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark my-2 mx-2"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
