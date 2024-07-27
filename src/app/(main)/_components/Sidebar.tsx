"use client";

import { UserButton } from "@clerk/nextjs";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import {
  Calendar,
  ChevronDown,
  CircleUser,
  HomeIcon,
  PlusCircle,
  SearchIcon,
  Settings2Icon,
  Trash2Icon,
} from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export const Sidebar = () => {
  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.get);

  const onCreate = () => {
    const promise = create({ title: "untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <>
      <aside className=" h-screen  w-80 ">
        <Card className="h-full ">
          <div className="p-4 h-full flex-col ">
            <Card isBlurred shadow="lg" className="mb-4">
              <CardBody className="flex-row items-center justify-center">
                <UserButton />

                <p className="ml-2 select-none">Workspace</p>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="secondary"
                  className="ml-auto"
                >
                  <ChevronDown />
                </Button>
              </CardBody>
            </Card>
            <div>
              <Card>
                <CardBody className="flex space-y-2">
                  <Button variant="light" className="justify-start">
                    <SearchIcon size={16} />
                    <p className="select-none">Search</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <HomeIcon size={16} />
                    <p className="select-none">Home</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <Calendar size={16} />
                    <p className="select-none">Calendar</p>
                  </Button>
                  <Button variant="light" className="justify-start">
                    <Settings2Icon size={16} />
                    <p className="select-none">Settings</p>
                  </Button>
                </CardBody>
              </Card>
            </div>

            <Divider className="my-4" />

            <Card>
              <CardBody>
                <Button onClick={onCreate} variant="flat" color="secondary">
                  <PlusCircle size={18} />
                  New Note
                </Button>
                <div>
                  {documents?.map((document) => (
                    <p key={document._id}>{document.title}</p>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Divider className="my-4" />
            <div className="absolute inset-x-0 bottom-0 m-4">
              <Card shadow="lg">
                <CardBody>
                  <Button
                    variant="shadow"
                    color="secondary"
                    className="justify-start "
                  >
                    <Trash2Icon size={16} />
                    Trash
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </Card>
      </aside>
    </>
  );
};
