import React, { Component } from 'react'; 
import { Redirect } from "react-router";
class Auth extends Component {
    state = { 
        error: "",
        success: "",
        isRegister: false,
        isLoading: false,
        name:"", 
        email:"", 
        password:"", 
        password_confirmation:"",
        isAuthenticated: JSON.parse(localStorage.getItem('auth'))?true:false
    };

    //when input change set state
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    //register form submit
    handleRegister = event => {
        //const { name, email, password } = this.state; 
        event.preventDefault();
        this.setState({ error: "", isLoading: true }); 

        fetch("http://lareact.test/api/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        })
        .then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                if(resp.errors){ 
                    this.setState({ error: resp.errors, isLoading: false });
                }else{
                    this.setState({ 
                        success: "You have Registered successfully, you can login now",
                        isLoading: false,
                        name:"", 
                        email:"", 
                        password:"", 
                        password_confirmation:""
                     }); 
                } 
            })
        })
        .catch(this.showError);
    };

    //set error
    showError = err => {
        console.error(err);
        const error = (err.response && err.response.data) || err.message;
        this.setState({ error, isLoading: false });
    };
    
    //user Login
    login() { 
        fetch("http://lareact.test/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json().then((resp) => {
                //console.log(resp.token);
                localStorage.setItem('auth', JSON.stringify(resp.token)) 
                this.setState({ isAuthenticated: true });  
            })
        })
    }
  
    render() { 
        const { isAuthenticated, success, error, isLoading, isRegister, name, email, password, password_confirmation } = this.state;
        
        if (isAuthenticated) {
            return <Redirect to='/home'/>;
        }

        return (
            <div>
                {
                    !isRegister ? 
                    <div>
                        <input type="text" onChange={(e) => this.setState({ email: e.target.value }) } placeholder="email" /> <br /><br />
                        <input type="text" onChange={(e) => this.setState({ password: e.target.value }) } placeholder="password" /> <br /><br />
                        <button onClick={() => this.login()}> Login</button> <span onClick={() => this.setState({isRegister:true})}>Signup</span>
                    </div>
                    :
                    <form onSubmit={this.handleRegister}> 
                        {/* error message */}
                        {error && 
                            error.map((err, i) =>
                                <div key={i}>{err}</div>
                            )
                        }

                        {/* success message */}
                        {success && <div className="success">{success}</div>} 

                        <input type="text" name="name" onChange={this.handleChange} placeholder="name" value={name} autoComplete="off"/> <br /><br />
                        <input type="email" name="email" onChange={this.handleChange} placeholder="email"  value={email}  autoComplete="off"/> <br /><br />
                        <input type="password" name="password" onChange={this.handleChange} placeholder="password"  value={password}  autoComplete="off"/> <br /><br />
                        <input type="password" name="password_confirmation" onChange={this.handleChange} placeholder="confirmation"  value={password_confirmation} autoComplete="off"/> <br /><br />
                        
                        <button disabled={isLoading} type="submit">
                            {isLoading ? "Sending" : "Submit"}
                        </button> <span onClick={() => this.setState({isRegister:false})}>Signin</span> 

                    </form>
                } 
            </div>
        );
    }
}

export default Auth;