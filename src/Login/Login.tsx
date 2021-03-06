import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../app/Redux-store";
import {Navigate} from "react-router-dom";
import {ThemeType} from "../app/app-reducer";


export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector<boolean>(state => state.auth.isLoggedIn)
    const theme = useTypedSelector<ThemeType>(state => state.app.theme)




    const formik = useFormik({
        validate: (values) => {
            if(!values.email) {
                return {
                    email: 'email is required'
                }
            }
            if (!values.password) {
                return  {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel sx={{color: theme === 'light'? 'black': 'white'}}>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p> or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>

                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label={'email'}
                            margin={'normal'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type={'password'}
                            label={'Password'}
                            margin={'normal'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}/>}
                        />
                        <Button type={'submit'} variant={'outlined'} color={'secondary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}