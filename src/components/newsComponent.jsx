import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function NewsComponent({ searchText }) {
  const [newsData, setNewsData] = useState(null);
  const maxArticlesToShow = 10;
  const stockImageURL = "https://svgsilh.com/svg_v2/1829459.svg";
  const [imageError, setImageError] = useState({});
  const [coronaData, setCoronaData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CoronaUrl = "http://127.0.0.1:8000/api/v1/coronavirus_news/US-CA";
        const responseCorona = await fetch(CoronaUrl, {
          method: "GET",
          mode: "cors",
        });
        const coronaJSON = await responseCorona.json();
        setCoronaData(coronaJSON);

        const url = searchText
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
              searchText
            )}&language=en&apiKey=095be6e4061b49c3b842a7b6571ddfef`
          : "https://newsapi.org/v2/top-headlines?country=us&apiKey=095be6e4061b49c3b842a7b6571ddfef";
        const response = await fetch(url);
        const newsJSON = await response.json();
        setNewsData(newsJSON);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, [searchText]);

  if (!newsData || Object.keys(coronaData).length === 0) {
    return <div>Loading...</div>;
  }
  const country = coronaData.location.countryOrRegion;
  const timeOfQuery = coronaData.updatedDateTime;
  const totalConfirmedCases = coronaData.stats.totalConfirmedCases;
  const totalDeaths = coronaData.stats.totalDeaths;

  const limitedArticles = newsData.articles.slice(0, maxArticlesToShow);

  const handleImageError = (index) => {
    setImageError((prevState) => ({ ...prevState, [index]: true }));
  };

  return (
    <div>
      <div>
        <h3>Location: {country}</h3>
        <p>Time: {timeOfQuery}</p>
        <p>Total Confirmed Cases: {totalConfirmedCases}</p>
        <p>Total Deaths: {totalDeaths}</p>
      </div>
      <div className="d-flex flex-column align-items-center">
        {limitedArticles.map((article, index) => (
          <div
            id="news-card"
            key={index}
            className="card"
            style={{ width: "18rem" }}
          >
            {imageError[index] ? (
              <img
                src={stockImageURL}
                className="card-img-top"
                alt="stock image"
                style={{ width: "100%" }}
              />
            ) : (
              <img
                src={article.urlToImage}
                className="card-img-top"
                alt="newspage image"
                style={{ width: "100%" }}
                onError={() => handleImageError(index)}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
