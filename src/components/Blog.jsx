import AnimatedSection from "./AnimatedSection";
import siteContent from "../data/content.json";

export default function Blog() {
  const { blog } = siteContent;

  return (
    <section className="section" id="blog" aria-label="Blog section">
      <div className="container">
        <div className="section-label">
          <span className="mono accent">04</span> Notes
        </div>
        <h2 className="section-heading">Things I figured out</h2>
        <div className="blog-grid">
          {blog.map((post) => (
            <AnimatedSection key={post.title} as="article" className="blog-card" name={`blog-${post.title.slice(0, 20)}`}>
              <div className="blog-meta">
                <span className="blog-tag">{post.tag}</span>
                <span className="blog-read">{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <a href="#" className="blog-link" aria-label={`Read full article: ${post.title}`}>
                Read →
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
