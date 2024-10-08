import { useUpdateUserMutation } from "@/redux/api/userApi";
import React, { useState } from "react";
import PrimaryModal from "../Modal/PrimaryModal";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import AvatarLayout from "../Layout/AvatarLayout";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import Text from "../Formatting/Text";
import { removeUserInfo, storeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/authToken";
import { useRouter } from "next/navigation";
import ProfileSelectCard from "./ProfileSelectCard";
import Heading from "../Formatting/Heading";
import toast from "react-hot-toast";
import LayoutButton from "../Button/LayoutButton";

const icons = ["🦋", "🌷", "🎈", "🕊", "🐱", "🦊", "🌻", "🧸"];
const colors = [
  "#EE66A6",
  "#795757",
  "#C96868",
  "#8967B3",
  "#FF885B",
  "#0D7C66",
  "#B43F3F",
  "#FFD35A",
];

type IUser = {
  id: string;
  name: string;
  email: string;
  dp: string;
  cover: string;
};

const Profile = ({ user, setUser }: { user: IUser; setUser: any }) => {
  const [updateUser] = useUpdateUserMutation();
  const [update, setUpdate] = useState(false);
  const [currentDp, setCurrentDp] = useState(user?.dp);
  const [currentCover, setCurrentCover] = useState(user?.cover);
  const router = useRouter();

  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onOpenChange: onProfileOpenChange,
  } = useDisclosure();

  const handleUpdateProfile = async (data: any) => {
    data.dp = currentDp;
    data.cover = currentCover;
    data.id = user?.id;
    delete data.email;
    const result = await updateUser(data).unwrap();
    if (result) {
      storeUserInfo({ accessToken: result });
      setUpdate(false);
      toast.success("Profile Updated");
    }
  };

  const handleLogout = () => {
    removeUserInfo(authKey);
    setUser({
      id: "",
      email: "",
      name: "",
      dp: "",
      cover: "",
    });
    router.push("/login");
  };

  const handleDiscardUpdate = () => {
    setUpdate(false);
    setCurrentDp(user?.dp || "");
    setCurrentCover(user?.cover || "");
  };

  return (
    <PrimaryModal
      title="Profile Preferences"
      btnChildren={
        <Avatar
          onClick={onProfileOpen}
          as="button"
          name={
            user?.dp ||
            user?.name?.slice(0, 1).toUpperCase() ||
            user?.email?.slice(0, 1).toUpperCase()
          }
          radius="full"
          size="md"
          className="text-white font-semibold text-sm md:text-base lg:text-lg"
          style={{ backgroundColor: user?.cover || "#3C88F0" }}
        />
      }
      isOpen={isProfileOpen}
      onOpenChange={onProfileOpenChange}
      size="xl"
    >
      <div>
        <div className="flex items-center space-x-4">
          <div
            style={{ backgroundColor: currentCover || "#3C88F0" }}
            className="w-20 h-20 rounded-full flex justify-center items-center"
          >
            <h1 className="text-lg md:text-3xl text-white">
              {currentDp ||
                user?.name?.slice(0, 1).toUpperCase() ||
                user?.email?.slice(0, 1).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            {!update && (
              <Button
                size="sm"
                className="rounded"
                variant="bordered"
                color="primary"
                onPress={() => setUpdate(true)}
              >
                Update
              </Button>
            )}
            <Button
              size="sm"
              className="rounded"
              variant="bordered"
              color="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {update && (
          <div className="grid md:grid-cols-2 gap-2 mt-4">
            <div>
              <Text className="mb-2">Icons</Text>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-1">
                {icons?.map((icon: string, index: number) => (
                  <ProfileSelectCard
                    key={index}
                    argument={icon}
                    current={currentDp}
                    setCurrent={setCurrentDp}
                    type="dp"
                  />
                ))}
              </div>
              <Text className="mt-4 mb-2">Backgrounds</Text>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-1">
                {colors?.map((color: string, index: number) => (
                  <ProfileSelectCard
                    key={index}
                    argument={color}
                    current={currentCover}
                    setCurrent={setCurrentCover}
                    type="cover"
                  />
                ))}
              </div>
            </div>
            <Form submitHandler={handleUpdateProfile} doReset={false}>
              <FormInput
                name="email"
                label="Your Email"
                defaultValue={user?.email || ""}
                placeholder="Email"
                size="sm"
                className="text-white"
                disabled={true}
              />
              <FormInput
                name="name"
                defaultValue={user?.name || ""}
                placeholder="Name"
                label="Your Name"
                size="sm"
                className="text-white"
              />
              <LayoutButton btnLabel="Update" onClose={handleDiscardUpdate} />
            </Form>
          </div>
        )}
      </div>
    </PrimaryModal>
  );
};

export default Profile;
