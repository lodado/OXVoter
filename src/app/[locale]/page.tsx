import Link from "next/link";

import { LocaleLink } from "@/entities/Router";
import { Button } from "@/shared/ui";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4 text-white">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-slate-800/50 p-8 shadow-lg backdrop-blur">
        <div className="flex flex-col w-full justify-center items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight">실시간 투표 게임</h1>
          <p className="mt-3 text-slate-300">친구들과 함께 실시간 투표 게임을 즐겨보세요</p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <LocaleLink href="/create-room" className="w-full ">
            <Button className="w-full h-[3.2rem]  bg-blue-600 hover:bg-blue-700">방 만들기</Button>
          </LocaleLink>
          <LocaleLink href="/join-room" className="w-full">
            <Button
              variant="primaryLine"
              className="w-full h-[3.2rem] border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              방 참가하기
            </Button>
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
