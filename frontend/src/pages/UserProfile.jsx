import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "Johndoe@example.com",
    bio: "Food lover, building BiteBuddy!",
    avatar: "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUser({ ...user, avatar: imageUrl });
  };

  const handleSave = () => {
    setEditing(false);
    // send updated user info to backend here
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      // DELETE API call here
      alert("Account deleted!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">User Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="w-24 h-24 border shadow">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>

            <label className="cursor-pointer flex items-center space-x-2 text-sm hover:opacity-80">
              <Upload size={18} />
              <span>Upload New Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Editable fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            {editing ? (
              <Button className="px-6" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button className="px-6" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}

            <Button
              variant="destructive"
              className="px-6 flex items-center space-x-2"
              onClick={handleDeleteAccount}
            >
              <Trash size={18} />
              <span>Delete</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
