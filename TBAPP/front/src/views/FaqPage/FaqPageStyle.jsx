import { container } from "assets/jss/material-kit-react.jsx";
import imagesStyle from "assets/jss/material-kit-react/imagesStyles.jsx";
import {
  primaryColor,
} from "assets/jss/material-kit-react.jsx";
const loginPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "q0vh",
    color: "#FFFFFF"
  },
  ...imagesStyle,
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardDisabled: {
    background: "#E0E0E0 !important"
  },
  buttonsContainer:{
    textAlign: "center"
  },
  date:{
    margin: "0 0 17px 0",
    paddingTop: "27px"
  },
  toggleSituation:{
    paddingTop:"27px !important",
    // marginTop:"27px !important",
    width: "100% !important"
  },
  inactive:{
    width: "100% !important",
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  active:{
    width: "100% !important"
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    }
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    width: "100%",
    textAlign: "center"
  },
  dividerAuth:{
    marginTop:"30px",
    backgroundColor: "#cecece",
    width: "100%",
    height: "1px"
  },
  
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  buttonContainerCenter:{
    textAlign: "center",
  },
  registerAuthenticatio:{
    paddingBottom: "20px"
  },
  formControl:{
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap',
    color: primaryColor,
    underlineStyle: primaryColor,
    marginTop: "10px"
    
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  inputIconsColor: {
    color: "#495057"
  },
  referenceText: {
    color: "#FFFFFF",
    textAlign: "justify",
    marginLeft: "20px",
    marginRight: "20px",
    zIndex: "2",
    position: "relative",
  },
  text:{
    color: "#000000"
  }
};

export default loginPageStyle;
