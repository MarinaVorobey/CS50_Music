import { useQuery } from "@tanstack/react-query";
import { getUserToken } from "./data";
import { useEffect, useState } from "react";
import { IUserData } from "./definitions";

export function formatTimePassed(time: string): string {
  const passed: number = Date.now() - new Date(time).getTime();
  if (passed / 31556952000 >= 1) {
    const d = new Date(time);
    const day = `${d.getDate()}`;
    const month = `${d.getMonth() + 1}`;

    return `${day.length > 1 ? day : "0" + day}.${
      month.length > 1 ? month : "0" + month
    }.${d.getFullYear()}`;
  }

  return passed / 2629746000 >= 1
    ? `${Math.floor(passed / 2629746000)} month ago`
    : passed / 86400000 >= 1
    ? `${Math.floor(passed / 86400000)} days ago`
    : passed / 3600000 >= 1
    ? `${Math.floor(passed / 3600000)} hours ago`
    : passed / 60000 >= 1
    ? `${Math.floor(passed / 60000)} minutes ago`
    : "less than a minute ago";
}

export function formatDuration(time: string): string {
  const timeSplit = time.split(":");
  const timeArr = timeSplit.slice(0, 2).map((n) => +n);
  const seconds = +timeSplit[2].slice(0, 2);
  if (timeArr[0] > 0) {
    timeArr[1] += timeArr[0] * 60;
  }
  return `${timeArr[1]}:${seconds < 9 ? `0${seconds}` : `${seconds}`}`;
}

export function moveSearchbar(): void {
  const search = document.getElementById("search");
  search?.classList.toggle("search--active");
}

export function useUserData(): IUserData | null {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  useEffect(() => {
    const userObject = window.localStorage.getItem("user");
    if (userObject) {
      setUserData(JSON.parse(userObject));
    }
  }, [userToken]);
  return userData;
}
