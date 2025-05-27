"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo, useState, useCallback } from "react";
import { Calendar, Clock, Tag, Search, ExternalLink } from "lucide-react";

// Types
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  link: string;
  featured?: boolean;
}

// Styles
const styles = {
  section: "py-20 relative bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950",
  container: "container mx-auto px-4",
  header: "text-center mb-12",
  heading: "text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text",
  subheading: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",
  searchContainer: "max-w-md mx-auto mb-12",
  searchWrapper: "relative",
  searchInput: `w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 
    bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
    text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
    transition-all duration-300`,
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  filterContainer: "flex flex-wrap justify-center gap-4 mb-8",
  filterButton: `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
    hover:bg-blue-500 hover:text-white
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
};

// Blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Modern Portfolio with Next.js and Framer Motion",
    excerpt: "Learn how to create a stunning portfolio website using Next.js, Tailwind CSS, and Framer Motion animations.",
    date: "2024-01-15",
    readingTime: "8 min",
    category: "Web Development",
    image: "/placeholder-blog.jpg",
    link: "/blog/modern-portfolio",
    featured: true,
  },
  {
    id: "2",
    title: "Optimizing React Performance with Hooks",
    excerpt: "Discover advanced techniques for optimizing React applications using hooks and memoization.",
    date: "2024-01-10",
    readingTime: "12 min",
    category: "React",
    image: "/placeholder-blog.jpg",
    link: "/blog/react-performance",
  },
  {
    id: "3",
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
    date: "2024-01-05",
    readingTime: "10 min",
    category: "Technology",
    image: "/placeholder-blog.jpg",
    link: "/blog/future-web-dev",
  },
];

// BlogCard Component
const BlogCard = memo(function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={`Cover image for ${post.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={post.featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <a
          href={post.link}
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
          aria-label={`Read more about ${post.title}`}
        >
          Read More
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  );
});

export function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(blogPosts.map(post => post.category))];
    return cats;
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Memoize the heading animation
  const headingAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true }
  }), []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <section 
      id="blog"
      className={styles.section}
      aria-label="Blog posts"
    >
      <div className={styles.container}>
        <motion.div
          {...headingAnimation}
          className={styles.header}
        >
          <h2 className={styles.heading}>Latest Blog Posts</h2>
          <p className={styles.subheading}>
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>

        {/* Search */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearch}
              className={styles.searchInput}
              aria-label="Search blog posts"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className={styles.filterContainer} role="tablist" aria-label="Filter posts by category">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`${styles.filterButton} ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300"
              }`}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="blog-posts"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog posts grid */}
        <div 
          className={styles.grid}
          id="blog-posts"
          role="tabpanel"
          aria-label="Blog posts grid"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              No posts found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
