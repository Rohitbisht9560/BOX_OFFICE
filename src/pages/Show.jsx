import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cast from "../component/shows/Cast";
import Details from "../component/shows/Details";
import Season from "../component/shows/Season";
import ShowMainData from "../component/shows/ShowMainData";
import { apiGet } from "../misc/config";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";
const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        setTimeout(() => {
          setShow(result);
          setisLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
        setisLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <InfoBlock>Data is is Loading</InfoBlock>;
  }
  if (error) {
    return <InfoBlock>Error Occured: {error}</InfoBlock>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Season</h2>
        <Season seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};
export default Show;
