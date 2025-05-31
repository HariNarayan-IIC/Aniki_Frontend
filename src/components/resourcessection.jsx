import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const articles = [
  {
    category: "Web Development",
    title: "Getting Started with Web Development",
    description: "A comprehensive guide to kickstart your web development journey.",
    author: "Jane Doe",
    date: "11 Jan 2022",
    readTime: "5 min read",
    image: "/images/web_dev.jpg",
  },
  {
    category: "Data Science",
    title: "Understanding Data Science Basics",
    description: "Learn the fundamentals of data science and its applications.",
    author: "John Smith",
    date: "12 Feb 2022",
    readTime: "7 min read",
    image: "/images/data_science.jpg",
  },
  {
    category: "Cybersecurity",
    title: "Protecting Your Digital Assets",
    description: "Essential tips for maintaining cybersecurity in your online activities.",
    author: "Alice Johnson",
    date: "15 Mar 2022",
    readTime: "6 min read",
    image: "/images/cybersecurity.jpg",
  },
];

export default function LearningResources() {
  const words = "Latest Learning Resources".split(" ");

  // Intersection Observer Hook
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-visible"
      style={{
        background: "linear-gradient(135deg, #e0f2e9 0%, #f8fae5 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Animated Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 flex justify-center space-x-2 tracking-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: index * 0.18, duration: 0.5 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Explore articles to enhance your IT skills.
        </p>
      </div>

      {/* Article Cards */}
      <div className="mt-12 grid gap-10 max-w-5xl mx-auto overflow-visible relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            className="transform transition duration-300 flex-shrink-0 relative w-full"
          >
            <Card className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden flex flex-col h-[32rem] border border-white/30 hover:shadow-2xl transition">
              <div className="h-56 w-full overflow-hidden group">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-7 flex-grow flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 mb-2 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide shadow-sm">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{article.title}</h3>
                  <p className="text-base text-gray-700 mt-3">{article.description}</p>
                </div>
                <div className="flex items-center mt-6 text-sm text-gray-500">
                  <span className="font-semibold">{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                {/* Optional Read More button */}
                <div className="mt-5">
                  <Button className="w-full bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
