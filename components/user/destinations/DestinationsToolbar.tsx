import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";

import Toolbar from "@/components/Toolbar";
import { useDestinationsStore } from "@/lib/store/useDestinationsStore";

const DestinationsToolbar = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState<string>("");
  const { setSearchKeyword } = useDestinationsStore();

  return (
    <Toolbar>
      <div className="w-full flex justify-between items-center">
        <p>Breadcrumb Ceritanya</p>
        <div className="flex gap-4 w-[440px]">
          <Input
            className="flex-grow"
            placeholder="Search destinations ..."
            startContent={<Search className="text-gray-600 size-5" />}
            onValueChange={setSearch}
          />
          <Button color="primary" onPress={() => setSearchKeyword(search)}>
            Search
          </Button>
        </div>
      </div>
    </Toolbar>
  );
};

export default DestinationsToolbar;
