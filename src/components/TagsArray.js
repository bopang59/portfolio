import { useState, useEffect } from "react";

const parseTags = (mdContent) => {
  const tags = [];
  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const value = lines[i];

    tags.push({
      value
    });
  }
  return tags;
};

const TagsArray = (file) => {
  const [Tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`/portfolio/content/${file}.md`)
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to fetch markdown content. Status:", response.status, response.statusText);
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setTags(parseTags(mdContent));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, [file]);

  return Tags;
};

export default TagsArray;
