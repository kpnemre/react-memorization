
import React from 'react';

const Header = (props) => {
    console.log("Rendering:Header component");
    return (
        <div style={{ background: '#fff', display:"flex", justifyContent:"center"}}>
            <img src={props.imgPath} alt="hey logo" style={{ width: "60%", height:"20%", margin:"1%",  }}></img>
        </div>
    )
}

export default React.memo(Header);






// import React from 'react';

// const Header = React.memo((props) => {
//     console.log("Rendering:Header component");
//     return (
//         <div style={{ background: '#040404' }}>
//             <img src={props.imgPath} alt="hey logo" style={{ width: "100%", height: 200 }}></img>
//         </div>
//     )
// })

// export default Header;