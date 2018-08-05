/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 * Stack Overflow: https://stackoverflow.com/questions/49299309/gatsbyjs-getting-data-from-restful-api
 */

 // You can delete this file if you're not using it
 // 
const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ boundActionCreators }) => {
  // boundActionCreators documentation: https://www.gatsbyjs.org/docs/bound-action-creators/
  const { createNode } = boundActionCreators;

  // fetch raw data from the randomuser api
  const fetchRandomUser = () => axios.get(`http://api.giphy.com/v1/gifs/search?q=dogs&limit=24&api_key=h31f12EISLE8YkJ1XsRX5Yj8XZxNIgu4`);

  // await for results
  const res = await fetchRandomUser();

  // map into these results and create nodes
  res.data.data.map((user, i) => {
    console.log('================ '+ res.data.data[i]);
    // Create your node object
    const giphy = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `RandomUsers`, // name of the graphQL query --> allRandomUser {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      rating: user.rating,
      source: user.source_tld,
      date: user.import_datetime,
      giphy: user.images.original.url
      // etc...
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(giphy))
      .digest(`hex`);
    // add it to userNode
    giphy.internal.contentDigest = contentDigest;
    console.log('==========GIPHY NODE=============');
    console.log(giphy);
    console.log('==========END GIPHY NODE=============');
    // Create node with the gatsby createNode() API
    createNode(giphy);
  });

  return;
}