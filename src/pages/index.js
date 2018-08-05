import React from 'react';
import Link from 'gatsby-link';
import Moment from 'moment';

const IndexPage = (props) => {
  const users = props.data.allRandomUsers.edges;
  // console.log(props);
  return (
    <div>
      {users.map((user, i) => {
        const userData = user.node;
        return (
          <div key={i}>
            <p>Rating: {userData.rating}</p>
            <p>Source: {userData.source}</p>
            <p>Date Added: {Moment(userData.date).fromNow()}</p>
            <img src={userData.giphy} />
          </div>
        )
      })}
    </div>
  );
};

export default IndexPage

export const query = graphql`
  query RandomUserQuery {
    allRandomUsers {
      edges {
        node {
          rating
          source
          date
          giphy
        }
      }
    }
  }
`;