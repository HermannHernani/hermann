import React from "react";

// @material-ui/core components
import { withRouter } from 'react-router';
import MediaQuery from 'react-responsive';
import withStyles from "@material-ui/core/styles/withStyles";


import footerStyle from "views/ComponentsSempreUEA/footerStyle.jsx";

import logo from "assets/img/logos/logo (3).svg"

class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
  
    const { classes } = this.props;
    return (
        <footer>
            <div className={classes.footerContainer}>
                &copy; {1900 + new Date().getYear()}, feito por{" "}
                <div className={classes.luduslink}><a href="http://luduslab.org/">LUDUS </a>- Laboratório de Tecnologia, Inovação e Economia Criativa.</div>
                <br />
                <ul className={classes.list}>
                <li className={classes.li}><a
                    href="https://www.facebook.com/uealuduslab/"
                    target="_blank"
                    style={{color: "#3C485C"}}
                >
                <img className={classes.footerIcon} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAyIDUxMi4wMDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDIgNTEyLjAwMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxjaXJjbGUgc3R5bGU9ImZpbGw6IzRFNTk4RjsiIGN4PSIyNTYuMDAxIiBjeT0iMjU2IiByPSIyNTYiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzM2NDI3MDsiIGQ9Ik01MTEuNTk2LDI0MS43TDM5MS4wMTksMTIxLjA4NWMtMS45OTgsMC42MDUtNi45ODItMS43MTQtOS4xNzMtMS4yNzQgIGMtNTEuNzE3LDguNjItMTAxLjcxLDAtMTUxLjcwNCwxMy43OTFjLTI0LjEzNSw2Ljg5Ni0yNS44NTksMzYuMjAyLTM0LjQ3OCw1NS4xNjVjLTEyLjA2NywzNC40NzgtMTAuMzQzLDcyLjQwNC0yNS44NTksMTA1LjE1OCAgYy0xMC4zNDMsMjIuNDExLTM0LjQ3OCwzNi4yMDItNDMuMDk4LDYyLjA2MWMtMi44NzUsMTAuNzg1LTIuNzA1LDI0LjM3OS01Ljk1NiwzNC42OWwxMjAuOTgsMTIwLjkyMiAgYzQuNzI1LDAuMjYsOS40OCwwLjQwMywxNC4yNjksMC40MDNjMTQxLjM4NCwwLDI1Ni0xMTQuNjE2LDI1Ni0yNTZDNTEyLjAwMSwyNTEuMjAxLDUxMS44NTgsMjQ2LjQzNCw1MTEuNTk2LDI0MS43eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzYzLjA0MywxMDkuNDY2SDE0OC45NThjLTIxLjgwOSwwLTM5LjQ5LDE3LjY4LTM5LjQ5LDM5LjQ5djIxNC4wODUgICBjMCwyMS44MTEsMTcuNjgsMzkuNDksMzkuNDksMzkuNDloMTA1LjU4NGwwLjE4My0xMDQuNzIyaC0yNy4yMWMtMy41MzYsMC02LjQwNi0yLjg2LTYuNDE4LTYuMzk2bC0wLjEzMy0zMy43NTkgICBjLTAuMDE0LTMuNTUzLDIuODY3LTYuNDQ0LDYuNDItNi40NDRoMjcuMTYydi0zMi42MThjMC0zNy44NTIsMjMuMTE4LTU4LjQ2Myw1Ni44ODQtNTguNDYzaDI3LjcxYzMuNTQzLDAsNi40MiwyLjg3NCw2LjQyLDYuNDIgICB2MjguNDYzYzAsMy41NDYtMi44NzQsNi40Mi02LjQxNiw2LjQybC0xNy4wMDYsMC4wMWMtMTguMzYzLDAtMjEuOTIxLDguNzI1LTIxLjkyMSwyMS41MzN2MjguMjM5aDQwLjM1MSAgIGMzLjg0OCwwLDYuODMsMy4zNTgsNi4zNzUsNy4xNzNsLTQuMDAxLDMzLjc1OWMtMC4zODEsMy4yMzItMy4xMjIsNS42NjUtNi4zNzUsNS42NjVoLTM2LjE2OGwtMC4xODMsMTA0LjcyNmg2Mi44MjYgICBjMjEuODA5LDAsMzkuNDktMTcuNjgyLDM5LjQ5LTM5LjQ5MXYtMjE0LjA5QzQwMi41MzMsMTI3LjE0NywzODQuODUyLDEwOS40NjYsMzYzLjA0MywxMDkuNDY2TDM2My4wNDMsMTA5LjQ2NnoiLz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBwb2ludHM9IjI1NC41NDIsNDAyLjUzIDI1NC43MjUsMjk3LjgwOCAyNTQuMjc3LDI5Ny44MDggMjU0LjI3Nyw0MDIuNTMgICIvPgo8L2c+CjxwYXRoIHN0eWxlPSJmaWxsOiNEMUQxRDE7IiBkPSJNMzYzLjA0MywxMDkuNDY2SDI1NC4yNzd2MTQxLjc0MWgwLjI2OVYyMTguNTljMC0zNy44NTIsMjMuMTE4LTU4LjQ2Myw1Ni44ODQtNTguNDYzaDI3LjcxICBjMy41NDMsMCw2LjQyLDIuODc0LDYuNDIsNi40MnYyOC40NjNjMCwzLjU0Ni0yLjg3NCw2LjQyLTYuNDE2LDYuNDJsLTE3LjAwNiwwLjAxYy0xOC4zNjMsMC0yMS45MjEsOC43MjUtMjEuOTIxLDIxLjUzM3YyOC4yMzggIGg0MC4zNTFjMy44NDgsMCw2LjgzLDMuMzU4LDYuMzc1LDcuMTczbC00LjAwMSwzMy43NTljLTAuMzgxLDMuMjMyLTMuMTIyLDUuNjY1LTYuMzc1LDUuNjY1aC0zNi4xNjhsLTAuMTgzLDEwNC43MjZoNjIuODI2ICBjMjEuODA5LDAsMzkuNDktMTcuNjgyLDM5LjQ5LTM5LjQ5MVYxNDguOTU2QzQwMi41MzMsMTI3LjE0NywzODQuODUyLDEwOS40NjYsMzYzLjA0MywxMDkuNDY2eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </a>{" "}</li>
                <li className={classes.li}><a
                    href="https://www.instagram.com/ludus.lab/?hl=pt-br"
                    target="_blank"
                    style={{color: "#3C485C"}}
                >
                <img className={classes.footerIcon} src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0NzMuOTMxIDQ3My45MzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3My45MzEgNDczLjkzMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxjaXJjbGUgc3R5bGU9ImZpbGw6IzUyN0ZBMjsiIGN4PSIyMzYuOTY2IiBjeT0iMjM2Ljk2NiIgcj0iMjM2Ljk2NiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNDY3NTkzOyIgZD0iTTQwNC41MTgsNjkuMzhjOTIuNTQ5LDkyLjU0OSw5Mi41NTIsMjQyLjU5MywwLDMzNS4xNDJjLTkyLjU0MSw5Mi41NDEtMjQyLjU5Myw5Mi41NDUtMzM1LjEzOCwwICBMNDA0LjUxOCw2OS4zOHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzQxNkI4MjsiIGQ9Ik00NzIuODc2LDI1OC45MjJMMzQyLjcxOSwxMjguNzY1bC04LjY0Nyw4LjY0N2wtMTYuOTY5LTE2Ljk3M2wtMTUuNjcxLDE1LjY3bC0xNC4yNjctMTQuMjY3ICBsLTU1Ljg5OCw1NS45MDJsLTU5LjQ5OC01OS41MDVsLTUuODAzLDUuODAzbDQuMjA5LDQuMjA5bC0yLjYxNSwyLjYxNmwtMTIuMTYxLTEyLjE2MWwtNi4wMzUsNi4wMzVsNS42MTMsNS42MTNsLTUuNDIyLDUuNDIyICBsLTEwLjUyNi0xMC41MjZsLTEyLjU4NCwxMi41ODRsMTEuNDYxLDExLjQ2MWwtMTEuNDYxLDExLjQ2MWwzLjk3NywzLjk3N2wtMy45NzcsMy45NzdsOS41OSw5LjU5bC0xOS40MTIsMTkuNDEybDQ3LjM0MSw0Ny4zMzcgIGwtOS45MDQsOS45MDFsMzEuMjQsMzEuMjM2bC01Ny45MjIsNTcuOTE5bDEyOC45NzUsMTI4Ljk3NUMzNzAuODg3LDQ2My43ODcsNDYyLjM3NywzNzMuMTA2LDQ3Mi44NzYsMjU4LjkyMnoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM1OC42ODksMjA0Ljk2NmMtMjMuMDIzLDAtNDYuMDU3LDAtNjkuMDgsMGMyNi45NTksNDQuNDE4LTMuOTE4LDEwMi44NjEtNTkuNjM2LDk3LjQyNCAgIGMtMzQuMDM5LTMuMzE5LTY1LjE4MS0zOS45MDItNTEuMzcxLTgxLjQ4MWMwLjg2OC0yLjYzLDIuNzItNS41LDQuMTMxLTguMjY2YzEuMzQtMi42MywzLjYtNS43MTQsMi45NTItNy42NzggICBjLTIyLjYzOCwwLTY4LjQ5MywwLTY4LjQ5MywwdjExMy45NTljMi4yOTcsMjIuMjksMTkuODI4LDM5LjgwOSw0Mi41MSw0MS45MTloNzguNTI4aDc4LjUzMiAgIGMyMi43MjQtMi4zNDIsMzkuNjctMjEuMjU3LDQxLjkxOS00MS4zMjhDMzU4LjY4OSwzMTkuNTE2LDM1OC42ODksMjI0Ljc0OSwzNTguNjg5LDIwNC45NjZ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIzMS43NDYsMTkzLjc0OGMtOS4yOCwxLjExNS0xNC4yNjcsMy4xMjEtMTguOSw1LjkwNGMtMTAuNjM4LDYuMzg3LTIwLjY0NywxOC4yOTctMjIuNDM2LDM0LjI0NSAgIGMtMy42MTgsMzIuMTk0LDIwLDU0LjMyMyw0Ny4yMzYsNTQuMzIzYzIxLjY5OCwwLDQ4LjA5Ny0xNS41MDIsNDcuODI3LTQ3LjgyM0MyODUuMjI3LDIxMC45NjQsMjYxLjc0NCwxOTAuMTQxLDIzMS43NDYsMTkzLjc0OHogICAgTTI3Mi40ODYsMjQ5LjgzN2MtMy45NTUsMTYuMjkyLTIyLjAzNSwyOC42MTMtNDAuNzQsMjUuOTc5Yy0xNy44ODItMi41MTQtMzcuMS0yNC43MzctMjYuNTc4LTQ5LjU5MyAgIGMzLjg3Ni05LjE0OSwxMi42MTctMTkuNDEyLDMwLjcwNS0yMC42NjZDMjU4LjA5MiwyMDQuMDE2LDI3OC43OCwyMjMuODczLDI3Mi40ODYsMjQ5LjgzN3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzQ1LjExLDEzMS43NTFjLTYuNTExLTYuNTExLTE3LjE2Ny0xMi40ODItMjguOTMxLTEzLjU3OWgtNzguMjkzaC0wLjIxN2gtNTYuMXY2MS40MTRIMTcxLjUzICAgdi02MS40MTRoLTYuMTk2djYxLjQxNGgtMTAuMDQ3di02MC44M2MtMi4yMjMsMC40MjMtNC40LDEuMDA3LTYuNDkyLDEuNzI5djU5LjEwMWgtMTAuMDM5di01NC4zMyAgIGMtMy4xOTUsMS45NzItNi4wMTMsNC4xOTgtOC4zMTQsNi40OTJjLTEzLjM1MSwxMy4zNTQtMTQuNDI0LDM2LjMxNC0xMy41NzksNjUuNTQ0aDc0Ljk4OWMzLjA0Mi0wLjcwNyw2LjY5NC00LjQ2NCw5LjQ0OC02LjQ5NiAgIGMxMC4xMDMtNy40MzksMjMuMDk4LTExLjQ5OCwzNi4yODgtMTEuNjQxaDAuMzc0YzEzLjE5LDAuMTQyLDI2LjE4OSw0LjIwMiwzNi4yODgsMTEuNjQxYzIuNzU4LDIuMDMyLDYuNDAyLDUuNzg5LDkuNDQ0LDYuNDk2ICAgaDc0Ljk4OUMzNTkuMDI2LDE2Ny43NzMsMzU4LjQ2OCwxNDUuMTA1LDM0NS4xMSwxMzEuNzUxeiBNMzM0LjgxMywxNzEuNTgyYzAsMy40NDItMi43ODgsNi4yMy02LjIyMyw2LjIzaC0yNS45NDIgICBjLTMuNDM1LDAtNi4yMjMtMi43ODgtNi4yMjMtNi4yM3YtMjUuOTM0YzAtMy40MzksMi43ODgtNi4yMjMsNi4yMjMtNi4yMjNoMjUuOTQyYzMuNDM1LDAsNi4yMjMsMi43ODQsNi4yMjMsNi4yMjNWMTcxLjU4MnoiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                </a>{" "}</li>
                
                </ul>
            </div>
        </footer>
    );
  }
}

export default withRouter(withStyles(footerStyle)(Footer));