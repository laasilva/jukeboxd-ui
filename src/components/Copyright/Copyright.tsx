import { Typography, Link } from "@mui/material";

interface Props {
  sx?: any;
}

const Copyright = (props: Props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/laasilva" target="_blank">
        laasilva
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;