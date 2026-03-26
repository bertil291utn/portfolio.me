import { BlogCards } from '@components/BlogCards.component';
import { useSite } from '@context/SiteContext';
import { removeUrl } from '@utils/common';
import styles from './Blog.module.scss';

const BlogComponent = ({ posts }) => {
  const site = useSite();
  const blog = site.ui.blog;

  if (!posts?.length) {
    return <p className={styles.empty}>{blog.emptyMessage}</p>;
  }

  return (
    <div>
      {posts.map((elem, index) => (
        <BlogCards
          key={`blog-card-${elem.slug || index}`}
          URL={elem.URL || `${blog.fallbackPostBaseUrl}${elem.slug}`}
          title={elem.title}
          brief={removeUrl(elem.brief)}
        />
      ))}
    </div>
  );
};

export default BlogComponent;
