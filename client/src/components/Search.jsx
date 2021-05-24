import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    //must i return this to allow it to chain to .then?
    return axios.get('http://localhost:3000/genres')
    .then(_ => {
      return axios.get('http://localhost:3000/genres')
    })
    .then(res => {
      var updatedGenres = [];
      res.data.forEach(genre => updatedGenres.push(genre.name));
      this.setState({genres: updatedGenres});
      console.log(this.state)
    })
    .catch(err => {
      console.error('The GET request for getGenres failed')
    })
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          <option value={this.state.genres.map((genre) => genre)}></option>
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    )
  }
}


export default Search;