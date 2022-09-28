import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageurl, newsUrl, publishDate, author,source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: '18rem' }}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {source}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    <img src={imageurl ? imageurl : 'https://static.independent.co.uk/2022/09/26/05/newFile.jpg?quality=75&width=1200&auto=webp'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                        <p class="card-text"><small class="text-muted">By {author} : {new Date(publishDate).toDateString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem