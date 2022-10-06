import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import http from "../helper/http";

export default function ContactDetails() {
  const data = useLoaderData();
  const [episodes, setEpisodes] = useState([]);

  const getEpispdeData = async () => {
    let list = [];
    for (let item of data.episode) {
      let info = item.split("/");
      list.push(parseInt(info.slice(-1).pop()));
    }
    const res = await http.get(`/episode/${list}`);
    try {
      setEpisodes([...res]);
    } catch {
      setEpisodes([res]);
    }
  };

  useEffect(() => {
    getEpispdeData();
  }, [data]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full justify-start border-b-2 border-stone-300 border-solid rounded-none pb-5">
        <div className="mt-5 ml-10 content-center">
          <img
            className="border rounded-full"
            alt="charIcon"
            src={data.image}
            height="60%"
            width="60%"
          />
        </div>
        <div className="font-bold text-6xl underline underline-offset-4 pt-10 mt-7 ">
          {data.name}
        </div>
      </div>
      <div className="ml-12 mt-10 mr-12">
        <div>
          <div className="font-bold text-3xl ">Personal Info</div>
          <div className="mt-3 border-2 border-stone-300 border-solid rounded-none">
            <ul className="p-2">
              <li key={`status${data.status}`}>Status: {data.status}</li>
              <li key={`gender${data.gender}`}>Gender: {data.gender}</li>
              <li key={`species${data.species}`}>Species: {data.species}</li>
              <li key={`location${data.location.name}`}>
                Location: {data.location.name}
              </li>
              <li key={`origin${data.origin.name}`}>
                Origin: {data.origin.name}
              </li>
              <li key={data.created}>Created Date: {data.created}</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="font-bold text-3xl mt-5">Episodes</div>
          <div className="mt-2 border-2 border-stone-300 border-solid rounded-none">
            <div className="flex flex-row justify-start	">
              <div className="font-bold text-xl w-96">Name</div>
              <div className="font-bold text-xl w-64">Air Date</div>
              <div className="font-bold text-xl w-64">Episode</div>
              <div className="font-bold text-xl w-64">Created Date</div>
            </div>
          </div>
          <div className="overflow-auto h-80">
            {episodes.map((item, index) => {
              return (
                <div
                  key={`${index}${item.id}${data.name}`}
                  className="flex flex-row justify-start border-l-2 border-r-2 border-b-2 border-stone-300 border-solid rounded-none"
                >
                  <div key={item.name} className="text-xl w-96">
                    {item.name}
                  </div>
                  <div key={item.air_date} className="text-xl w-64">
                    {item.air_date}
                  </div>
                  <div key={item.episode} className="text-xl w-64">
                    {item.episode}
                  </div>
                  <div key={item.created} className="text-xl w-64">
                    {item.created}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
