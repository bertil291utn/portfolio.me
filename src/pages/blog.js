import BlogComponent from '@layouts/Blog.component';
import { gql } from '@utils/common';
import { hashnodeURL } from 'src/config/URLs';

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
  //get from substack
  console.log("🚀 ~ file: blog.js:29 ~ getStaticProps ~ posts", posts)

  return {
    props: {
      posts,
    },
  };
}
export default Blog;


