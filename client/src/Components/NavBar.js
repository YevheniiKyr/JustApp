import React, {useContext} from 'react';
import {Button, Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constRoutes";
import {FcShop} from "react-icons/fc"

const NavBar = observer(() => {
    const {user, basket} = useContext(Context)
    const navigate = useNavigate()



    const logout  = () => {
//<SlBasket size = {20}/>  <ImExit/> <ImEnter/>
        navigate(LOGIN_ROUTE)
        user.setUser({})
        user.setIsAuth(false)
        basket.setBasket({})
        basket.setProducts({})
        localStorage.removeItem('token');
      //  localStorage.setItem('token', '' )

    }

    return (

        <Navbar bg="light" variant="dark">
            <Container>
                <Button
                    onClick=
                        {() => {
                            navigate(SHOP_ROUTE)

                        }}
                    variant={"light"} >

                      <FcShop size = {50}/> </Button>


                {user.isAuth && basket.basket?._id?
                    (
                    <Nav className="ml-auto ">
                        <Button
                            size = {"lg"}
                            variant={"light"}
                            style={{ marginRight: 15, border: 'none' }}
                            onClick=
                                {() => {
                                    console.log(BASKET_ROUTE + '/' + basket.basket._id)
                                    navigate(BASKET_ROUTE + '/' + basket.basket._id)
                                }

                        }

                            >

                            <img className={"d-flex m-auto"}
                                 src={ require("../static/shopping_cart_1.png") } width={"35px"} alt={"basket"}/>

                        </Button>

                        {
                        user.user.role === 'ADMIN' ?
                        <Button
                            size = {"lg"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                            style={{ marginRight: 5 }}
                            variant={"light"}
                           >
                            Адмін панель
                        </Button>
                            :
                             <></>
                        }
                        <Button
                            size = {"lg"}
                            onClick={ logout }
                            variant={"light"}
                            >
                            <img className={"d-flex m-auto"}
                                 src={ require("../static/logout-icon.png") } width={"35px"} alt={"basket"}/>
                            </Button>


                    </Nav>
                    )
                    :
                    <Nav className="ml-auto">
                        <Button

                            size = {"lg"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                            variant={"light"}
                            >  <img className={"d-flex m-auto"}
                                    src={ require("../static/log_in_2.png") } width={"40px"} alt={"basket"}/> </Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
})

export default NavBar;