import BlogComponent from '@layouts/Blog.component';
import { gql } from '@utils/common';
import { hashnodeURL, substackURL } from 'src/config/URLs';
const Parser = require('rss-parser');
const parser = new Parser();

const Blog = ({posts}) => {
  return (
    <BlogComponent posts={posts}/>
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

  const { items } = await parser.parseURL(substackURL);
  const _substack = items.map(elem => ({ title: elem.title, brief: elem.content, URL: elem.link }))
  return {
    props: {
      posts: [...posts, ..._substack],
    },
  };
}
export default Blog;


