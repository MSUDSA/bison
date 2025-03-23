"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Shield, Bell, User } from "lucide-react"

export default function ProfilePage() {
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-[#003366] bg-[url('/space-background.png')] bg-cover bg-center text-white">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 text-white hover:bg-white/10">
          <Link href="/chat" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Chat
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="bg-white/10 backdrop-blur-md border-none text-white md:col-span-1">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <CardTitle>John Doe</CardTitle>
              <CardDescription className="text-white/80">Member since March 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-white/70" />
                <span className="text-white/70">New York, NY</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none">
                  Anxiety
                </Badge>
                <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none">
                  Depression
                </Badge>
                <Badge variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-none">
                  Chronic Pain
                </Badge>
              </div>
              <div className="pt-4 border-t border-white/20 mt-4">
                <h3 className="font-medium mb-2">Groups (3)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Anxiety Support Group</span>
                    <span className="text-white/70">5 members</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Local Mental Health</span>
                    <span className="text-white/70">8 members</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Chronic Pain Management</span>
                    <span className="text-white/70">12 members</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="bg-white/10 backdrop-blur-md border-none text-white md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription className="text-white/80">
                Manage your profile information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center">
                  <User className="mr-2 h-4 w-4" /> Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="bg-white/20 border-white/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="bg-white/20 border-white/20 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="bg-white/20 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself..."
                    defaultValue="Living with anxiety and chronic pain. Looking to connect with others who understand these challenges."
                    className="bg-white/20 border-white/20 text-white min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <h3 className="font-medium flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> Location Settings
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="location-sharing" className="block mb-1">
                      Location Sharing
                    </Label>
                    <p className="text-sm text-white/70">Allow the app to use your location to find nearby groups</p>
                  </div>
                  <Switch
                    id="location-sharing"
                    checked={locationEnabled}
                    onCheckedChange={setLocationEnabled}
                    className="data-[state=checked]:bg-white data-[state=checked]:text-[#003366]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Maximum Distance</Label>
                  <Select defaultValue="10">
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#003366] text-white border-white/20">
                      <SelectItem value="5">5 miles</SelectItem>
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <h3 className="font-medium flex items-center">
                  <Bell className="mr-2 h-4 w-4" /> Notification Preferences
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="block mb-1">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-white/70">Receive notifications for new messages and group activities</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    className="data-[state=checked]:bg-white data-[state=checked]:text-[#003366]"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <h3 className="font-medium flex items-center">
                  <Shield className="mr-2 h-4 w-4" /> Privacy Settings
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Profile Visibility</Label>
                  <Select defaultValue="groups">
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#003366] text-white border-white/20">
                      <SelectItem value="public">Public (Anyone can see)</SelectItem>
                      <SelectItem value="groups">Groups Only (Only group members)</SelectItem>
                      <SelectItem value="private">Private (By invitation only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                Cancel
              </Button>
              <Button className="bg-white text-[#003366] hover:bg-white/90">Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

