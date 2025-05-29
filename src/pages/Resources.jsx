import React from "react";
import { FaBook, FaYoutube, FaGithub, FaGlobe, FaArrowRight } from "react-icons/fa";

const curatedResources = [
  {
    title: "freeCodeCamp",
    description: "Interactive coding lessons and projects for web development, data science, and more.",
    link: "https://www.freecodecamp.org/",
    icon: <FaGlobe className="text-green-600 text-2xl" />,
    type: "Platform",
  },
  {
    title: "MDN Web Docs",
    description: "The best resource for HTML, CSS, and JavaScript documentation and guides.",
    link: "https://developer.mozilla.org/",
    icon: <FaBook className="text-green-600 text-2xl" />,
    type: "Docs",
  },
  {
    title: "Khan Academy: Computing",
    description: "Free courses on computer programming, algorithms, and computer science basics.",
    link: "https://www.khanacademy.org/computing",
    icon: <FaBook className="text-green-600 text-2xl" />,
    type: "Course",
  },
  {
    title: "CS50 by Harvard",
    description: "World-renowned introduction to computer science (video lectures, assignments, community).",
    link: "https://cs50.harvard.edu/x/",
    icon: <FaYoutube className="text-green-600 text-2xl" />,
    type: "Course",
  },
  {
    title: "GitHub Trending",
    description: "Explore trending open-source projects and contribute to real-world code.",
    link: "https://github.com/trending",
    icon: <FaGithub className="text-green-600 text-2xl" />,
    type: "Open Source",
  },
  {
    title: "The Odin Project",
    description: "Comprehensive full-stack curriculum with hands-on projects and community support.",
    link: "https://www.theodinproject.com/",
    icon: <FaGlobe className="text-green-600 text-2xl" />,
    type: "Platform",
  },
];

export default function ResourcePage() {
  return (
    <section className="bg-[#171e27] min-h-screen py-16 px-4">

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">
          Resources
        </h1>
        <h2 className="text-2xl text-gray-200 font-semibold mb-4">
          Curated Free Resources for Every Learner
        </h2>
        
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {curatedResources.map((res, idx) => (
          <div
            key={idx}
            className="bg-[#202B38] border border-[#253143] rounded-2xl shadow-lg p-6 flex flex-col items-start hover:shadow-2xl transition group"
          >
            <div className="mb-3">{res.icon}</div>
            <h3 className="text-lg font-bold text-gray-100 mb-1">{res.title}</h3>
            <p className="text-gray-300 mb-4 flex-1">{res.description}</p>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center text-green-400 font-semibold hover:underline"
            >
              Visit Resource <FaArrowRight className="ml-2" />
            </a>
          </div>
        ))}
      </div>

     
      <div className="max-w-2xl mx-auto text-center mt-16">
        
        <div className="mt-4">
          <p className="text-gray-300">
            Know a great resource?{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=theanikiproject@gmail.com&su=Resource%20Suggestion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 font-semibold underline"
            >
              Suggest it to us!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
