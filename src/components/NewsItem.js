import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description,imageurl,newsUrl} = this.props;
        return (
            <div>
                <div className="card" style={{width: '18rem'}}>
                    <img src={imageurl?imageurl:'https://static.independent.co.uk/2022/09/26/05/newFile.jpg?quality=75&width=1200&auto=webp'} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem