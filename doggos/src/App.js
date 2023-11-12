import React from 'react';
import axios from 'axios';


const fetchDogs = (breed) => {
    return axios
    .get(`https://dog.ceo/api/breed/${breed}/images`)
    .then((resp)=> {
        return resp;
    })
    .catch((err)=> console.log('noooooooo'))
}


class App extends React.Component{
    constructor(){
        console.log('constructor ran')
        this.state = {
            doggos: [],
            breed: 'husky',
        }
        super();
    }


    componentDidMount(){
        fetchDogs(this.state.breed)
        .then(res=>this.setState({doggos: res.data.message}))
    }

    componentDidUpdate(prevProps, prevState){
        console.log('component did update')
        if (prevState.doggos !== this.state.doggos)
            console.log('searched dog changed')
        if (this.state.breed === 'chihuahua'){
            fetchDogs('husky').then(res =>{
                this.setState({doggos:res.data.message})
            })
        }

        }
    


    searchDogs = dogName => {
        fetchDogs(dogName).then(res =>{
            this.setState({doggos: res.data.message, breed: dogName})
        })
    }








    render(){
       
       console.log('render function ran')
        return(
            <>
            <h1> My App</h1>
            <SearchForm searchDogs={(this.searchDogs)}/>
            {this.state.doggos
            .map((dog, index)=> (<img width="200" src={dog}key={index} alt={dog}/>))}
            
            </>
        )
        
    }



}

export default App