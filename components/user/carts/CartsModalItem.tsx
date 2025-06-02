import { Image } from "@heroui/image";

import { Cart } from "@/types/cart.type";

const CartsModalItem = ({ cart }: { cart: Cart }) => {
  const { id, activity, quantity } = cart;

  return (
    <div className="flex gap-4">
      <Image
        alt={activity.title}
        className="w-12 h-12 rounded-lg object-cover"
        fallbackSrc={`https://placehold.co/600x400?text=place`}
        src={activity.imageUrls[0]}
      />
      <div className="flex-1">
        <p className="line-clamp-1 font-semibold">{activity.title}</p>
        <p className="line-clamp-1 text-sm">{activity.address}</p>
      </div>
      <div className="flex flex-col items-end justify-end">
        {activity.price_discount ? (
          <>
            <p className="line-through text-sm">{activity.price}</p>
            <p className="font-semibold">
              {quantity} x {activity.price_discount}
            </p>
          </>
        ) : (
          <p className="font-semibold">
            {quantity} x {activity.price}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartsModalItem;
