"use client";
import React from "react";
import "./lab.scss";

const Page = () => {
  const projects = [
    {
      id: 1,
      title: "Mesh particles destruction",
      image: "/images/project1.jpg",
    },
    {
      id: 2,
      title: "Dissolve",
      image: "/images/project2.jpg",
    },
    {
      id: 3,
      title: "Particles black hole",
      image: "/images/project3.jpg",
    },
    {
      id: 4,
      title: "Snowflakes",
      image: "/images/project4.jpg",
    },
  ];

  return (
    <>
      <div className="lab">
        <div className="lab__container">
          <h1>Lab</h1>
        </div>
      </div>

      <div className="lab__content">
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div
                className="project-image"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>

              <div className="project-title">
                <p>{project.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
