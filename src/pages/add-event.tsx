import { Loader } from "@/components/Loader";
import { months } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "use-http";

export default function Home() {
  const fileInputRef = useRef<any>();
  const [value, setValue] = useState<any>();
  const [data, setData] = useState<Array<string[]>>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(2);
  const [currentMonth, setCurrentMonth] = useState<string>("January");
  const [loading, setLoading] = useState(false);
  const { post } = useFetch("/api/addEvent");
  const { get } = useFetch("/api/getEvent");
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/getSheet?month=" + currentMonth).then(
        (res) => res.json()
      );
      setData(res?.data?.values);
    })().finally(() => {
      setLoading(false);
    });
  }, [currentMonth]);

  async function syncEvents(data: Array<string[]>) {
    return await Promise.all(
      data.slice(1, data.length).map(async (subArray, subArrIndex) => {
        return await Promise.all(
          subArray.map(async (value, index) => {
            if (value && value !== "") {
              const summary =
                value + "-" + (!value.includes("Wedding") ? "Birthday" : "");
              const existingEvent = (
                await get("?summary=" + encodeURIComponent(summary))
              )?.items;

              if (!existingEvent || existingEvent?.length == 0) {
                return await post({
                  start: new Date(
                    currentMonth +
                      `${index + 1} ${new Date().getFullYear()} 06:00`
                  ),
                  summary,
                });
              }
            }
          })
        );
      })
    );
  }

  return (
    <main className="flex justify-center align-middle m-6">
      <div className="flex flex-col p-10 gap-10 justify-center align-middle alug w-[100%]">
        <div className="flex flex-row rounded-2xl border bg-neutral-900">
          {months.map((month, index) => (
            <button
              onClick={() => {
                setCurrentMonth(month);
              }}
              key={month}
              className={`p-5 transition-all duration-150 dark:hover:bg-neutral-700 ${
                currentMonth == month ? "bg-neutral-700" : ""
              }  border-solid ${
                index == 0
                  ? "rounded-l-2xl"
                  : index == months.length - 1
                  ? "rounded-r-2xl"
                  : ""
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        {loading ? (
          <Loader />
        ) : (
          data && (
            <>
              <div className="w-[100%] overflow-x-scroll">
                <table className="table-fixed">
                  <thead className="border-collapse border border-slate-500">
                    <tr>
                      {data[0].map((key) => {
                        return (
                          <th className="p-10" key={key}>
                            {key}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="border-collapse border border-slate-500">
                    {data.slice(1, data.length).map((rowArr, index) => (
                      <tr
                        key={index + "data-table"}
                        className={index % 2 === 0 ? "bg-slate-800" : ""}
                      >
                        {rowArr.map((value, rowIndex) => (
                          <td
                            key={rowIndex + "data-table-row"}
                            className="pl-5"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={async () => {
                  setLoading(true);
                  await syncEvents(data).finally(() => {
                    setLoading(false);
                  });
                }}
              >
                sync
              </button>
            </>
          )
        )}
      </div>
    </main>
  );
}
