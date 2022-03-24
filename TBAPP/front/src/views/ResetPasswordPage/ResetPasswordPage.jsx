import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import Navbar from "../ComponentsSempreUEA/Navbar";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Global from 'global';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import image from "assets/img/bgs/cadastro.jpg";
import md5 from 'js-md5'
import Popover from "@material-ui/core/Popover";

import resetPasswordPageStyle from "views/ResetPasswordPage/ResetPasswordPageStyle.jsx";

class ResetPasswordPage extends React.Component {
    validInputs = {}
    constructor() {
        super();
        this.initValidInputs()
        this.state = {
            name: '',
            cpf: '',
            password: '',
            confirmPassword: '',
            updated: false,
            isLoading: true,
            error: false,
            openBottom: false,
            openBottomMessage: "",
        }

    }

    initValidInputs() {
        this.validInputs = {
            password: true,
            passwordConfirmation: true
        }
    }
    isPassOk(params) {
        var lower = 0;
        var upper = 0;
        var digit = 0;
        for (var i = 0; i < params.length; i++) {
            if (params[i] === '0' || params[i] === '1' || params[i] === '2' || params[i] === '3' || params[i] === '4' || params[i] === '5' || params[i] === '6' || params[i] === '7' || params[i] === '8' || params[i] === '9') digit = 1;
            else if (params[i] === params[i].toLowerCase()) lower = 1;
            else if (params[i] === params[i].toUpperCase()) upper = 1;
        }
        return ((lower + upper + digit) === 3);
    }

    async componentDidMount() {

        await axios
            .post(`${Global.API_URL}/verifyPasswordToken`,
                {
                    token: this.props.match.params.token,
                },
                {
                    headers: { 'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih' }
                }
            )
            .then(response => {
                console.log('response', response)
                if (response.data.message === 'token correto') { // (response.data.message === 'password reset link a-ok') 
                    this.setState({
                        name: response.data['aluno'].nome, //response.data.name
                        cpf: response.data['aluno'].cpf,
                        updated: false,
                        isLoading: false,
                        error: false
                    })
                } else {
                    this.setState({
                        updated: false,
                        isLoading: false,
                        error: true
                    })
                }
            }).catch(error => {
                this.setState({ error: true })
            })
    }
    handleChangePassword(evt) {
        if (this.state.password.length < 5) {
            this.validInputs.password = false;
        } else if (this.isPassOk(evt.target.value)) {
            this.validInputs.password = true;
        }

        if (evt.target.id === 'password') {
            this.setState({
                password: evt.target.value.substring(0, 20)
            });
        }
    }
    handleChangePasswordConfirm(evt) {
        if (this.state.confirmPassword.length < 5 || evt.target.value !== this.state.password) {
            this.validInputs.passwordConfirmation = false;
        } else {
            this.validInputs.passwordConfirmation = true;
        }
        if (evt.target.id === 'password_confirm') {
            this.setState({
                confirmPassword: evt.target.value.substring(0, 20)
            });
        }
    }
    updatePassword = evt => {
        evt.preventDefault();
        if (!this.validInputs.password || !this.validInputs.passwordConfirmation || this.state.confirmPassword.length < 6 || this.state.password.length < 6) {
            this.validInputs.password = false;
            this.validInputs.passwordConfirmation = false;
            this.setState({
                openBottom: true,
                openBottomMessage: "Preenchas os dados corretamente"
            });
            return
        }
        axios
            .put(`${Global.API_URL}/updatePasswordViaEmail`,
                {
                    cpf: this.state.cpf,
                    password: md5(this.state.password)
                },
                {
                    headers: { 'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih' }
                }
            )
            .then(response => {
                if (response.data.message === 'senha alterada com sucesso') {
                    this.setState({
                        updated: true,
                        error: false,
                    });
                    this.props.history.push('/home');
                } else {
                    this.setState({
                        updated: false,
                        error: false,
                        openBottom: true,
                        openBottomMessage: "Falha ao alterar a senha"
                    });

                }
            })
            .catch(error => {

            });
    }
    goToHome() {
        this.props.history.push('/')
    }
    handleClosePopover(state) {
        this.setState({
          [state]: false
        });
    }

    render() {
        const { password, error, isLoading, updated } = this.state;
        const { classes } = this.props;
        if (error) {
            return (
                <div>
                    <Navbar />

                    <div className={classes.pageHeader}
                        style={{
                            backgroundImage: "url(" + image + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "top center"
                        }}
                    >
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={7} lg={5}>
                                    <Card className={classes[this.state.cardAnimaton, classes.cardLogin]}>
                                        <CardBody>
                                            <p>Houve um problema com a alteração da senha. Mande o email de alteração novamente.</p>
                                            <Button
                                                onClick={this.goToHome.bind(this)}
                                                color="primary"
                                            >
                                                Voltar para a Home
                            </Button>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            );
        } else if (isLoading) {
            return (
                <div>
                    <Navbar />
                    <div className={classes.pageHeader}
                        style={{
                            backgroundImage: "url(" + image + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "top center"
                        }}
                    >
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={7} lg={5}>
                                    <Card className={classes[this.state.cardAnimaton, classes.cardLogin]}>
                                        <CardBody>
                                            <p>Carregando as informações do usuário...</p>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Navbar />
                <div className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >

                    <div className={classes.container}>
                        <GridContainer justify="center">

                            <GridItem xs={12} sm={12} md={7} lg={5}>
                                <Card className={classes[this.state.cardAnimaton, classes.cardLogin]}>
                                    <form className={classes.form}>
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h4>Troca de senha</h4>
                                        </CardHeader>
                                        <CardBody>
                                            <p>
                                                Olá {this.state.name}, você solicitou uma alteração de
                                                senha, digite uma senha nova para a mudança
                                            </p>
                                            <CustomInput
                                                labelText="nova senha"
                                                id="password"
                                                error={!this.validInputs.password}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    onChange: ((event) => this.handleChangePassword(event)),
                                                    type: "password",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Icon className={classes.inputIconsColor}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <CustomInput
                                                labelText="confirmar senha"
                                                id="password_confirm"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                error={!this.validInputs.passwordConfirmation}
                                                inputProps={{
                                                    onChange: ((event) => this.handleChangePasswordConfirm(event)),
                                                    type: "password",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Icon className={classes.inputIconsColor}>
                                                                lock_outline
                                                            </Icon>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <p className={classes.inputInfo}>Pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula e um dígito.</p>
                                            <Button
                                                color="primary"
                                                onClick={this.updatePassword.bind(this)}
                                            >
                                                Alterar
                                            </Button>
                                            <Popover
                                                classes={{
                                                    paper: classes.popover
                                                }}
                                                open={this.state.openBottom}
                                                onClose={() => this.handleClosePopover("openBottom")}
                                                anchorOrigin={{
                                                    vertical: "top",
                                                    horizontal: "center"
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "center"
                                                }}
                                            >
                                                <h3 className={classes.popoverHeader}>{this.state.titleErro}</h3>
                                                <div className={classes.popoverBody}>
                                                    {this.state.openBottomMessage}
                                                </div>
                                            </Popover>
                                        </CardBody>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(withStyles(resetPasswordPageStyle)(ResetPasswordPage));