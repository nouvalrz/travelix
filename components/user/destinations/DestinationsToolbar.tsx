import { Input } from "@heroui/input";
import { Search, Settings2 } from "lucide-react";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

import Toolbar from "@/components/Toolbar";
import { useDestinationsStore } from "@/lib/store/useDestinationsStore";
import Breadcrumb from "@/components/Breadcrumb";

const DestinationsToolbar = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState<string>("");
  const { setSearchKeyword, setMobileDrawerOpen, searchKeyword } =
    useDestinationsStore();

  useEffect(() => {
    setSearch(searchKeyword);
  }, [searchKeyword]);

  return (
    <Toolbar>
      <div className="w-full flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
        <Breadcrumb includeHome />
        <div className="flex justify-between items-end">
          <div className="lg:hidden block">
            <Button
              isIconOnly
              variant="flat"
              onPress={() => setMobileDrawerOpen(true)}
            >
              <Settings2 className="size-5 text-gray-600" />
            </Button>
          </div>

          <form
            className="flex gap-4 w-[320px] md:w-[370px] lg:w-[440px]"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchKeyword(search);
            }}
          >
            <Input
              isClearable
              className="flex-grow"
              placeholder="Search destinations ..."
              startContent={<Search className="text-gray-600 size-5" />}
              value={search}
              onClear={() => setSearchKeyword("")}
              onValueChange={setSearch}
            />
            <Button color="primary" type="submit">
              Search
            </Button>
          </form>
        </div>
      </div>
    </Toolbar>
  );
};

export default DestinationsToolbar;
