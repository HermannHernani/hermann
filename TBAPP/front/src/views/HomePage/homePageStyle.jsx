import { container, title } from "assets/jss/material-kit-react.jsx";
import { primaryColor } from "assets/jss/material-kit-react.jsx";
import imagesStyle from "assets/jss/material-kit-react/imagesStyles.jsx";

const homePageStyle = {

  descriptionText: {
    fontWeight: "400",
  },

  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingTop: "0px",
    ...container
  },
  containerSmall: {
    position: 'absolute',
    zIndex:"100",
    backgroundColor: "#E5E5E5",
    ...container
  },
  containerFooter:{
    textAlign:"center",
    background:"red"
  },
  profileList: {
    color: "#3c4858",
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      marginTop: "100px",
      transform: "translate3d(0, -50%, 0)",
    },
    "&:hover,&:focus": {
      // color: "white !important",
      // backgroundColor: primaryColor,
      borderStyle:"solid",
      borderBottom:"3px solid #309B1B",
      boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
    },
  },
  profile: {
    color: "#3c4858",
    textAlign: "center",
    height: "350px !important",
    "&:hover,&:focus": {
      // color: "white !important",
      // backgroundColor: primaryColor,
      borderStyle:"solid",
      borderBottom:"3px solid #309B1B",
      boxShadow: "0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
    }
  },
  profileSmall: {
    color: "#3c4858",
    margin: "10px 0 0 0 !important",
    "&:hover,&:focus": {
      borderStyle:"solid",
      borderBottom:"2px solid #309B1B",
      boxShadow: "0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
    },
  },

  gridImage:{
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  imgContainer:{
    width: "100% !important",
    boxSizing: "inherit"
  },
  navImageClasses:{
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 12px 20px -10px rgba(100, 100, 100, 0.3), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
  },
  navImageClassesSmall:{
    marginTop : "4px",    
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 12px 20px -10px rgba(100, 100, 100, 0.3), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
  },

  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "18px",
    textDecoration: "none",
    color: "#ddd"
  },
  
  brandImage:{
    height: "32px"
  },
  egressos:{
    display: "inline-block",
    position: "relative",
    textDecoration: "none",
  },
  egressosSmall:{
    display: "inline-block",
    position: "relative",
    textDecoration: "none",
    marginTop:"-15px !important",
    marginBottom:"0 !important",
    paddingTop:"0 !important"
  },
  buttonsContainer:{
    float:"right",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  gridText:{
    paddingRight: "0 !important"
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  },
  titleEgressos: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "0px",
    marginBottom: "15px",
    minHeight: "32px",
    texDecoration: "none",
  },
  egressosProfessionSmall:{
    marginBottom:"0px !important",
  },
  titleProfile: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  cardFooter:{
    justifyContent:"center",
    textAlign:"center",
    width: "100%",
    position: "relative",
    paddingTop: "0 !important",
  },
  linkedinIcon:{
    width: "30px",
    height: "30px",
    bottom: "0 !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    marginBottom: "10px",
  },
  linkedinIconInactive:{
    width: "30px",
    height: "30px",
    bottom: "0 !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    marginBottom: "10px",
    filter: "grayscale(100%) brightness(180%)",
  },
  lattesIcon:{
    width: "45px",
    height: "45px",
    bottom: "0 !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    marginBottom: "10px",
  },
  lattesIconInactive:{
    width: "45px",
    height: "45px",
    bottom: "0 !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    marginBottom: "10px",
    filter: "grayscale(100%) brightness(500%)",
  },
  linkedinIconContainer:{
    marginLeft: "5% !important",
    marginRight: "5% !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  linkedinIconSmall:{
    width: "40px",
    height: "40px",

  },
  linkedinIconSmallInactive:{
    width: "35px",
    height: "35px",
    bottom: "0 !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    marginBottom: "10px",
    filter: "grayscale(100%) brightness(180%)",
  },
  lattesIconSmall:{
    width: "40px",
    height: "40px",
  },
  lattesIconSmallInactive:{
    width: "40px",
    height: "40px",
    filter: "grayscale(100%) brightness(500%)",
  }
};

export default homePageStyle;
