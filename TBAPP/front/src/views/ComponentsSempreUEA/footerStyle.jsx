import { container, primaryColor } from "assets/jss/material-kit-react.jsx";

const footerStyle = {
    ...container,
    list:{
        marginLeft:"0 !important",
        paddingLeft:"0 !important"
    },
    li:{
        display: "inline",
    },
    footerContainer:{
        width:"100%",
        position:"absolute",
        textAlign: "center",
        paddingTop:"1rem",
        background:"white"
    },
    footerIcon:{
        width: "32px",
        height: "32px",
    },
    luduslink:{
        display:"inline"
    },
    ludus:{
        display:"inline"
    }
}

export default footerStyle;