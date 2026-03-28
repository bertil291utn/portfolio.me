import BlogComponent from '@layouts/Blog.component';
import { substackURL } from 'src/config/URLs';
import { siteFallback } from '@utils/siteData';

const Parser = require('rss-parser');
const parser = new Parser();

const Blog = ({ posts }) => {
  return <BlogComponent posts={posts} />;
};

export async function getStaticProps() {
  let posts = [];
  try {
    if (substackURL) {
      const { items } = await parser.parseURL(substackURL);
      posts = items.map((elem) => ({
        title: elem.title,
        brief: elem.content,
        URL: elem.link,
      }));
    }
  } catch {
    // RSS unavailable during build — empty list
  }

  return {
    props: {
      posts,
      site: siteFallback,
    },
    revalidate: 86_400,
  };
}
export default Blog;
