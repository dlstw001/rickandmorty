import http from "../helper/http";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useState} from "react"
import { useLoaderData, Outlet, Link } from "react-router-dom";

export default function ContactBar(){
    const info = useLoaderData();
    const [data, setData] = useState(info.results);
    const [page, setPage] = useState(2);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const getMoreData = async () => {
        const res = await http.get(`/character?page=${page}`);
        setPage(page + 1);
        const newData = res.results;
        setData([...data, ...newData]);
    };

    return(
      <div>
      <div className="flex flex-col items-center border-l-2 rounded-none w-80 h-screen text-gray-700 bg-gray-100">
        <div className="border-b-2">
          <div className="mt-3 text-2xl font-bold">Contact</div>
          <form className="mt-2 ml-1">
            <input
              className="h-9"
              size="30"
              type="text"
              id="name"
              name="name"
              placeholder="Search by name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </form>
          <div className="flex flex-row justify-between mt-2 mb-3">
            <select
              name="plan"
              id="plan"
              className="m-1"
              defaultValue={"DEFAULTSTATUS"}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="DEFAULTSTATUS" disabled>
                Status
              </option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
            <select
              name="plan"
              id="plan"
              className="m-1"
              defaultValue={"DEFAULTGENDER"}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="DEFAULTGENDER" disabled>
                Gender
              </option>
              <option value="female">Female</option>
              <option value="male"> Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
        <div id="scrollableDiv" className="h-full w-full overflow-y-auto">
          <InfiniteScroll
            dataLength={data.length}
            scrollableTarget="scrollableDiv"
            next={getMoreData}
            hasMore={true}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
          >
            <div className="flex flex-col mb-2 w-full">
              {data.map((item) => {
                return (
                  <button key={item.id}>
                    <Link to={`/contact/${item.id}`}>
                      <div className="flex flex-row ">
                        <div className="w-3/12">
                          <img
                            className="border rounded-full"
                            alt="charIcon"
                            src={item.image}
                            height="60%"
                            width="60%"
                          />
                        </div>
                        <div className="flex flex-col ml-2 items-start w-8/12">
                          <div className="truncate">{item.name}</div>
                          <div>{item.species}</div>
                        </div>
                      </div>
                    </Link>
                  </button>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
    )
}