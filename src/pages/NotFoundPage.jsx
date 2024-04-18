import Button from "@mui/material/Button";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const buttonStyle = {
  bgcolor: "black",
  color: "white",
  marginTop: "2%",
  ":hover": {
    bgcolor: "#c92d2d",
  },
};

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img className="h-96" src="/images/NotFound-icon.png" alt="Not Found" />
        <p>Oops, deze pagina hebben we helaas niet kunnen vinden.</p>
        <Button
          disableRipple
          startIcon={<IoArrowBackOutline />}
          sx={buttonStyle}
        >
          <Link to="/">Keer terug</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
