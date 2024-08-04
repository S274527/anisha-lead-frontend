'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';

export function LocationBoard({
  locationBoardData,
}: {
  locationBoardData?: {
    name: string;
    link: string;
  }[];
}) {
  const [data, setData] = useState<
    {
      name: string;
      link: string;
    }[]
  >(locationBoardData || []);
  const { id } = useParams();

  useLayoutEffect(() => {
    if (locationBoardData) return;
    let pathName = window.location.pathname;
    let pathNameArr = pathName.split('/');
    id && pathNameArr.pop();
    let pathNameArrLength = pathNameArr.length;
    let pathNameArrLengthMinusOne = pathNameArrLength - 1;

    let d = [];

    for (let i = 1; i < pathNameArrLength; i++) {
      let obj: {
        name: string;
        link: string;
      } = {
        name: '',
        link: '',
      };
      obj['name'] = pathNameArr[i].split('-').join(' ');
      if (i === pathNameArrLengthMinusOne) {
        obj['link'] = '';
      } else {
        obj['link'] = pathNameArr.slice(0, i + 1).join('/');
      }
      d.push(obj);
    }
    setData(d);
  }, [locationBoardData]);

  return (
    <ul className="mb-5 flex space-x-2 rtl:space-x-reverse">
      {data.map((item, index) => (
        <>
          {index !== 0 && <span>/</span>}
          <li key={index}>
            {item.link ? (
              <Link
                href={item.link}
                className="capitalize text-primary hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="capitalize">{item.name}</span>
            )}
          </li>
        </>
      ))}
    </ul>
  );
}
