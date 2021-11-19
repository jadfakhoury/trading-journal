import Box from '@mui/material/Box';

import classes from './Card.module.css';

const Card = (props) => {
  return (
    <Box className={`${classes.card} ${props.className}`}>{props.children}</Box>
  );
};

export default Card;
