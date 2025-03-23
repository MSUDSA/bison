"use client"

import { Check, ChevronsUpDown, User } from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const patients = [
  {
    value: "john-doe",
    label: "John Doe",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "jane-smith",
    label: "Jane Smith",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "robert-johnson",
    label: "Robert Johnson",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "emily-davis",
    label: "Emily Davis",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    value: "michael-wilson",
    label: "Michael Wilson",
    image: "/placeholder.svg?height=32&width=32",
  },
]

export function PatientSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("john-doe")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white text-battelle-blue border-white hover:bg-white/90 hover:text-battelle-blue"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={patients.find((patient) => patient.value === value)?.image} />
              <AvatarFallback className="bg-battelle-blue text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            {patients.find((patient) => patient.value === value)?.label || "Select patient..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="border-battelle-blue/20">
          <CommandInput placeholder="Search patient..." />
          <CommandList>
            <CommandEmpty>No patient found.</CommandEmpty>
            <CommandGroup>
              {patients.map((patient) => (
                <CommandItem
                  key={patient.value}
                  value={patient.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="text-battelle-blue data-[selected=true]:bg-battelle-blue/10"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={patient.image} />
                      <AvatarFallback className="bg-battelle-blue text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {patient.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-battelle-blue",
                      value === patient.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

