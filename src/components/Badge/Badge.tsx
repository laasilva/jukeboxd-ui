import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import DeleteIcon from '@mui/icons-material/Delete';
import { Padding } from "@mui/icons-material";

interface Props {
  alt: string,
  image: string,
  label: string,
  variant?: any,
  handleDelete?: any,
}

const Badge = (props: Props) => {
  const {
    alt,
    image,
    label,
    variant,
    handleDelete
  } = props;

  return (
    <Chip
      style={{margin: 4}}
      avatar={<Avatar alt={alt} src={image} />}
      label={label}
      variant={variant ? variant : "outlined"}
      onDelete={handleDelete}
    />
  );
}

export default Badge;