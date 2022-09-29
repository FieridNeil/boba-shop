import React, { useState, useEffect } from "react";
import styles from "./app.module.css";

interface IMenu {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

function App() {
  const [data, setData] = useState<{ [prop: string]: IMenu[] }>();
  const [categories, setCategories] = useState<string[]>();

  const GetCategories = (d: IMenu[]) => {
    const temp = new Set<string>();
    d?.map((elm) => {
      temp.add(elm.category);
    });
    setCategories(Array.from(temp));
    console.log(categories);
  };

  const groupByCategory = (d: IMenu[]) => {
    const temp: { [prop: string]: IMenu[] } = {};
    d?.map((elm) => {
      temp[elm.category] = temp[elm.category] || [];
      temp[elm.category].push(elm);
    });
    return temp;
  };

  useEffect(() => {
    fetch("http://localhost:3001/get_menu")
      .then((d) => d.json())
      .then((d) => {
        GetCategories(d.data);
        setData(groupByCategory(d.data));
      })
      .catch((err) => console.log("Failed to fetch menu", err));
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: " center",
        }}
      >
        <img
          src={require("./assets/banner.jpeg")}
          style={{ height: "300px", width: "80%" }}
        />
      </div>
      <div
        style={{
          width: "100%",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        <p style={{ textAlign: "center" }}>(っ◔◡◔)っ ♥ Our Menu ♥</p>
      </div>
      <div
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "#ccc",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {categories?.map((elm) => (
          <div className={styles.category}>{elm.toUpperCase()}</div>
        ))}
      </div>

      <div>
        {data &&
          Object.keys(data).map((key: string) => (
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {key}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                }}
              >
                {data[key].map((elm) => (
                  <div
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                      height: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 20%",
                    }}
                  >
                    <img src={elm.image} style={{ height: "150px" }} />
                    <div style={{ fontWeight: "bold" }}>{elm.name}</div>
                    <div>{elm.description}</div>
                    <div>${elm.price}</div>
                    <div>⭐ {elm.rating}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div
        style={{
          position: "sticky",
          bottom: "40px",
          left: "100%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#ffdd00",
          boxShadow: "2px 2px 3px #999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        🛒
      </div>
    </div>
  );
}

export default App;
