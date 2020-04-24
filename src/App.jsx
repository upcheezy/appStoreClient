import React, { Component } from "react";
import Program from "./programs";

class App extends Component {
  state = {
    programs: [],
    genre: "",
    sort: "",
    search: "",
    error: null,
  };

  setSearch(search) {
    this.setState({
      search,
    });
  }

  setSort(sort) {
    this.setState(
      {
        sort,
      },
      () => {
        this.applyFilter();
      }
    );
  }

  setGenre(genre) {
    this.setState(
      {
        genre,
      },
      () => {
        this.applyGfilter();
      }
    );
  }

  applyFilter = () => {
    let { sort, programs } = this.state;
    if (sort) {
      programs.sort((a, b) => b[sort] - a[sort]);
    }
    this.setState({
      programs,
    });
  };

  //   let filteredPrograms = null;
  // if (genre) {
  //   filteredPrograms = programs.filter(item => item === genre);
  // }
  // this.setState({
  // programs : filteredPrograms
  // });

  applyGfilter = () => {
    let { genre, programs } = this.state;
    let genreContains
    if (genre) {
      genreContains = programs.filter(program => program.Genres.includes(genre))
      console.log(programs);
    }
    this.setState({
      programs: genreContains,
    });
    // console.log(this.state.programs)
  };

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = "http://localhost:8001/apps";
    const params = [];

    params.push(`search=${this.state.search}`);
    params.push(`genre=${this.state.genre}`);
    params.push(`sort=${this.state.sort}`);

    const query = params.join("&");
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          programs: data,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          error: "sorry, could not get the programs at this time.",
        });
      });
  }

  render() {
    // console.log(this.state.programs)
    const programs = this.state.programs.map((programs, i) => {
      return <Program {...programs} key={i} />;
    });
    return (
      <main className="App">
        <h1>Google Play Apps</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            name="search"
            value={this.state.search}
            onChange={(e) => this.setSearch(e.target.value)}
          />
          <label htmlFor="sort">Sort: </label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => this.setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="Rating">Rating</option>
            <option value="App">App</option>
          </select>
          <label htmlFor="sort">Genre: </label>
          <select
            name="genre"
            id="genre"
            onChange={(e) => this.setGenre(e.target.value)}
          >
            <option value="">None</option>
            <option value="Action">Action</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Strategy">Strategy</option>
            <option value="Casual">Casual</option>
            <option value="Arcade">Arcade</option>
            <option value="Card">Card</option>
          </select>
          <button type="submit">Search</button>
        </form>
        <div className="app_error">{this.state.error}</div>
        {programs}
      </main>
    );
  }
}

export default App;
