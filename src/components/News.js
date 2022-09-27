import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    // articles = '';
    constructor() {
        super();
        this.state = {
            articles:[],
            page:1,
            loading:false
            // {when your data in Array then use [...this]}
            // articles: [...this.articles]

        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=1&pageSize=20";
        let dataram = await fetch(url);
        let parseData = await dataram.json();
        console.log(parseData);
        this.setState({ articles: parseData.articles,totalResults:parseData.totalResults })
    }
    handleNextClick = async () => {
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=${this.state.page + 1}&pageSize=20`;
        let dataram = await fetch(url);
        let parseData = await dataram.json();
        console.log(parseData);
        this.setState({
            page:this.state.page + 1,
             articles: parseData.articles
            })
        }
    }
    handlePreClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=${this.state.page - 1}&pageSize=20`;
        let dataram = await fetch(url);
        let parseData = await dataram.json();
        console.log(parseData);
        this.setState({
            page:this.state.page - 1,
             articles: parseData.articles
            })
    }
    render() {
        return (
            <div className='container my-3'>
                <h1>NewsMonkey Top Headlines </h1>

                <div className='row'>
                    {this.state.articles && this.state.articles.map((element) => {
                        return <div className='col-md-4 mb-2' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 30) : ''} description={element.description ? element.description.slice(0, 80) : ''} newsUrl={element.url} imageurl={element.urlToImage} />
                        </div>
                    })}
                </div>
                <div className='conatiner d-flex justify-content-between'>
                    <button disabled={this.state.page<=1} type="button" onClick={this.handlePreClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>

            </div>

        )
    }
}
