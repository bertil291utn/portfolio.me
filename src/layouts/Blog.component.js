import { BlogCards } from '@components/BlogCards.component';
import { removeUrl } from '@utils/common';
import styles from './Blog.module.scss';

const BlogComponent = ({ posts }) => {
  if (!posts?.length) {
    return (
      <p className={styles.empty}>
        No posts could be loaded right now. Please try again later or visit the
        blog on Substack.
      </p>
    );
  }

  return (
    <div>
      {posts.map((elem, index) => (
        <BlogCards
          key={`blog-card-${elem.slug || index}`}
          URL={elem.URL || `https://blog.bertiltandayamo.me/${elem.slug}`}
          title={elem.title}
          brief={removeUrl(elem.brief)}
        />
      ))}
    </div>
  );
};

export default BlogComponent;
