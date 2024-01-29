import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./Skeleton.css";

import {get} from "../../utilities";


const Skeleton = () => {
  const [definitions, setDefinitions] = useState([]);
  const query = {
    word: "",
    language: "",
    definition_language: "",
  };

  useEffect(() => {
    get("/api/definitions", query).then((definitions) => {
      setDefinitions(definitions);
    });
  }, []);

  let definitionsList = null;
  const hasDefinitions = definitions.length !== 0;
  if (hasDefinitions) {
    definitionsList = <div> yes </div>
  }
  else {
    definitionsList = <div>There are no definitions in the dictionary.</div>
  }

  return (
    <div>
      {definitionsList}
    </div>
  );
};

export default Skeleton;
