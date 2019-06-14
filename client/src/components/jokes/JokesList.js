import React from "react";
import axios from "axios";

import "../auth/addInterceptors";
import requireAuth from "../auth/requireAuth";

class JokesList extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <h2>Awesome Jokes!!</h2>

        <ul>
          {this.state.jokes.map(j => (
            <li key={j.id}>{j.joke}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = "/jokes";

    axios
      .get(endpoint)
      .then(res => {
        //console.log("jokes", JSON.stringify(res.data));
        this.setState(() => ({ jokes: res.data }));
      })
      .catch(({ response }) => {
        console.error("jokes error", response);
      });
  }
}

export default requireAuth(JokesList);
