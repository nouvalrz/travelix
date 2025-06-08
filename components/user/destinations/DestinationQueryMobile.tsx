import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { Button } from "@heroui/button";

import DestinationFilterCategory from "./DestinationFIlterCategory";
import DestinationFilterPrice from "./DestinationFilterPrice";

import { useDestinationsStore } from "@/lib/store/useDestinationsStore";

const DestinationQueryMobile = () => {
  const { mobileDrawerOpen, setMobileDrawerOpen } = useDestinationsStore();

  return (
    <Drawer
      isOpen={mobileDrawerOpen}
      placement="bottom"
      size="full"
      onOpenChange={setMobileDrawerOpen}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">Filter</DrawerHeader>
            <DrawerBody>
              <DestinationFilterCategory />
              <DestinationFilterPrice />
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="primary"
                onPress={() => setMobileDrawerOpen(false)}
              >
                Done
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DestinationQueryMobile;
