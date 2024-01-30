import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/**
 * Card is a component for displaying content like definitions
 *
 * Proptypes
 * @param {string} _id of the definition
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} word of the definition
 * @param {string} definition
 * @param {boolean} is_verified
 * @param {string} language
 * @param {string} definition_language
 * @param {date} date
 * @param {string} word_type
 * @param {string} example
 * @param {string} ipa
 */



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '0.5px', transform: 'scale(0.8)' }}
  >
    {/* • */}
  </Box>
);

export default function DCard(props) {
  return (
    <Card sx={{ minWidth: 275, borderRadius:"12px", backgroundColor:"white", margin:"13px" }} id={props._id}>
      <CardContent>
        <div style={{
            float:"right"
        }}
        >
            <Typography  sx={{ fontSize: 14 }} color="text.secondary"  align="right">
            {props.is_verified? "Verified" : "Not verified"}
            </Typography>
        </div>
        <Typography variant="h5" component="div">
          {props.word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} fontWeight="bold" color="text.secondary">
          {props.ipa}
        </Typography>
        <Typography display="inline" color="text.secondary" gutterBottom>
          ({props.word_type}) {bull}
        </Typography>
        <Typography display="inline" variant="body2" gutterBottom>
          {props.definition}
        </Typography>
        <Typography variant="body2" fontStyle="italic" sx={{mb:2}}>
          {props.example}
        </Typography>
        <Typography display="inline" variant="body2">
          a {props.language} word defined in {props.definition_language} by {props.creator_name} on {props.date.substring(0,10)}
        </Typography>
        {/* <div style={{
                float:"right"
            }}
            >
            <CardActions>
                <Button style={{float:"right"}} size="small">Learn More</Button>
            </CardActions>     
            </div> */}
      </CardContent>
    </Card>
  );
}