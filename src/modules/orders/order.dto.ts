export class CreateOrderDto {
  email: string;
  firstname: string;
  lastname: string;
  products: { code: string }[];
}
