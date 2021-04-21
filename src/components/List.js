import React from "react";

const List = ({ userList }) => {
  console.log("RenderList: List");

  return (
    <ul style={{ display: "flex", listStyle: "none" }}>
      {userList.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListItem = React.memo((props) => {
  console.log("RenderListItem: ListItem");
  return (
    <li style={{ border: "1px solid black", padding: 20, borderRadius: 15 }}>
      {props.item.name}
    </li>
  );
  // react memo second type usage
});

export default React.memo(List);
