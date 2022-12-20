import { BlogCards } from '@components/BlogCards.component';
import { removeUrl } from '@utils/common';

const BlogComponent = ({ posts }) => {
  return (<div>

    {posts.map((elem, index) => (
      <BlogCards
        key={`blog-card-${index++}`}
        URL={elem.URL || `https://blog.bertiltandayamo.me/${elem.slug}`}
        title={elem.title}
        brief={removeUrl(elem.brief)}
      />
    ))}
  </div>);
}

export default BlogComponent;