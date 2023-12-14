import React, { useState, useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
// const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [showUser, setShowUser] = useState("name");
  const [people, setPeople] = useState([]);
  const [newUser, setnewUser] = useState({
    
    name: "",
    email: "",
    picture: "",
    dob: "",
    location: "",
    phone: "",
    gender: "",
    login: "",
    id: "",
  });

  const {
    name,
    email,
    dob: { age },
    location: { city },
    phone,
    picture,
    gender,
    login: { username },
    id: { value },
  } = newUser;

  const getUser = () => {
    axios(url)
      .then((res) => setnewUser(res.data.results[0]))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
  
    getUser();
  }, []);

  const AddUser = () => {
    if (people.find((user) => user.value === value)) {
      alert("this user alreday added")
    } else {
      setPeople([
        ...people,
        { name: name,
           email: email, 
           phone: phone, 
           age: age, 
           value: value },
      ]);
    }
  };

 


  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={picture.large} alt="random user" className="user-img" />

          {showUser === "name" && (
            <>
              <p className="user-title">My name is </p>
              <p className="user-value">
                {" "}
                {name.first} {name.last}
              </p>
            </>
          )}

          {showUser === "email" && (
            <>
              <p className="user-title">My email is </p>
              <p className="user-value"> {email}</p>
            </>
          )}
          {showUser === "age" && (
            <>
              <p className="user-title">My age is </p>
              <p className="user-value"> {age}</p>
            </>
          )}
          {showUser === "city" && (
            <>
              <p className="user-title">My city is </p>
              <p className="user-value"> {city}</p>
            </>
          )}
          {showUser === "phone" && (
            <>
              <p className="user-title">My phone is </p>
              <p className="user-value"> {phone}</p>
            </>
          )}
          {showUser === "username" && (
            <>
              <p className="user-title">My username is </p>
              <p className="user-value"> {username}</p>
            </>
          )}

          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                src={gender === "male" ? manSvg : womanSvg}
                alt="user"
                id="iconImg"
                onMouseEnter={() => setShowUser("name")}
              />
            </button>

            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseEnter={() => setShowUser("email")}
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={gender === "male" ? manAgeSvg : womanAgeSvg}
                alt="age"
                id="iconImg"
                onMouseEnter={() => setShowUser("age")}
              />
            </button>
            <button className="icon" data-label="city">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseEnter={() => setShowUser("city")}
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseEnter={() => setShowUser("phone")}
              />
            </button>
            <button className="icon" data-label="username">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseEnter={() => setShowUser("username")}
              />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={AddUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {people.map(({ name, age, phone, email, value }) => (
                <tr key={value} className="body-tr">
                  <td className="th">
                    {name.first} {name.last}
                  </td>
                  <td className="th">{email}</td>
                  <td className="th">{phone}</td>
                  <td className="th">{age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div> 
    </main>
  );
}

export default App;


