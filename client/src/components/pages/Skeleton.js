import React, {useState, useEffect} from "react";

import "../../utilities.css";
import "./Skeleton.css";

import DCard from "../modules/Card.js";

import {get} from "../../utilities";



const Skeleton = (props) => {
  const [definitions, setDefinitions] = useState([]);
  const query = props.query
  const setQuery = props.setQuery;

  useEffect(() => {
    get("/api/definitions", query).then((definitions) => {
      let reversedDefinitions = definitions.reverse();
      setDefinitions(reversedDefinitions);
    });
  }, [query]);

  let definitionsList = null;
  const hasDefinitions = definitions.length !== 0;
  if (hasDefinitions) {
    definitionsList = definitions.map((definitionObj) => (
      <DCard
      key={`Card_${definitionObj._id}`}
      _id={definitionObj._id}
      creator_name={definitionObj.creator_name}
      creator_id={definitionObj.creator_id}
      word={definitionObj.word}
      definition={definitionObj.definition}
      is_verified={definitionObj.is_verified}
      language={definitionObj.language}
      definition_language={definitionObj.definition_language}
      date={definitionObj.date}
      word_type={definitionObj.word_type}
      example={definitionObj.example}
      ipa={definitionObj.ipa}
      />
    ));
  }
  else {
    definitionsList = <div/>
  }

  return (
    <div style={{marginLeft:100}}>
      {definitionsList}
    </div>
  );
};

export default Skeleton;
