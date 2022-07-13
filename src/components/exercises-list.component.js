import React, { Component } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="/#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

const data = [
  {
    name: "Stanley",
    days: 4,
    duration: 10,
  },
  {
    name: "Jim Halpert",
    days: 6,
    duration: 6,
  },
  {
    name: "Pam",
    days: 4,
    duration: 4,
  },
  {
    name: "Bob",
    days: 9,
    duration: 5,
  },
  {
    name: "karan",
    days: 6,
    duration: 3,
  },
  {
    name: "Ryan",
    days: 7,
    duration: 8,
  },
];

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [], query: "" };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  // exerciseList() {
  //   return this.state.exercises.map((currentexercise) => {
  //     return (
  //       <Exercise
  //         exercise={currentexercise}
  //         deleteExercise={this.deleteExercise}
  //         key={currentexercise._id}
  //       />
  //     );
  //   });
  // }

  exerciseList() {
    return (
      this.state.exercises
        // eslint-disable-next-line array-callback-return
        .filter((currentexercise) => {
          if (this.state.query === "") {
            return currentexercise;
          } else if (
            currentexercise.description
              .toLowerCase()
              .includes(this.state.query.toLowerCase())
          ) {
            return currentexercise;
          }
        })
        .map((currentexercise) => {
          return (
            <Exercise
              exercise={currentexercise}
              deleteExercise={this.deleteExercise}
              key={currentexercise._id}
            />
          );
        })
    );
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Logged Exercises</h3>
          <input
            placeholder="Search Exercise"
            style={{
              marginBottom: "0.4rem",
              paddingRight: "3.4rem",
              paddingLeft: "0.4rem",
            }}
            onChange={(event) => this.setState({ query: event.target.value })}
          />
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>

        <br></br>

        <h3 style={{ display: "flex", justifyContent: "space-between" }}>
          Line Chart
        </h3>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            data={data}
            width={500}
            height={300}
            margin={{ top: 5, right: 300, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={"preserveStartEnd"}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="days"
              stroke="red"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="green"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
