import CartsPageClient from "@/components/user/carts/CartsPageClient";
import { fetchApiFromServer } from "@/lib/fetchApi";
import { Cart } from "@/types/cart.type";
import { PaymentMethod } from "@/types/paymentMethod.type";

export const metadata = {
  title: "Carts",
};

const CartsPage = async () => {
  const cartsReponse = await fetchApiFromServer("/carts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const carts = (await cartsReponse.json()).data as Cart[];
  const sortedCartsByDate = carts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const paymentMethodsResponse = await fetchApiFromServer("/payment-methods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const paymentMethods = (await paymentMethodsResponse.json())
    .data as PaymentMethod[];

  return (
    <CartsPageClient
      carts={sortedCartsByDate}
      paymentMethods={paymentMethods}
    />
  );
};

export default CartsPage;
