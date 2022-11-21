import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
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
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbd17c82f4814c2f9bc31798ad56d963&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); //returns promise
    let parseddata = await data.json();
    // console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
  }
  handleNext = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      // document.getElementsByClassName("nextbtn").disabled = true;
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=dbd17c82f4814c2f9bc31798ad56d963&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url); //returns promise
      let parseddata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
        loading: false,
      });
    }
  };
  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=dbd17c82f4814c2f9bc31798ad56d963&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url); //returns promise
    let parseddata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
      loading: false,
    });
  };
  render() {
    // console.log("render method runs second");
    return (
      <div className="container my-3">
        {this.state.loading && <Spinner />}
        <h2 className="text-center" style={{ margin: "30px 0px" }}>
          News Updates:
        </h2>
        {/* <h2>News Updates:</h2> */}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div
                  className="col-md-4 text-center d-flex justify-content-center"
                  key={element.url}
                >
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
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
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
