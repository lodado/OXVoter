"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button, Card, Form, Input, Switch } from "@/shared/ui";
import { ReactiveLayout } from "@/shared/ui/ReactiveLayout";

export default function CreateRoomPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [randomRoles, setRandomRoles] = useState(true);
  const [anonymousVoting, setAnonymousVoting] = useState(false);
  const [specialVoting, setSpecialVoting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사 수행
    defaultValues: {
      roomName: "",
      username: "",
      maxPlayers: 8,
      randomRoles: true,
      anonymousVoting: false,
      specialVoting: true,
    },
  });

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 실제 서버 통신 대신 로컬에서 UUID 생성
      const roomId = uuidv4();

      // 방 설정을 로컬 스토리지에 저장
      const roomData = {
        id: roomId,
        name: roomName,
        maxPlayers,
        settings: {
          randomRoles,
          anonymousVoting,
          specialVoting,
        },
        players: [
          {
            id: uuidv4(),
            username,
            isHost: true,
            isAlive: true,
          },
        ],
        gameState: "lobby",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(`room_${roomId}`, JSON.stringify(roomData));

      // 1초 후 방으로 이동 (로딩 시뮬레이션)
      setTimeout(() => {
        router.push(`/room/${roomId}?username=${encodeURIComponent(username)}&isHost=true`);
      }, 1000);
    } catch (error) {
      console.error("방 생성 오류:", error);
      setIsLoading(false);
    }
  };

  return (
    <ReactiveLayout className="flex flex-col justify-center items-center py-10">
      <Card className="w-full max-w-md bg-slate-800/80 text-white shadow-xl backdrop-blur">
        <Card.Header>
          <Card.Title className="text-2xl">새 게임방 만들기</Card.Title>
          <Card.Description className="text-slate-300">게임 설정을 구성하고 친구들을 초대하세요</Card.Description>
        </Card.Header>
        <Form onSubmit={handleCreateRoom}>
          <Card.Content className="relative p-0 px-6 flex flex-col gap-2">
            <Form.Field name="roomName" className="">
              <Form.Label htmlFor="roomName">방 이름</Form.Label>
              <Form.Control asChild>
                <Input
                  id="roomName"
                  placeholder="게임방 이름을 입력하세요"
                  value={roomName}
                  setValue={(value) => setRoomName(value)}
                  required
                  className=" bg-slate-900/50 text-white"
                />
              </Form.Control>
              <Form.MessageContainer>
                <Form.Message className="FormMessage" match="valueMissing">
                  게임방 이름을 입력하세요
                </Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Field name="username" className="">
              <Form.Label htmlFor="username">닉네임</Form.Label>
              <Form.Control asChild>
                <Input
                  id="username"
                  placeholder="게임에서 사용할 닉네임을 입력하세요"
                  value={username}
                  setValue={(newUserName) => setUsername(newUserName)}
                  required
                  className=" bg-slate-900/50 text-white"
                />
              </Form.Control>

              <Form.MessageContainer>
                <Form.Message className="FormMessage" match="valueMissing">
                  게임에서 사용할 닉네임을 입력하세요
                </Form.Message>
              </Form.MessageContainer>
            </Form.Field>

            <Form.Field name="maxPlayers" className="">
              <Form.Label htmlFor="maxPlayers">최대 인원</Form.Label>
              <Form.Control asChild>
                <Input
                  id="maxPlayers"
                  min={2}
                  max={20}
                  value={String(maxPlayers ?? 0)}
                  setValue={(value) => {
                    if (isNaN(Number(value))) return;

                    setMaxPlayers(value ? Number.parseInt(value) : 1);
                  }}
                  resetValue="8"
                  required
                  className=" bg-slate-900/50 text-white"
                />
              </Form.Control>
              <div>
                <Form.MessageContainer>
                  <Form.Message match={(value, formData) => 0 < value.length && value.length <= 20}>
                    최대 20명까지 설정 가능합니다.
                  </Form.Message>
                </Form.MessageContainer>
              </div>
            </Form.Field>

            <div className="space-y-4 pb-2">
              <h3 className="display-1">게임 설정</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="randomRoles">랜덤 직업 부여</label>
                  <p className="text-xs text-slate-400">마피아, 의사 등 특수 역할 랜덤 배정</p>
                </div>
                <Switch id="randomRoles" checked={randomRoles} onCheckedChange={setRandomRoles} disabled />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="anonymousVoting">익명 투표</label>
                  <p className="text-xs text-slate-400">투표 결과에서 개인별 선택 숨김</p>
                </div>
                <Switch id="anonymousVoting" checked={anonymousVoting} onCheckedChange={setAnonymousVoting} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="specialVoting">특수 투표 활성화</label>
                  <p className="text-xs text-slate-400">역할별 특수 투표 단계 추가</p>
                </div>
                <Switch id="specialVoting" checked={specialVoting} onCheckedChange={setSpecialVoting} disabled />
              </div>
            </div>
          </Card.Content>
          <Card.Footer className="sticky bottom-0">
            <Form.Submit asChild disabled={isLoading}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  "방 만들기"
                )}
              </Button>
            </Form.Submit>
          </Card.Footer>
        </Form>
      </Card>
    </ReactiveLayout>
  );
}
