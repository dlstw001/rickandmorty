import http from "../helper/http";
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useState, useEffect} from "react"
import { useLoaderData, Outlet, Link } from "react-router-dom";

export default function ContactBar() {
  const info = useLoaderData();
  const [data, setData] = useState(info.results);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchPage, setSearchPage] = useState(1);
  const [search, setSearch] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("DEFAULTGENDER");
  const [status, setStatus] = useState("DEFAULTSTATUS");

  const getMoreData = async () => {
    const res = await http.get(`/character?page=${page}`);
    const newData = res.results;
    setData([...data, ...newData]);
  };

  const getMoreDataBySearch = async () => {
    let filter = `page=${searchPage}`;
    console.log(name);
    if (name !== "") {
      filter += `&name=${name}`;
    }
    if (gender !== "DEFAULTGENDER") {
      filter += `&gender=${gender}`;
    }
    if (status !== "DEFAULTSTATUS") {
      filter += `&status=${status}`;
    }
    try {
      const res = await http.get(`/character?${filter}`);
      if (res.info.next == null) {
        setHasMore(false);
      }
      const newData = res.results;
      setData([...data, ...newData]);
    } catch {
      setHasMore(false);
    }
  };

  const resetAll = async () => {
    setName("");
    setGender("DEFAULTGENDER");
    setStatus("DEFAULTSTATUS");
    const res = await http.get(`/character?page=1`);
    const newData = res.results;
    setData([...newData]);
  };

  useEffect(() => {
    if (page > 1) {
      getMoreData();
    }
  }, [page]);

  useEffect(() => {
    if (searchPage > 1) {
      getMoreDataBySearch();
    }
  }, [searchPage]);

  useEffect(() => {
    if (search) {
      setPage(1);
      getMoreDataBySearch();
    }
  }, [name, gender, status]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col items-center border-l-2 rounded-none w-80 h-screen text-gray-700 bg-gray-100">
        <div className="border-b-2">
          <div className="flex flex-row justify-around">
            <div className="mt-3 text-2xl font-bold">Contact</div>
            <button
              className="mt-4 border-2 border-gray-800 rounded-lg"
              onClick={() => {
                setSearch(false);
                setSearchPage(1);
                setHasMore(true);
                setData([]);
                setPage(1);
                resetAll();
              }}
            >
              Reset
            </button>
          </div>
          <form className="mt-2 ml-1">
            <input
              className="h-9"
              size="30"
              type="text"
              id="name"
              name="name"
              placeholder="Search by name"
              value={name}
              onChange={(e) => {
                setSearch(true);
                setHasMore(true);
                setSearchPage(1);
                setData([]);
                setName(e.target.value);
              }}
            ></input>
          </form>
          <div className="flex flex-row justify-between mt-2 mb-3">
            <select
              name="plan"
              id="plan"
              className="m-1"
              value={status}
              onChange={(e) => {
                setSearch(true);
                setHasMore(true);
                setSearchPage(1);
                setData([]);
                setStatus(e.target.value);
              }}
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
              value={gender}
              onChange={(e) => {
                setSearch(true);
                setHasMore(true);
                setSearchPage(1);
                setData([]);
                setGender(e.target.value);
              }}
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
            next={
              search
                ? () => {
                    setSearchPage(searchPage + 1);
                  }
                : () => {
                    setPage(page + 1);
                  }
            }
            hasMore={hasMore}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
          >
            <div className="flex flex-col w-full">
              {data.map((item) => {
                return (
                  <Link to={`/contact/${item.id}`} key={item.id}>
                    <div className="flex flex-row justify-start">
                      <div className="w-1/3 mt-2 pl-3">
                        <img
                          className="border rounded-full"
                          alt="charIcon"
                          src={item.image}
                          height="60%"
                          width="60%"
                        />
                      </div>
                      <div className="w-2/3 pl-0 mt-2 flex flex-col items-start">
                        <div className="truncate">{item.name}</div>
                        <div>{item.species}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}