import React, { Component } from 'react';
import './App.css';
import foods from './foods.json';
import FoodBox from './components/Foodbox/FoodBox';
import SearchBar from './components/SearchBar/SearchBar';
import TodaysFood from "./components/TodaysFood/TodaysFood";
import { v4 as uuidv4 } from 'uuid';

const newFoods = foods.map(food => {
  food['id'] = uuidv4() // food.id = uuidv4()
  return food
}) 

class App extends Component {
  state = {
    newFoods,
    results: newFoods,
    formIsShowed:false,
    todaysFood: []
  }

  handleInput = (e) => {
    let {name, value} = e.target;
    this.setState({[name]: value})
  }

  displayForm=()=>{
    this.setState({
      formIsShowed:!this.state.formIsShowed})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.displayForm();

    const newFood = {
      name: this.state.name,
      calories: this.state.calories,
      quantity: this.state.quantity,
      image: this.state.image
    }

    this.setState({
      foods: [...this.state.foods, newFood]
    })
  }

  handleSearchInput = (e) => {
    let {value} = e.target;
    const filterResults = this.state.foods.filter(f=>f.name.toLowerCase().includes(value))
    this.setState({
      results: filterResults,
      searchText: value
    })
  }

  // addFood = (food) => {
  //   const todaysFood = [...this.state.todaysFood, food]
    
  // }

  addFood = (food) => {
    if (this.state.todaysFood.find(e => e.name === food.name)) {
      const todaysFood = [...this.state.todaysFood]
      todaysFood.find(f=>f.name.includes(food.name)).quantity++
      console.log(todaysFood.find(f=>f.name.includes(food.name)).quantity)
      this.setState({
        todaysFood: todaysFood 
      })
    } else {
      const todaysFood = [...this.state.todaysFood, food]
    
      this.setState({
        todaysFood: todaysFood 
      })
    }
  }
  
  quantityUpdate = (e, food) => {
    //console.log('quantityUpdate', e.target, food.name)
    const todaysFood = [...this.state.results]
    console.log(todaysFood, e.target, food.name)
    todaysFood.map(f => {
      if (f.name === food.name) { f.quantity = e.target.value }
      return f
    })
    this.setState({foods: todaysFood})
  }

  deleteFood = (foodId) => {
    const todaysFood = [...this.state.todaysFood]
    const findIndex = todaysFood.findIndex(f => f.id === foodId)
    console.log(findIndex)

    todaysFood.splice(findIndex, 1)
    this.setState({todaysFood: todaysFood})
  }

  
  render() {
    return (
      <div className="App">
        <SearchBar
          searchText={this.state.searchText}
          handleSearchInput={this.handleSearchInput}
        />

        {this.state.formIsShowed ? 
        <form className="food-form" onSubmit={(e)=> this.handleSubmit(e)}>
          <label name="name">Name</label>
          <input type="text" 
                 name="name"
                 value={this.state.name} 
                 onChange={(e)=> this.handleInput(e)}>
          </input>
          <label name="name">Calories</label>
          <input type="number" 
                 name="calories" 
                 value={this.state.calories} 
                 onChange={(e)=> this.handleInput(e)}>
          </input>
          <label name="name">Quantity</label>
          <input type="number" 
                 name="quantity" 
                 value={this.state.quantity} 
                 onChange={(e)=> this.handleInput(e)}>
          </input>
          <label name="name">Image</label>
          <input type="text" 
                 name="image" 
                 value={this.state.image} 
                 onChange={(e)=> this.handleInput(e)}>
          </input>
          <input type="submit" value="submit" />

        </form> : <button className='button is-primary' onClick={this.displayForm}>Add some food</button>
        }
        {this.state.results.map((element, key) => 
         <FoodBox 
           key={element.id}
           id={element.id}
           name={element.name}
           calories={element.calories}
           image={element.image}
           quantity={element.quantity}
           addFood={this.addFood}
           quantityUpdate={this.quantityUpdate}
         />
        )}
        <TodaysFood 
          foodArray={this.state.todaysFood}
          deleteFood={this.deleteFood}
        />
       
      </div>
    );
  }
}

export default App;