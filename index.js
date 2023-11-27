import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Link, Outlet, useRouteError, json, useParams } from "react-router-dom";


const Header = () => {
    return (
        <><div className='header'>
            <ul>
                {/* <li><a href="#about">About</a></li> */}
                <li><Link to="/about">About</Link></li>
                <li><a href="#signin">Sign In</a></li>
                <li><a href="#help">Help</a></li>
                <li><a href="#offers">Offers</a></li>
                {/* <li><a href="#search">Search</a></li> */}

            </ul>
        </div></>
    );
}

const ShimmerUI = () => {
    return (
        <>
            <div className="rest-list">
                <div className="shimmer-ui">
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                    <div className="shimmer-card">
                    </div>
                </div>
            </div>
        </>
    )
}

const AboutUs = () => {
    return (
        <p>hey
        </p>
    )
}

const RestMenu = () => {

    const {resId} = useParams()
    // console.log(resId)

    const [menuList, setMenuList] = useState([])
    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const jsonMenu = await data.json();
        // console.log(jsonMenu)
        setMenuList(jsonMenu)
    }

    

    const menuItems = menuList?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards
    // console.log(menuItems)

    const restName = menuList?.data?.cards[0]?.card?.card?.info.name
    const restCuisines = menuList?.data?.cards[0]?.card?.card?.info.cuisines.join(', ')
    const costFor2 = menuList?.data?.cards[0]?.card?.card?.info.costForTwoMessage

    return (
        <>
            <h1>{restName}</h1>
            <p>Cuisines : {restCuisines}</p>
            <p>Cost for two: {costFor2}</p>
            <ul>
                {
                    menuItems?.map((items, index) => {
                        // console.log(items.card.info.name)
                        return (
                                <li key={index}>{items?.card?.info?.name} - Rs.{items?.card?.info?.price/100}</li>                  
                        )
                    })
                }
            </ul>
        </>
    )
}

const Body = () => {

    const [restList, setRestList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchRest, setSearchRest] = useState("");

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const jsonData = await data.json()
        // console.log(jsonData)
        const infoData = jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        // console.log(infoData)
        const restInfo = []
        infoData?.map((dataObj) => {
            restInfo?.push(dataObj)
        })
        // console.log(restInfo)
        setRestList(restInfo)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData()
    }, []);

    // useEffect(()=>{
    //     {filteredRestList}
    // },[restList]);


    return (
        <>
            <div className="filterButton">
                <button type="button" onClick={() => {
                    const filterRestList = restList.filter((restData) => {
                        return restData.info.avgRating === 4.5;
                    })
                    setRestList(filterRestList);
                }}>Filter</button>
            </div>
            <div className="searchBar">
                <input type="text" value={searchRest} placeholder="Search..." onChange={(e) => {
                    const updatedSearch = e.target.value;
                    console.log(updatedSearch)
                    setSearchRest(e.target.value)
                    const filteredRestList = restList.filter((restData) =>
                        //console.log(restData.info.name.toLowerCase().includes(searchRest.toLowerCase()))
                        restData.info.name.toLowerCase().includes(searchRest.toLowerCase())
                        // return restData?.info.name.toLowerCase() === ''?restData:restData.info.name.toLowerCase().includes(searchRest.toLowerCase())
                );
                    setRestList(filteredRestList)
                }}
                ></input>

            </div>
            <div className='body'>
                <div className="cardList">
                    {
                        isLoading ? <ShimmerUI /> : (restList.map((restData, index) => {
                            return <Link to={`/restaurants/${restData.info.id}`} key={index} ><Card key={index}
                                name={restData.info.name} ratings={restData.info.avgRating} cuisines={restData.info.cuisines.join(', ')} cloudinaryImageId={restData.info.cloudinaryImageId}
                            /></Link>;
                        }))
                    }
                </div>
            </div>
        </>
    );
}

const Card = (props) => {
    // console.log(props);
    return (
        <>
            <div className="rest-list">
                <div className='card'>
                    <div className='rest-img'>
                        <img src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + props.cloudinaryImageId} alt="res-image" className='image' />
                    </div>
                    <div className='rest-details'>
                        <h3>{props.name}</h3>
                        <p>Ratings: {props.ratings}</p>
                        <p>Cuisine: {props.cuisines}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

// const App = () => {
//     return (
//         <BrowserRouter>
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Body />} />
//                 <Route path="/about" element={<AboutUs />} />
//             </Routes>
//         </BrowserRouter>
//     );
// };

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            <h1>Hey you are knocking on the wrong door</h1>
            <p>{error.data}</p>
            <p>Status code: {error.status}</p>
        </>
    )
}

const App = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/restaurants/:resId',
                element: <RestMenu />
            }
        ]
    },

])
root.render(<RouterProvider router={appRouter} />);




