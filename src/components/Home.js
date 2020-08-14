import React, { Component } from 'react';
import { Redirect } from "react-router";

class home extends Component { 
    constructor(){
        super()
        this.state = {
            user: null,
            token: 'Bearer '+JSON.parse(localStorage.getItem('auth'))
        }
    }
    componentDidMount(){  
        fetch("http://lareact.test/api/user", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": this.state.token
            } 
        }).then((result) => {  
            result.json().then((resp) => {
                if(resp.message || resp.error){ 
                    localStorage.clear(); // remove all  
                    return <Redirect to='/'/> //redirect to login
                }else{
                   this.setState({user:resp});
                }  
            })
        })
    }
   
    render() {
        const { user } = this.state; 
        return (
            <div>
                {user ? 
                    <span>{user.name}</span> 
                 : null 
                }
            </div>
        );
    }
}

export default home;