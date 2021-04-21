import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "./components/Header";
import hey from "./assets/film.jpg";
import aa from "./assets/tea.jpg";
import List from "./components/List";
import ClearButton from "./components/ClearButton";

function App() {
  const [count, setCount] = useState(0);
  const [imgPath, setImgPath] = useState(hey);
  const [userList, setUserList] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const increase = () => {
    setCount((count) => count + 1);
  };

  const changeHeaderImage = () => {
    setImgPath(aa);
  };

  // Fetch user list from jsonplacehold
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUserList(data));
  }, []);

  // get user input and assign to text state
  const handleText = (event) => {
    setText(event.target.value);
  };
  // assign text state value to search state when user clicks to search button
  const handleSearch = () => {
    setSearch(text);
  };

  // const filteredUsers = userList.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });
  const filteredUsers = useMemo(() => userList.filter(user => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }), [search, userList])

  // not: List componentine göndermiş olduğumuz userList props’unun tipi Object’tir. Yani nesnedir.
  //  Çünkü filteredUsers bir array’dir ve array’ler JavaScript’te Object tipindedir.
  //  Object tipinde gönderilen props’larda React.memo,
  //  nesnenin içerisinde bulunan değerleri değil memory’de tutulduğu adresleri karşılaştırır.
  //  List componenti bir önceki gönderilen userList ile yeni oluşturulan userList nesnesini
  //  Shallow comparison yaparak karşılaştırdığında,
  //  ikisinin memory’de tutulduğu adreslerin farklı olduğunu görür ve component’i tekrar render eder.

  // çok önemli*******
  // Input alanına bir değer girdiğimiz zaman App.js tekrar render edildiği için filteredUsers tekrar oluşur.
  //  filteredUsers tekrardan oluştuğu için List componentine göndermiş olduğumuz userList her seferinde farklı 
  // bir adrese sahip olur. Bu yüzdende React.memo List componentine ilk seferde göndermiş olduğumuz userList 
  // array’inin tutulduğu adres ile render edildikten sonra gelen userList array’inin farklı adreste bulunduğunu 
  // gördüğü için List componentini tekrar render eder. Props olarak verdiğimiz array değişmediği halde List 
  // componentinin render edilmesini engelleyebilmek için useMemo kullanabiliriz.

  // const clearSearch = () => {
  //   setSearch('');
  //   setText('');
  // }

    const clearSearch = useCallback(() => {
    setSearch('');
    setText('');
    setCount(0);
  },[])

  return (
    <div>
      <Header imgPath={imgPath} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <p style={{ alignItems: "center", marginBottom: 40 }}>
          Subscribed Person count: {count}
        </p>

        <button onClick={increase}>Click me to increase the subcribers!</button>
        <button style={{ margin: 30 }} onClick={changeHeaderImage}>
          Click me to Change Image!
        </button>
        <hr />
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input type="text" value={text} onChange={handleText} />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          <List userList={filteredUsers} />
          <hr />
          <ClearButton handleClear={clearSearch} />
        </div>
      </div>
    </div>
  );
}

export default App;


// Kaynak :https://tsafaelmali.medium.com/react-memoization-nedir-reactta-nas%C4%B1l-kullan%C4%B1l%C4%B1r-453035a3630f