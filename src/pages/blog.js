import BlogComponent from '@layouts/Blog.component';
import { gql } from '@utils/common';
import { hashnodeURL, substackURL } from 'src/config/URLs';
const Parser = require('rss-parser');
const parser = new Parser();

const Blog = () => {
  return (
    <BlogComponent />
  );
};



export async function getStaticProps() {

  const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "btandayamo") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                }
            }
        }
    }
`;
  const response = await gql({ URL: hashnodeURL, query: GET_USER_ARTICLES, variables: { page: 0 } });
  const { posts } = response.data.user.publication;
  console.log("🚀 ~ file: blog.js:32 ~ getStaticProps ~ posts", posts)
  //get from substack

  const feed = await parser.parseURL(substackURL);
  console.log(feed);
  return {
    props: {
      posts,
    },
  };
}
export default Blog;


