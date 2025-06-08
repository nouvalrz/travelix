import { Input } from "@heroui/input";
import { Search, Settings2 } from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";

import Toolbar from "@/components/Toolbar";
import { useDestinationsStore } from "@/lib/store/useDestinationsStore";
import Breadcrumb from "@/components/Breadcrumb";

const DestinationsToolbar = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState<string>("");
  const { setSearchKeyword, setMobileDrawerOpen } = useDestinationsStore();

  return (
    <Toolbar>
      <div className="w-full flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
        <Breadcrumb includeHome />
        <div className="flex justify-between">
          <div className="lg:hidden block">
            <Button
              isIconOnly
              variant="flat"
              onPress={() => setMobileDrawerOpen(true)}
            >
              <Settings2 className="size-5 text-gray-600" />
            </Button>
          </div>
          <div className="flex gap-4 w-[390px] lg:w-[440px]">
            <Input
              isClearable
              className="flex-grow"
              placeholder="Search destinations ..."
              startContent={<Search className="text-gray-600 size-5" />}
              onClear={() => setSearchKeyword("")}
              onValueChange={setSearch}
            />
            <Button color="primary" onPress={() => setSearchKeyword(search)}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </Toolbar>
  );
};

export default DestinationsToolbar;
