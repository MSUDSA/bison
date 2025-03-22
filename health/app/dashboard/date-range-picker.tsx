"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DateRangePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">
        <Select
          onValueChange={(value) => {
            setDate(addDays(new Date(), Number.parseInt(value)))
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="-1">Yesterday</SelectItem>
            <SelectItem value="-7">Last 7 days</SelectItem>
            <SelectItem value="-30">Last 30 days</SelectItem>
            <SelectItem value="-90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

