import { BlogCards } from '@components/BlogCards.component';
import styles from './Blog.module.scss';

const BlogComponent = ({ posts }) => {
  return (<div>

    {posts.map((elem, index) => (
      <BlogCards
        key={`blog-card-${index++}`}
        URL={elem.URL || `https://blog.bertiltandayamo.me/${elem.slug}`}
        title={elem.title}
        brief={elem.brief}
      />
    ))}
  </div>);
}

export default BlogComponent;