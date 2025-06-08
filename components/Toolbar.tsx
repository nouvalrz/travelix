import { Card, CardBody } from "@heroui/card";
import clsx from "clsx";

const Toolbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card
      className={clsx("w-full sticky top-0 z-30", className)}
      classNames={{ base: "border-t-0 border-l-0 border-r-0" }}
      radius="none"
      shadow="sm"
    >
      <CardBody>
        <div className="mx-auto container">{children}</div>
      </CardBody>
    </Card>
  );
};

export default Toolbar;
