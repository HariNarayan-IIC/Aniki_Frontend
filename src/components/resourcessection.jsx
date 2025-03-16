import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import React from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="bg-[#f8fae5] min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-visible">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 flex justify-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <p className="text-gray-600 mt-2">Explore articles to enhance your IT skills.</p>
      </div>
      <div className="mt-8 flex gap-6 max-w-5xl mx-auto overflow-visible relative">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="transform transition duration-300 flex-shrink-0 w-full sm:w-[50%] lg:w-[40%] xl:w-[30%] relative"
          >
            <Card className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-[30rem]">
              <div className="h-56 w-full overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">{article.category}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{article.description}</p>
                </div>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <span className="font-medium">{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button className="bg-gray-900 text-white px-6 py-2 rounded-lg transition-transform transform hover:scale-105">
          View all
        </Button>
      </div>
    </div>
  );
}