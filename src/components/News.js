import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spineer from './Spineer';
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
    // articles = '';
    titleCase = (string) => {
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalResults:0
            // {when your data in Array then use [...this]}
            // articles: [...this.articles]

        }
        document.title = `${this.titleCase(this.props.category)} - News Blogs`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let dataram = await fetch(url);
        let parseData = await dataram.json();
        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});

        // let dataram = await fetch(url);
        // let parseData = await dataram.json();
        // console.log(parseData);
        // this.setState({ articles: parseData.articles,totalResults:parseData.totalResults,loading:false })
        this.updateNews();
    }
    handleNextClick = async () => {
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let dataram = await fetch(url);
        // let parseData = await dataram.json();
        // console.log(parseData);
        // this.setState({
        //     page:this.state.page + 1,
        //      articles: parseData.articles,
        //      loading:false
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    handlePreClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let dataram = await fetch(url);
        // let parseData = await dataram.json();
        // console.log(parseData);
        // this.setState({
        //     page:this.state.page - 1,
        //      articles: parseData.articles,
        //      loading:false
        //     })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e736a34ae3a24ca182e1352c30d0a4e7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });

        let dataram = await fetch(url);
        let parseData = await dataram.json();
       // console.log(parseData);
        this.setState({ 
            articles: this.state.articles.concat(parseData.articles) , 
            totalResults: parseData.totalResults })
      };
    render() {
        return (
            <div className='container my-3'>
                <h1> Top {this.titleCase(this.props.category)} Headline From Category </h1>
                {/* {this.state.loading && <Spineer />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spineer />}
                >
                    <div className='container'>
                    <div className='row'>
                        {this.state.articles && this.state.articles.map((element) => {
                            return <div className='col-md-4 mb-2' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 30) : ''} description={element.description ? element.description.slice(0, 80) : ''} newsUrl={element.url} imageurl={element.urlToImage} author={element.author ? element.author : 'Jitu'} source={element.source.name} publishDate={element.publishedAt} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
                <div className='conatiner d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>

            </div>

        )
    }
}
