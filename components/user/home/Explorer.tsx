"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import {
  Drama,
  FerrisWheel,
  MapPin,
  Mountain,
  MoveRight,
  Search,
} from "lucide-react";

const Explorer = () => {
  return (
    <Card className="mt-8 w-full max-w-4xl">
      <CardBody>
        <Tabs aria-label="finder">
          <Tab
            key="adventure"
            title={
              <div className="flex gap-2 items-center">
                <Mountain className="size-5" />
                <span>Adventure</span>
              </div>
            }
          >
            <Finder />
          </Tab>
          <Tab
            key="Cultural"
            title={
              <div className="flex gap-2 items-center">
                <Drama className="size-5" />
                <span>Cultural</span>
              </div>
            }
          >
            <Finder />
          </Tab>
          <Tab
            key="theme-park"
            title={
              <div className="flex gap-2 items-center">
                <FerrisWheel className="size-5" />
                <span>Theme Park</span>
              </div>
            }
          >
            <Finder />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

const Finder = () => {
  return (
    <div className="flex md:flex-row flex-col gap-3 mt-2 items-end">
      <Input
        label="Search Something"
        labelPlacement="outside"
        placeholder="Place or Activity"
        startContent={<Search className="size-5 text-gray-600" />}
      />
      <Input
        label="Location"
        labelPlacement="outside"
        placeholder="Province or City"
        startContent={<MapPin className="size-5 text-gray-500" />}
      />
      <DatePicker label="Date" labelPlacement="outside" />
      <Button disableRipple isIconOnly color="primary">
        <MoveRight className="size-5" />
      </Button>
    </div>
  );
};

export default Explorer;
